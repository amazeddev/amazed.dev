resource "aws_acm_certificate" "cert" {
  provider = aws.acm_provider
  domain_name = var.domain_name
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

# resource "aws_acm_certificate_validation" "cert" {
#   certificate_arn = aws_acm_certificate.cert.arn
#   validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
# }