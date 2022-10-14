provider "aws" {
  region = var.aws_region
}

terraform {
  backend "s3" {
    bucket = "amazeddev-tf-state"
    key    = "next-portfolio"
    region = "eu-central-1"
  }
}

locals {
  domain = "amazed.dev"
  s3_origin_id = "next-portfolio"
}


# resource "aws_acm_certificate" "react-aws-terraform-github-actions-cert" {
#   provider = aws.use1
#   domain_name = local.domain
#   validation_method = "DNS"
#   lifecycle {
#     create_before_destroy = true
#   }
# }