# ACM certificate resource with SAN
resource "aws_acm_certificate" "main" {
  domain_name               = var.HOSTNAME             # Primary domain (e.g., blog.tldrlw.com)
  subject_alternative_names = var.ADDITIONAL_HOSTNAMES # SAN to include other domains (e.g., monza.tldrlw.com)
  validation_method         = "DNS"
  key_algorithm             = "RSA_2048"

  tags = {
    Name = var.APP_NAME
  }
}
# modify the existing ACM certificate resource to include Subject Alternative Names (SANs). By doing so, you can include both blog.tldrlw.com and monza.tldrlw.com in the same certificate, allowing the Application Load Balancer (ALB) to use the same certificate for both domains.

# Route 53 record for ACM certificate validation
resource "aws_route53_record" "main_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.value]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.tldrlw_com.zone_id
}

# Certificate validation resource to validate all domains (including SANs)
resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.main_cert_validation : record.fqdn]
}
