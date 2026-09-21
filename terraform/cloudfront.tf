# Cloudfront distribution for main s3 site.

# Honours the Cache-Control headers set during the S3 sync in CI.
data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_function" "rewrite_uri" {
  name    = "amazed-dev-rewrite-uri"
  runtime = "cloudfront-js-2.0"
  comment = "Maps clean URLs to exported .html files and redirects legacy blog links"
  publish = true
  code    = file("${path.module}/functions/rewrite-uri.js")
}

# next.config.js headers() are ignored by `output: "export"`, so the security
# headers have to be attached here instead.
resource "aws_cloudfront_response_headers_policy" "security_headers" {
  name    = "amazed-dev-security-headers"
  comment = "Security headers for amazed.dev"

  security_headers_config {
    content_type_options {
      override = true
    }

    frame_options {
      frame_option = "DENY"
      override     = true
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }

    strict_transport_security {
      access_control_max_age_sec = 63072000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
  }

  # Report-Only until the policy is confirmed against the live site in a
  # browser console; then move it to an enforced content_security_policy
  # inside security_headers_config. Next.js ships inline bootstrap scripts and
  # the JSON-LD block, and FontAwesome injects inline styles, hence
  # 'unsafe-inline'.
  custom_headers_config {
    items {
      header   = "Content-Security-Policy-Report-Only"
      override = true
      value = join("; ", [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
        "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
        "img-src 'self' data:",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
      ])
    }
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "The cloudfront distribution for amazed.dev"
  default_root_object = "index.html"
  aliases             = [var.domain_name, "www.${var.domain_name}"]
  price_class         = "PriceClass_100"

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    target_origin_id           = "S3-${var.bucket_name}"
    viewer_protocol_policy     = "redirect-to-https"
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_uri.arn
    }
  }

  # Hashed build output - immutable, never needs the URI rewrite.
  ordered_cache_behavior {
    path_pattern               = "/_next/static/*"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    target_origin_id           = "S3-${var.bucket_name}"
    viewer_protocol_policy     = "redirect-to-https"
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers.id
  }

  origin {
    domain_name = aws_s3_bucket.root_bucket.website_endpoint
    origin_id   = "S3-${var.bucket_name}"

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # Unknown paths return the exported 404 page with a real 404 status - the
  # bucket's error_document handles it, so no SPA-style rewrite to index.html.

  tags = var.common_tags
}

resource "aws_iam_policy" "cloudfront_invalidate_paths" {
  name        = "cloudfront-invalidate-paths"
  description = "Used by CI pipelines to delete cached paths"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid      = "VisualEditor0",
        Effect   = "Allow",
        Action   = "cloudfront:CreateInvalidation",
        Resource = "*"
      }
    ]
  })
}
