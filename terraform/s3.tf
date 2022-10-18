resource "aws_s3_bucket" "root_bucket" {
  bucket = var.bucket_name
  acl = "public-read"
  policy = templatefile("templates/s3-policy.json", { bucket = var.bucket_name })

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  force_destroy = true
  tags = var.common_tags
}

