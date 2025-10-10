provider "aws" {
  region = var.aws_region
}
provider "aws" {
  alias = "acm_provider"
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "amazeddev-tf-state"
    key    = "next-portfolio"
    region = "eu-central-1"
  }
}

locals {
  s3_origin_id = "s3_amazed_dev"
}


data "aws_route53_zone" "primary" {
  name = var.domain_name
}

module "static_website" {
  source          = "./modules/static-website"
  bucket_name     = var.bucket_name
  root_domain     = var.domain_name
  route53_zone_id = data.aws_route53_zone.primary.zone_id
}

