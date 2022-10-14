data "aws_iam_policy_document" "website_policy" {
  statement {
    actions = [
      "s3:GetObject"
    ]
    principals {
      identifiers = [
      aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
      type = "AWS"
    }
    resources = ["arn:aws:s3:::site-${local.domain}/*"]
  }
  
  statement {
    actions = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::site-${local.domain}"]
    principals {
      type = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = "site-${local.domain}"
  acl = "private"
  policy = data.aws_iam_policy_document.website_policy.json
}
