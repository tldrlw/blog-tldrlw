# # Variables for VPC and Ports
# variable "vpc_id" {
#   description = "The ID of the VPC"
#   type        = string
# }

# variable "loki_port" {
#   description = "Port Loki is listening on"
#   default     = 3100
# }

# # Security Group for the Lambda Function
# resource "aws_security_group" "lambda_sg" {
#   name        = "lambda-security-group"
#   description = "Security group for Lambda function"
#   vpc_id      = var.vpc_id

#   # Egress rule to allow all outbound traffic (default behavior for Lambda)
#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# # Security Group for the Loki ECS Container
# resource "aws_security_group" "loki_sg" {
#   name        = "loki-security-group"
#   description = "Security group for Loki ECS container"
#   vpc_id      = var.vpc_id

#   # Ingress rule to allow traffic from the Lambda function
#   ingress {
#     from_port       = var.loki_port
#     to_port         = var.loki_port
#     protocol        = "tcp"
#     security_groups = [aws_security_group.lambda_sg.id]
#   }

#   # Ingress rule to allow traffic from the Grafana ECS container
#   ingress {
#     from_port       = var.loki_port
#     to_port         = var.loki_port
#     protocol        = "tcp"
#     security_groups = ["<GRAFANA_SECURITY_GROUP_ID>"] # Replace with the actual security group ID for Grafana
#   }

#   # Egress rule to allow all outbound traffic
#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# # Output the security group IDs
# output "lambda_security_group_id" {
#   value = aws_security_group.lambda_sg.id
# }

# output "loki_security_group_id" {
#   value = aws_security_group.loki_sg.id
# }