# Static Website Module

This Terraform module provisions a static website using S3, CloudFront, ACM, and Route53. It supports both root and www domains, and will create and validate an ACM certificate for use with CloudFront.

## Usage Example

```hcl
module "static_website" {
  source          = "./modules/static-website"
  bucket_name     = "your-bucket-name"
  root_domain     = "example.com"
  route53_zone_id = "Z1234567890"
}
```

## Variables
- `bucket_name`: Name of the S3 bucket for the static site.
- `root_domain`: Root domain name (e.g. example.com).
- `route53_zone_id`: Route53 Hosted Zone ID for the domain.

## Outputs
- `bucket_name`: The S3 bucket name.
- `cloudfront_domain_name`: The CloudFront distribution domain name.
- `cloudfront_distribution_id`: The CloudFront distribution ID.
- `acm_certificate_arn`: The ARN of the ACM certificate.

## Notes
- The module creates and validates an ACM certificate in us-east-1 (required for CloudFront).
- Both root and www domains are supported and pointed to CloudFront.
- S3 bucket is configured for static website hosting.
