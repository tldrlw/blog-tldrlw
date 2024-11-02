# Execution Role for ECS Task Lifecycle Management
resource "aws_iam_role" "promtail_task_execution_role" {
  name = "promtail-ecs-execution-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

# Attach Amazon ECS Task Execution Role Policy for image pull and log permissions
resource "aws_iam_role_policy_attachment" "promtail_task_execution_role_policy" {
  role       = aws_iam_role.promtail_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Optional: Policy to Allow Creating CloudWatch Log Groups
data "aws_iam_policy_document" "create_log_group_policy_doc" {
  statement {
    actions   = ["logs:CreateLogGroup"]
    effect    = "Allow"
    resources = ["*"]
  }
}

resource "aws_iam_policy" "create_log_group_policy" {
  name        = "promtail-create-log-group-policy"
  description = "Policy to allow creating CloudWatch Log Groups"
  policy      = data.aws_iam_policy_document.create_log_group_policy_doc.json
}

# Attach the CloudWatch Log Group Creation Policy
resource "aws_iam_role_policy_attachment" "attach_create_log_group_policy" {
  role       = aws_iam_role.promtail_task_execution_role.name
  policy_arn = aws_iam_policy.create_log_group_policy.arn
}

# Task Role for Promtail Container
resource "aws_iam_role" "promtail_task_role" {
  name = "promtail-task-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# Policy for Promtail to Access CloudWatch Logs and Describe Network Interfaces
resource "aws_iam_policy" "promtail_policy" {
  name        = "promtail-policy"
  description = "Policy for Promtail to access CloudWatch logs and describe network interfaces"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams",
          "logs:GetLogEvents",
          "logs:FilterLogEvents"
        ]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "ec2:DescribeNetworkInterfaces"
        Resource = "*"
      }
    ]
  })
}

# Attach the Promtail Policy to the Task Role
resource "aws_iam_role_policy_attachment" "promtail_task_role_attachment" {
  role       = aws_iam_role.promtail_task_role.name
  policy_arn = aws_iam_policy.promtail_policy.arn
}
