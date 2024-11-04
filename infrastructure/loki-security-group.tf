# # Security Group for Loki ECS Container
# resource "aws_security_group" "loki_sg" {
#   vpc_id                 = aws_vpc.main.id
#   name                   = "loki-tldrlw-ecs"
#   description            = "Security group for Loki ECS container"
#   revoke_rules_on_delete = true
# }

# resource "aws_security_group_rule" "https_ingress" {
#   type                     = "ingress"
#   from_port                = 443
#   to_port                  = 443
#   protocol                 = "TCP"
#   description              = "Allow HTTPS inbound traffic from ALB"
#   security_group_id        = aws_security_group.loki_sg.id
#   source_security_group_id = module.main.alb_security_group_id
# }

# # Ingress rule to allow traffic from the Lambda function
# resource "aws_security_group_rule" "lambda_ingress" {
#   type                     = "ingress"
#   from_port                = 3100
#   to_port                  = 3100
#   protocol                 = "tcp"
#   description              = "Allow traffic from the Lambda function"
#   security_group_id        = aws_security_group.loki_sg.id
#   source_security_group_id = aws_security_group.lambda_sg.id
# }

# # Ingress rule to allow traffic from the Grafana ECS container
# resource "aws_security_group_rule" "grafana_ingress" {
#   type                     = "ingress"
#   from_port                = 3100
#   to_port                  = 3100
#   protocol                 = "tcp"
#   description              = "Allow traffic from the Grafana ECS container"
#   security_group_id        = aws_security_group.loki_sg.id
#   source_security_group_id = module.ecs_service_grafana.ecs_security_group_id # Replace with the actual security group ID for Grafana
# }

# By placing the Lambda function inside a VPC and attaching it to a security group, you gain the ability to restrict access to your Loki ECS container to only that Lambda function. This provides an additional layer of security, as your Loki ECS container will only accept traffic from specific, trusted sources.
# Controlled Access: By using security groups, you can tightly control which resources are allowed to communicate with your Loki ECS container, reducing the risk of unauthorized access.
# Enhanced Security: Restricting ingress to the Loki ECS container from only the Lambda function’s security group is a best practice in secure cloud architecture, especially when handling sensitive data like logs.

# # Egress rule to allow all outbound traffic
# resource "aws_security_group_rule" "egress" {
#   type              = "egress"
#   from_port         = 0
#   to_port           = 0
#   protocol          = "-1"
#   description       = "Allow all outbound traffic"
#   security_group_id = aws_security_group.loki_sg.id
#   cidr_blocks       = ["0.0.0.0/0"]
# }
