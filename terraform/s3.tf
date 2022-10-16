data "aws_iam_policy_document" "website_bucket_policy" {
  statement {
    actions = [
      "s3:GetObject"
    ]
    principals {
      identifiers = ["*"]
      type = "AWS"
    }
    resources = [
      "arn:aws:s3:::${var.bucket_name}/*",
      "arn:aws:s3:::www.${var.bucket_name}/*"
    ]
  }
}

resource "aws_s3_bucket" "www_bucket" {
  bucket = "www.${var.bucket_name}"
  acl = "public-read"
  policy = data.aws_iam_policy_document.website_bucket_policy.json

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket" "root_bucket" {
  bucket = var.bucket_name
  acl = "public-read"
  policy = data.aws_iam_policy_document.website_bucket_policy.json

  website {
    redirect_all_requests_to = "https://www.${var.domain_name}"
  }

  tags = var.common_tags
}

resource "aws_s3_bucket_public_access_block" "website_bucket_access_control" {
  bucket = aws_s3_bucket.website_bucket.id
  block_public_acls   = true
  ignore_public_acls = true
}
