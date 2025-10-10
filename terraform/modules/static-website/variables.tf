variable "bucket_name" {
  description = "Name of the S3 bucket for the static site."
  type        = string
}

variable "root_domain" {
  description = "Root domain name (e.g. example.com)"
  type        = string
}

variable "route53_zone_id" {
  description = "Route53 Hosted Zone ID for the domain."
  type        = string
}

variable "create_invalidate_policy" {
  description = "Whether to create the CloudFront invalidate IAM policy."
  type        = bool
  default     = false
}
