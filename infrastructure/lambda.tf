data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda" # Path to your Lambda function code
  output_path = "${path.module}/lambda_function.zip"
}

variable "region" {
  default = "us-east-1"
}

variable "function_name" {
  default = "cloudwatch-to-loki"
}

variable "loki_url" {
  default = "https://loki.tldrlw.com/loki/api/v1/push"
}

resource "aws_lambda_function" "cloudwatch_to_loki" {
  function_name = var.function_name
  role          = aws_iam_role.lambda_role.arn
  handler       = "app-log-shipper.handler" # Specify the handler
  runtime       = "nodejs20.x"              # Use Node.js 18.x or later
  timeout       = 30

  # Use the zipped file created by the archive_file resource
  filename = data.archive_file.lambda_zip.output_path

  environment {
    variables = {
      LOKI_URL = var.loki_url
    }
  }
}

# IAM Role for Lambda Function
resource "aws_iam_role" "lambda_role" {
  name = "cloudwatch_to_loki_lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Attach the AWSLambdaBasicExecutionRole Managed Policy to Allow Logging to CloudWatch
# resource "aws_iam_role_policy_attachment" "lambda_basic_execution_policy" {
#   role       = aws_iam_role.lambda_role.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
# }

# Custom IAM Policy for Lambda to Access CloudWatch Logs and Make HTTP Requests
resource "aws_iam_policy" "lambda_policy" {
  name        = "cloudwatch_to_loki_policy"
  description = "Policy for Lambda to read CloudWatch logs and send HTTP requests"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      # {
      #   Effect = "Allow",
      #   Action = [
      #     "logs:DescribeLogGroups",
      #     "logs:DescribeLogStreams",
      #     "logs:GetLogEvents",
      #     "logs:FilterLogEvents"
      #   ],
      #   Resource = "*"
      # },
      {
        Effect = "Allow",
        Action = [
          "ec2:DescribeNetworkInterfaces",
          "ec2:CreateNetworkInterface",
          "ec2:DeleteNetworkInterface",
          "ec2:AttachNetworkInterface"
        ],
        Resource = "*"
      }
    ]
  })
}

# cloudwatch policy
# See also the following AWS managed policy: AWSLambdaBasicExecutionRole
data "aws_iam_policy_document" "lambda_logging" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = ["arn:aws:logs:*:*:*"]
  }
}
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function#cloudwatch-logging-and-permissions

resource "aws_iam_policy" "lambda_logging" {
  name        = "${var.function_name}-logging"
  path        = "/lambda/"
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.lambda_logging.json
}

resource "aws_iam_role_policy_attachment" "lambda_logging" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

# Attach the Custom IAM Policy to the Role
resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

# # Define the CloudWatch Log Group (replace with your log group name)
# resource "aws_cloudwatch_log_group" "log_group" {
#   name = "/aws/lambda/monza-tldrlw-get" # Replace with your actual log group name
# }

variable "monza_tldrlw_get_lg_name" {
  default = "/aws/lambda/monza-tldrlw-get"
}

data "aws_cloudwatch_log_group" "monza_tldrlw_get" {
  name = var.monza_tldrlw_get_lg_name
}

# Create a CloudWatch Logs Subscription Filter
resource "aws_cloudwatch_log_subscription_filter" "log_to_lambda" {
  depends_on = [aws_lambda_permission.allow_cloudwatch_logs]
  # By adding depends_on = [aws_lambda_permission.allow_cloudwatch_logs], you are explicitly instructing Terraform to create the aws_lambda_permission resource before setting up the subscription filter. This ensures that the necessary permissions are in place, which resolves potential issues related to execution order.
  name            = "cloudwatch_to_lambda"
  log_group_name  = var.monza_tldrlw_get_lg_name
  filter_pattern  = "" # Use a specific filter pattern if needed, or leave empty for all logs
  destination_arn = aws_lambda_function.cloudwatch_to_loki.arn
}

resource "aws_lambda_permission" "allow_cloudwatch_logs" {
  statement_id  = "AllowCloudWatchLogs"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cloudwatch_to_loki.function_name
  principal     = "logs.amazonaws.com"
  source_arn    = "${data.aws_cloudwatch_log_group.monza_tldrlw_get.arn}:*"
  # You appended :* to data.aws_cloudwatch_log_group.monza_tldrlw_get.arn. This grants permission to all log streams within the specified log group, which is necessary for the CloudWatch Logs service to invoke your Lambda function for any log stream.
}
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission#with-cloudwatch-log-group
