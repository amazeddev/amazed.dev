variable "bucket_name" {
  type = string
  description = "The name of the bucket "
}
variable "aws_region" {
  type = string
  default = "eu-central-1"
}

variable "domain_name" {
  type = string
  description = "The domain name for the website."
}

variable "common_tags" {
  description = "Common tags you want applied to all components."
}