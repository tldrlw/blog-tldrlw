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
    }
  ]
  certificate_arn      = aws_acm_certificate_validation.main.certificate_arn
  # change if you don't want your app to be entirely public
  security_group_cidrs = ["0.0.0.0/0"]
}
