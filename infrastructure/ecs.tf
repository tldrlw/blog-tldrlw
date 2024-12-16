resource "aws_ecs_cluster" "main" {
  name = "main"
  # also serving:
  # monza-tldrlw
  # aws-nextjs-crud-app (ran terraform destroy)
  # loki-tldrlw
  # grafana-tldrlw
}
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_cluster#attribute-reference

module "ecs_service" {
  source                      = "git::https://github.com/tldrlw/terraform-modules.git//ecs-service"
  APP_NAME                    = var.APP_NAME
  ecr_repo_url                = aws_ecr_repository.main.repository_url
  image_tag                   = var.IMAGE_TAG
  ecs_cluster_id              = aws_ecs_cluster.main.id
  ECS_CLUSTER_NAME            = "main"
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
}

# rm -rf .terraform/modules > terraform init
# run ^ after pushing up changes to modules when testing locally

# useful example aws cli commands to run shell commands inside a running container
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
