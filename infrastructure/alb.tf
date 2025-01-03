module "main" {
  # source     = "git::https://github.com/tldrlw/terraform-modules.git//app-load-balancer?ref=dev"
  source     = "git::https://github.com/tldrlw/terraform-modules.git//app-load-balancer"
  vpc_id     = aws_vpc.main.id
  subnet_ids = aws_subnet.public[*].id
  alb_name   = var.APP_NAME
  target_group_and_listener_config = [
    {
      name              = var.APP_NAME
      domain            = var.HOSTNAME
      port              = 3000
      health_check_path = "/"
    },
    {
      name              = "monza-tldrlw"
      domain            = "monza.tldrlw.com"
      port              = 3000
      health_check_path = "/health"
      # ^ https://github.com/tldrlw/monza-tldrlw/blob/main/front-end/src/app/health/page.js
    },
    {
      name              = "loki-tldrlw"
      domain            = "loki.tldrlw.com"
      port              = 3100
      health_check_path = "/ready"
      # ^ https://grafana.com/docs/loki/latest/reference/loki-http-api/#status-endpoints
    },
    {
      name              = "grafana-tldrlw"
      domain            = "grafana.tldrlw.com"
      port              = 3000
      health_check_path = "/api/health"
      # ^ https://grafana.com/docs/grafana/latest/developers/http_api/other/#health-api
    }
  ]
  certificate_arn      = aws_acm_certificate_validation.main_new.certificate_arn
  security_group_cidrs = ["0.0.0.0/0"]
  enable_logs_to_s3    = true
  elb_account_id       = "127311923021"
  # ^ https://www.linkedin.com/posts/refayathaque_enable-access-logs-for-your-application-load-activity-7243339785212166144-lt7u?utm_source=share&utm_medium=member_desktop
}
# rm -rf .terraform/modules > terraform init
# run ^ after pushing up changes to modules when testing locally
