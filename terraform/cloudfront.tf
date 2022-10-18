# Cloudfront distribution for main s3 site.
resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled = true
  is_ipv6_enabled = true
  comment = "The cloudfront distribution for amazed.dev"
  default_root_object = "index.html"
  aliases = ["${var.domain_name}", "www.${var.domain_name}"]
  price_class = "PriceClass_100"
  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    min_ttl = 31536000
    default_ttl = 31536000
    max_ttl = 31536000
    compress = true
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  origin {
    domain_name = aws_s3_bucket.root_bucket.website_endpoint
    origin_id = "S3-${var.bucket_name}"

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method = "sni-only"
  }
  custom_error_response {
    error_code = 404
    error_caching_min_ttl = 86400
    response_page_path = "/index.html"
    response_code = 200
  }
  tags = var.common_tags
}
