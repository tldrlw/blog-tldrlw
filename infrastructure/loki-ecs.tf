resource "aws_ecs_service" "loki" {
  name            = "loki-tldrlw"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.loki.arn
  desired_count   = 1 # Adjust this based on your needs
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = aws_subnet.public[*].id         # List of subnet IDs
    security_groups  = [aws_security_group.loki_sg.id] # Security group ID(s)
    assign_public_ip = true                            # Set to false if you don't need a public IP
  }
  load_balancer {
    target_group_arn = module.main.alb_target_group_arns[2]
    container_name   = "loki-tldrlw"
    container_port   = 3100
  }
}

resource "aws_ecs_task_definition" "loki" {
  family                   = "loki-tldrlw"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn # ECS execution role for logging and image pull
  task_role_arn            = aws_iam_role.ecs_task_role.arn           # Task role for application access
  memory                   = "512"
  cpu                      = "256"
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64"
  }
  # ^ see infrastructure/grafana-loki/docker-push-loki.sh
  container_definitions = templatefile(
    "${path.module}/task_definition.tpl.json",
    {
      app_name       = "loki-tldrlw"
      image          = "${aws_ecr_repository.loki.repository_url}:latest" # Replace with your custom loki image
      container_port = 3100
      host_port      = 3100
      region         = data.aws_region.current.name
      environment_variables = jsonencode(
        [
          # { name = "TEST", value = "test" },
          # ^ comment/uncomment to get new task
          { name = "PORT", value = "3100" },
          { name = "LOKI_CHUNK_RETENTION_DURATION", value = "168h" },
          { name = "LOKI_STORAGE_CONFIG_FILESYSTEM_DIRECTORY", value = "/data" }
        ]
      )
    }
  )
}
