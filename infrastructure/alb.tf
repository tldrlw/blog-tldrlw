module "main" {
  source               = "git::https://github.com/tldrlw/terraform-modules.git//app-load-balancer"
  vpc_id               = aws_vpc.main.id
  subnet_ids           = aws_subnet.public[*].id
  alb_name             = var.APP_NAME
  target_group_and_listener_config = [
    {
      name              = var.APP_NAME
      domain            = var.HOSTNAME
      health_check_path = "/"
    },
    {
      name              = "monza-tldrlw"
      domain            = "monza.tldrlw.com"
      health_check_path = "/"
    }
  ]
  certificate_arn      = aws_acm_certificate_validation.main.certificate_arn
  security_group_cidrs = ["0.0.0.0/0"]
  enable_logs_to_s3    = true
  elb_account_id       = "127311923021"
}
# rm -rf .terraform/modules > terraform init
# run ^ after pushing up changes to modules when testing locally
