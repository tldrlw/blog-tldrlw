resource "aws_route53_record" "root_domain" {
  zone_id = data.aws_route53_zone.tldrlw_com.zone_id
  name    = "blog"
  # will show up in management console Route 53 as 'blog.tldrlw.com'
  type = "A"
  alias {
    name                   = module.main.alb_dns_name
    zone_id                = module.main.alb_zone_id
    evaluate_target_health = true
  }
}
