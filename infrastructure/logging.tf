# module "logging" {
#   source                       = "git::https://github.com/tldrlw/terraform-modules.git//logging?ref=dev"
#   ALB_TARGET_GROUP_ARN_GRAFANA = module.main.alb_target_group_arns[3]
#   ALB_TARGET_GROUP_ARN_LOKI    = module.main.alb_target_group_arns[2]
#   ECR_REPO_URL_GRAFANA         = aws_ecr_repository.grafana.repository_url
#   ECR_REPO_URL_LOKI            = aws_ecr_repository.loki.repository_url
#   ECS_CLUSTER_ID               = aws_ecs_cluster.main.id
#   LINUX_ARM64                  = true
#   ECS_CLUSTER_NAME             = "main"
#   LOG_GROUPS = [
#     {
#       log_group     = "/aws/lambda/monza-tldrlw-get-insights",
#       friendly_name = "lambda-monza-get-insights",
#       arn           = data.aws_cloudwatch_log_group.lambda_monza_tldrlw_get_insights.arn
#     },
#     {
#       log_group     = "/aws/ecs/monza-tldrlw",
#       friendly_name = "ecs-monza",
#       arn           = data.aws_cloudwatch_log_group.ecs_monza_tldrlw.arn
#     },
#     {
#       log_group     = "/aws/lambda/monza-tldrlw-get-constructors",
#       friendly_name = "lambda-monza-get-constructors",
#       arn           = data.aws_cloudwatch_log_group.lambda_monza_tldrlw_get_constructors.arn
#     },
#     {
#       log_group     = "/aws/lambda/monza-tldrlw-get-results",
#       friendly_name = "lambda-monza-get-results",
#       arn           = data.aws_cloudwatch_log_group.lambda_monza_tldrlw_get_results.arn
#     }
#   ]
#   LOKI_URL         = "https://loki.tldrlw.com"
#   ORG_NAME         = "tldrlw"
#   PASSWORD_GRAFANA = data.aws_ssm_parameter.grafana_password_refayat.value
#   PRIVATE_SUBNETS  = aws_subnet.private[*].id
#   # ^ required for log-shipper λ function to be in a security group, it being in a security group allows the loki security group to only allow ingress from the λ function
#   # ^ defined in vpc.tf, destroy when destoying this...
#   PUBLIC_SUBNETS               = aws_subnet.public[*].id
#   SOURCE_ALB_SECURITY_GROUP_ID = module.main.alb_security_group_id
#   USERNAME_GRAFANA             = data.aws_ssm_parameter.grafana_username_refayat.value
#   VPC_ID                       = aws_vpc.main.id
# }

# rm -rf .terraform/modules > tf init
# run ^ after pushing up changes to modules when testing locally
