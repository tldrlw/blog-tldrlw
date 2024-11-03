# # Execution Role for ECS Task Lifecycle Management
# resource "aws_iam_role" "fluentbit_task_execution_role" {
#   name = "fluentbit-tldrlw-ecs-execution-role"
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [{
#       Effect = "Allow",
#       Principal = {
#         Service = "ecs-tasks.amazonaws.com"
#       },
#       Action = "sts:AssumeRole"
#     }]
#   })
# }

# # Attach Amazon ECS Task Execution Role Policy for image pull and log permissions
# resource "aws_iam_role_policy_attachment" "fluentbit_task_execution_role_policy" {
#   role       = aws_iam_role.fluentbit_task_execution_role.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
# }

# # Optional: Policy to Allow Creating CloudWatch Log Groups
# data "aws_iam_policy_document" "create_log_group_policy_doc" {
#   statement {
#     actions   = ["logs:CreateLogGroup"]
#     effect    = "Allow"
#     resources = ["*"]
#   }
# }

# resource "aws_iam_policy" "create_log_group_policy" {
#   name        = "fluentbit-tldrlw-create-log-group-policy"
#   description = "Policy to allow creating CloudWatch Log Groups"
#   policy      = data.aws_iam_policy_document.create_log_group_policy_doc.json
# }

# # Attach the CloudWatch Log Group Creation Policy
# resource "aws_iam_role_policy_attachment" "attach_create_log_group_policy" {
#   role       = aws_iam_role.fluentbit_task_execution_role.name
#   policy_arn = aws_iam_policy.create_log_group_policy.arn
# }

# # Task Role for fluentbit Container
# resource "aws_iam_role" "fluentbit_task_role" {
#   name = "fluentbit-tldrlw-task-role"
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Principal = {
#           Service = "ecs-tasks.amazonaws.com"
#         }
#       }
#     ]
#   })
# }

# # Policy for fluentbit to Access CloudWatch Logs and Describe Network Interfaces
# resource "aws_iam_policy" "fluentbit_policy" {
#   name        = "fluentbit-tldrlw-policy"
#   description = "Policy for fluentbit to access CloudWatch logs and describe network interfaces"
#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect = "Allow"
#         Action = [
#           "logs:DescribeLogGroups",
#           "logs:DescribeLogStreams",
#           "logs:GetLogEvents",
#           "logs:FilterLogEvents"
#         ]
#         Resource = "*"
#       },
#       {
#         Effect   = "Allow"
#         Action   = "ec2:DescribeNetworkInterfaces"
#         Resource = "*"
#       }
#     ]
#   })
# }

# # Attach the fluentbit Policy to the Task Role
# resource "aws_iam_role_policy_attachment" "fluentbit_task_role_attachment" {
#   role       = aws_iam_role.fluentbit_task_role.name
#   policy_arn = aws_iam_policy.fluentbit_policy.arn
# }
