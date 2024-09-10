terraform {
  backend "s3" {
    bucket         = "tfstate-tldrlw-blog"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tfstate-tldrlw-blog"
    encrypt        = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40.0"
    }
  }
  required_version = ">= 1.7.4"
}

provider "aws" {
  # profile = "refayatabid"
  # ^ uncomment when running tf locally
  # ^ comment out when running tf in github workflow
  # The AWS provider block in your Terraform configuration can include the profile, which will be used for provisioning resources. 
  # However, this does not affect the backend configuration, which is why the environment variable method is typically used for backend authentication.
  # need to `export AWS_PROFILE=refayatabid` before running terraform init for this reason...
  region = "us-east-1"
  default_tags {
    tags = {
      ManagedBy = "Terraform"
    }
  }
}

provider "aws" {
  # profile = "refayatabid"
  # ^ uncomment when running tf locally
  # ^ comment out when running tf in github workflow
  alias  = "hyderabad"
  region = "ap-south-2"
  default_tags {
    tags = {
      ManagedBy = "Terraform"
      Repo      = "https://github.com/refayatabid/gc-reservations/tree/dev/infrastructure"
    }
  }
}