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

