# The attribute `${data.aws_caller_identity.current.account_id}` will be current account number
data "aws_caller_identity" "current" {}

data "aws_route53_zone" "tldrlw_com" {
  name         = "tldrlw.com"
  private_zone = false
}

# The attribute `${data.aws_region.current.name}` will be current region
data "aws_region" "current" {}
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/region

data "aws_availability_zones" "available" {
  state = "available"
}

// grafana credentials

# Retrieve the Cognito username from SSM Parameter Store
data "aws_ssm_parameter" "grafana_username_refayat" {
  name            = "/grafana/username/refayat" # Ensure the correct parameter name
  with_decryption = true                        # Decrypt SecureString value
}

# Retrieve the Cognito password from SSM Parameter Store
data "aws_ssm_parameter" "grafana_password_refayat" {
  name            = "/grafana/password/refayat" # Ensure the correct parameter name
  with_decryption = true                        # Decrypt SecureString value
}

// getting cloudwatch log group ARNs to pass into logging module

data "aws_cloudwatch_log_group" "lambda_monza_tldrlw_get_insights" {
  name = "/aws/lambda/monza-tldrlw-get-insights"
}

data "aws_cloudwatch_log_group" "ecs_monza_tldrlw" {
  name = "/aws/ecs/monza-tldrlw"
}

data "aws_cloudwatch_log_group" "lambda_monza_tldrlw_get_constructors" {
  name = "/aws/lambda/monza-tldrlw-get-constructors"
}

data "aws_cloudwatch_log_group" "lambda_monza_tldrlw_get_results" {
  name = "/aws/lambda/monza-tldrlw-get-results"
}
