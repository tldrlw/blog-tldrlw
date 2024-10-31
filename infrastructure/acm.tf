# Had to create a new certificate when I wanted to include loki.tldrlw.com and grafana.tldrlw.com in addition to blog.tldrlw.com and monza.tldrlw.com (existing setup), adding loki.tldrlw.com and grafana.tldrlw.com to the existing certificate wasn't working, and I was getting this error:
# Error: deleting ACM Certificate (arn:aws:acm:us-east-1:920394549028:certificate/89061701-3c25-47a9-b463-8fa7bcfd45f0): operation error ACM: DeleteCertificate, https response error StatusCode: 400, RequestID: 8ee94c9f-6a68-4baf-a563-c986b25c0ac8, ResourceInUseException: Certificate arn:aws:acm:us-east-1:920394549028:certificate/89061701-3c25-47a9-b463-8fa7bcfd45f0 in account 920394549028 is in use.

resource "aws_acm_certificate" "main_new" {
  domain_name               = var.HOSTNAME                 # Primary domain (e.g., blog.tldrlw.com)
  subject_alternative_names = var.ADDITIONAL_HOSTNAMES_NEW # SAN to include other domains (e.g., monza.tldrlw.com)
  validation_method         = "DNS"
  key_algorithm             = "RSA_2048"

  tags = {
    Name = "${var.APP_NAME}-NEW"
  }
}
# modify the existing ACM certificate resource to include Subject Alternative Names (SANs). By doing so, you can include both blog.tldrlw.com and monza.tldrlw.com in the same certificate, allowing the Application Load Balancer (ALB) to use the same certificate for both domains.

# Route 53 record for ACM certificate validation
resource "aws_route53_record" "main_new_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.main_new.domain_validation_options : dvo.domain_name => {
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
resource "aws_acm_certificate_validation" "main_new" {
  certificate_arn         = aws_acm_certificate.main_new.arn
  validation_record_fqdns = [for record in aws_route53_record.main_new_cert_validation : record.fqdn]
}
