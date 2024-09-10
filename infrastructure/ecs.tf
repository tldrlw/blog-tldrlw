resource "aws_ecs_cluster" "main" {
  name = "main"
}

module "ecs_service" {
  source                      = "git::https://github.com/tldrlw/terraform-modules.git//ecs-service?ref=dev"
  app_name                    = var.APP_NAME
  ecr_repo_url                = aws_ecr_repository.main.repository_url
  image_tag                   = var.IMAGE_TAG
  ecs_cluster_id              = aws_ecs_cluster.main.id
  task_count                  = 1
  alb_target_group_arn        = module.main.alb_target_group_arn
  source_security_group_id    = module.main.alb_security_group_id
  security_group_egress_cidrs = ["0.0.0.0/0"]
  subnets                     = aws_subnet.public[*].id
  vpc_id                      = aws_vpc.main.id
  container_port              = 3000
  host_port                   = 3000
  # linux_arm64          = true
  # ^ set to true if using the following scripts to build and push images to ECR on M-series Macs:
  # https://github.com/tldrlw/radiotodaydhaka/blob/main/docker-push.sh
  # https://github.com/tldrlw/gc-reservations/blob/main/front-end/docker-push.sh
}
# rm -rf .terraform/modules > terraform init
# run ^ after pushing up changes to modules when testing locally
