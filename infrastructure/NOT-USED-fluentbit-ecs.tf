# resource "aws_security_group" "fluentbit_sg" {
#   name        = "fluentbit-sg"
#   description = "Security group for fluentbit container"
#   vpc_id      = aws_vpc.main.id

#   # Allow all outbound traffic so fluentbit can send logs to Loki over HTTPS
#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"          # -1 means all protocols
#     cidr_blocks = ["0.0.0.0/0"] # Allow outbound traffic to any IP
#   }

#   # No inbound rules needed as fluentbit does not need to receive any external connections
#   ingress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = [] # No inbound traffic allowed
#   }
# }

# resource "aws_ecs_service" "fluentbit" {
#   name            = "fluentbit-tldrlw"
#   cluster         = aws_ecs_cluster.main.id
#   task_definition = aws_ecs_task_definition.fluentbit.arn
#   desired_count   = 1 # Adjust this based on your needs
#   launch_type     = "FARGATE"
#   network_configuration {
#     subnets          = aws_subnet.public[*].id              # List of subnet IDs
#     security_groups  = [aws_security_group.fluentbit_sg.id] # Security group ID(s)
#     assign_public_ip = true                                 # Set to false if you don't need a public IP
#     # Public IP Needed: If your fluentbit container needs to communicate with external resources (like an external Loki endpoint over the internet) and your VPC doesn’t have a NAT gateway, then you should assign a public IP.
#     # No Public IP Needed: If your fluentbit container communicates only with resources within the VPC (like a Loki container running in the same VPC) or your VPC has a NAT gateway that handles outbound traffic.
#     # should look into removing public access to loki later...
#   }
# }

# resource "aws_ecs_task_definition" "fluentbit" {
#   family                   = "fluentbit-tldrlw"
#   network_mode             = "awsvpc"
#   requires_compatibilities = ["FARGATE"]
#   execution_role_arn       = aws_iam_role.fluentbit_task_execution_role.arn # ECS execution role for logging and image pull
#   task_role_arn            = aws_iam_role.fluentbit_task_role.arn           # Task role for application access
#   memory                   = "512"
#   cpu                      = "256"
#   runtime_platform {
#     operating_system_family = "LINUX"
#     cpu_architecture        = "ARM64"
#   }
#   # ^ see fluentbit-docker.sh
#   container_definitions = jsonencode([
#     {
#       name      = "fluentbit-tldrlw"
#       image     = "${aws_ecr_repository.fluentbit.repository_url}:latest" # Replace with your custom fluentbit image
#       cpu       = 256
#       memory    = 512
#       essential = true
#       logConfiguration = {
#         logDriver = "awslogs"
#         options = {
#           awslogs-create-group  = "true",
#           awslogs-group         = "/aws/ecs/fluentbit-tldrlw"
#           awslogs-region        = data.aws_region.current.name
#           awslogs-stream-prefix = "ecs"
#         }
#       }
#       environment = [
#         { name = "TEST", value = "test" },
#         { name = "AWS_REGION", value = data.aws_region.current.name }
#       ]
#       mountPoints = [
#         {
#           sourceVolume  = "fluentbit-positions"
#           containerPath = "/tmp"
#           readOnly      = false
#         }
#       ]
#     }
#   ])
#   # Use an ephemeral volume suitable for Fargate
#   volume {
#     name = "fluentbit-positions"
#   }
# }
