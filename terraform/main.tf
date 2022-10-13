provider "aws" {
  version = "~> 2.0"
  region  = "eu-central-1"
}

terraform {
  backend "s3" {
    bucket = "amazeddev-tf-state"
    key    = "next-portfolio"
    region = "eu-central-1"
  }
}

resource "aws_s3_bucket" "s3Bucket" {
  bucket = "next-portfolio"
  acl    = "public-read"

  policy = <<EOF
{
  "Id": "MakePublic",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::next-portfolio/*",
      "Principal": "*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
  }
}