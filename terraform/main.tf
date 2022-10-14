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
