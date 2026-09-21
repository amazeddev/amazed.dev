/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export to S3 + CloudFront. Note: headers(), redirects() and
  // middleware do not run in this mode - they live in Terraform instead
  // (see terraform/cloudfront.tf).
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
