resource "aws_ecs_cluster" "main" {
  name = "main"
  # also serving:
  # monza-tldrlw
  # aws-nextjs-crud-app (ran terraform destroy)
  # loki-tldrlw
  # grafana-tldrlw
}

module "ecs_service" {
  source                      = "git::https://github.com/tldrlw/terraform-modules.git//ecs-service"
  app_name                    = var.APP_NAME
  ecr_repo_url                = aws_ecr_repository.main.repository_url
  image_tag                   = var.IMAGE_TAG
  ecs_cluster_id              = aws_ecs_cluster.main.id
  task_count                  = 1
  alb_target_group_arn        = module.main.alb_target_group_arns[0]
  source_security_group_id    = module.main.alb_security_group_id
  security_group_egress_cidrs = ["0.0.0.0/0"]
  subnets                     = aws_subnet.public[*].id
  vpc_id                      = aws_vpc.main.id
  container_port              = 3000
  host_port                   = 3000
  # cpu                         = "256"
  # memory                      = "512"
  # ^ doubled both on 9/18/24, halved again (module default values) on 10/14/24
  # linux_arm64                 = true
  # ^ set to true if building and pushing images to ECR on M-series Macs:
  iam_user_for_container_shell = "local"
}

module "ecs_service_loki" {
  source                      = "git::https://github.com/tldrlw/terraform-modules.git//ecs-service"
  app_name                    = "loki-tldrlw"
  ecr_repo_url                = "grafana/loki"
  image_tag                   = "latest"
  ecs_cluster_id              = aws_ecs_cluster.main.id
  task_count                  = 1
  alb_target_group_arn        = module.main.alb_target_group_arns[2]
  source_security_group_id    = module.main.alb_security_group_id
  security_group_egress_cidrs = ["0.0.0.0/0"]
  subnets                     = aws_subnet.public[*].id
  vpc_id                      = aws_vpc.main.id
  container_port              = 3100
  host_port                   = 3100
  environment_variables = [
    { name = "PORT", value = "3100" },
    { name = "LOKI_CHUNK_RETENTION_DURATION", value = "168h" },
    { name = "LOKI_STORAGE_CONFIG_FILESYSTEM_DIRECTORY", value = "/data" }
  ]
  iam_user_for_container_shell = "local"
}

module "ecs_service_grafana" {
  source   = "git::https://github.com/tldrlw/terraform-modules.git//ecs-service"
  app_name = "grafana-tldrlw"
  # ecr_repo_url                = "grafana/grafana"
  ecr_repo_url                = aws_ecr_repository.grafana_with_awscli.repository_url
  image_tag                   = "latest"
  ecs_cluster_id              = aws_ecs_cluster.main.id
  task_count                  = 1
  alb_target_group_arn        = module.main.alb_target_group_arns[3]
  source_security_group_id    = module.main.alb_security_group_id
  security_group_egress_cidrs = ["0.0.0.0/0"]
  subnets                     = aws_subnet.public[*].id
  vpc_id                      = aws_vpc.main.id
  container_port              = 3000
  host_port                   = 3000
  environment_variables = [
    { name = "GF_SECURITY_ADMIN_USER", value = data.aws_ssm_parameter.grafana_username_refayat.value },
    { name = "GF_SECURITY_ADMIN_PASSWORD", value = data.aws_ssm_parameter.grafana_password_refayat.value },
    # can shell into container with e1s and run `echo $GF_SECURITY_ADMIN_PASSWORD` to see ^
    { name = "GF_SERVER_PROTOCOL", value = "http" }, # Use HTTP if ALB terminates HTTPS
    { name = "GF_SERVER_HTTP_PORT", value = "3000" },
    { name = "GF_DATASOURCE_LOKI_URL", value = "https://loki.tldrlw.com/loki" }
    # ^ Environment Variable (GF_DATASOURCE_LOKI_URL): While not required for provisioning, the GF_DATASOURCE_LOKI_URL environment variable can act as a backup configuration reference if you ever define the data source dynamically.
  ]
  iam_user_for_container_shell = "local"
  s3_ecs_config_files_access   = true
  linux_arm64                  = true
  # ^ set to true if building and pushing images to ECR on M-series Macs:
  # since building and pushing (locally) a custom grafana image with awscli installed (see infrastructure/grafana-with-awscli-image.sh)
}

# rm -rf .terraform/modules > terraform init
# run ^ after pushing up changes to modules when testing locally

resource "null_resource" "copy_grafana_datasource_to_running_container" {
  depends_on = [module.ecs_service_grafana]
  triggers = {
    always_run = timestamp() # This will always change on each apply, forcing the provisioner to rerun
  }
  # ^ not the best way to do it for changes to grafana service...but can comment out if there are no changes to grafana service...or reduce/comment out sleep below...
  provisioner "local-exec" {
    command = <<-EOF
      # Wait for the ECS task to fully initialize
      # sleep 360
      # Get the task ID of the running ECS task
      TASK_ID=$(aws ecs list-tasks \
        --cluster ${aws_ecs_cluster.main.name} \
        --service-name grafana-tldrlw \
        --desired-status RUNNING \
        --query "taskArns[0]" \
        --output text)

      # Execute the command in the container using ECS Exec
      aws ecs execute-command \
        --cluster ${aws_ecs_cluster.main.name} \
        --task $TASK_ID \
        --container grafana-tldrlw \
        --interactive \
        --command "sh -c 'aws s3 cp s3://tldrlw-ecs-config-files/grafana-datasources.yaml . && echo File copied && cd ../../../../ && ./run.sh'"
    EOF
  }
}
# datasources.yaml File: The startup script pulls grafana-datasources.yaml from S3 and places it in Grafana’s provisioning directory (/etc/grafana/provisioning/datasources/). Grafana reads this directory on startup and loads any data sources defined there.
# Automatic Provisioning on Grafana Startup: When Grafana starts, it will detect datasources.yaml in the provisioning directory and automatically add the Loki data source based on the settings in that file.

# # Fetch the task ID
# TASK_ID=$(aws ecs list-tasks \
#   --cluster main \
#   --service-name grafana-tldrlw \
#   --desired-status RUNNING \
#   --query "taskArns[0]" \
#   --output text)

# # Execute the command in the container
# aws ecs execute-command \
#   --cluster main \
#   --task "$TASK_ID" \
#   --container grafana-tldrlw \
#   --interactive \
#   --command "sh -c 'aws s3 cp s3://tldrlw-ecs-config-files/grafana-datasources.yaml . && echo File copied && cd ../../../../ && ./run.sh'"
