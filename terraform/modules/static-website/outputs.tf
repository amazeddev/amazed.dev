output "bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.cdn.domain_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.cdn.id
}

output "acm_certificate_arn" {
  value = aws_acm_certificate.cert.arn
}

output "cloudfront_invalidate_policy_arn" {
  value = try(aws_iam_policy.cloudfront_invalidate_paths[0].arn, null)
  description = "ARN of the CloudFront invalidate IAM policy, if created."
}
