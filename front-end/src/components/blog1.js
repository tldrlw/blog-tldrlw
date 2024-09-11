import CodeBlock from '@/components/codeBlock';
import { vpcExplanation, acmAndRoute53Explanation } from './blog1-sections';

const providerTf = `
terraform {
  backend "s3" {
    bucket         = "<your s3 bucket name>"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "<your dynamodb table name>"
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
  region = "us-east-1"
  default_tags {
    tags = {
      ManagedBy = "Terraform"
    }
  }
}
`;

const ecrTf = `
resource "aws_ecr_repository" "main" {
  name                 = var.APP_NAME
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}
`;

const vpcTf = `
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

resource "aws_subnet" "public" {
  count                   = 3
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.\${count.index}.0/24"
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  # data.aws_availability_zones.available.names[count.index], will dynamically get the available zones for the region you are in
  # makes your configuration more flexible and adaptable to different regions with different availability zones
  # all regions have a MINIMUM of 3 availability zones, so this will alert you when trying to create x subnets > 3 in an unsupported region
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public" {
  count          = 3
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}
`;

const sourcesTf = `
data "aws_route53_zone" "main" {
  # change the name to whatever domain you bought from Route 53
  name         = "<your domain goes here, e.g., helloworld.com>"
  private_zone = false
}

data "aws_availability_zones" "available" {
  state = "available"
}
`;

const route53acmTf = `
resource "aws_acm_certificate" "main" {
  domain_name       = var.HOSTNAME
  validation_method = "DNS"
  key_algorithm     = "RSA_2048"
  tags = {
    Name = var.APP_NAME
  }
}

resource "aws_route53_record" "main_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.value]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.tldrlw_com.zone_id
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.main_cert_validation : record.fqdn]
}

resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.main.zone_id
  # set the name to a subdomain if you want one, otherwise set it to "" to use your root domain, for my use case I wanted a subdomain
  name    = "blog"
  # will show up in management console Route 53 as 'blog.tldrlw.com'
  type = "A"
  alias {
    name                   = module.main.alb_dns_name
    zone_id                = module.main.alb_zone_id
    evaluate_target_health = true
  }
}
`;

export default function Blog1() {
  return (
    <main>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>
        Deploying a public Next.js app to AWS ECS
      </h1>
      <p className='mb-2 text-sm font-light md:mb-4 md:text-base'>
        Tuesday, September 10, 2024
      </p>
      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 text-gray-700 md:mb-4'>
          This guide will take a very barebones next.js app and deploy it to ECS
          (Elastic Container Service), and I&apos;m assuming you have a basic
          understanding of Terraform and how it works, creating an AWS IAM
          (identity access management) User with a Secret Key and Secret Access
          Key to run Terraform{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html'
          >
            locally
          </a>{' '}
          against your AWS account, and a basic understanding of bash scripting.
          Code references for everything we will do can be found{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://github.com/tldrlw/blog-tldrlw/tree/boilerplate-nextjs'
          >
            here.
          </a>
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          First step is to set up your Terraform remote backend using S3 and
          DynamoDB, use
          <a
            className='text-blue-500 hover:underline'
            href='https://hackernoon.com/deploying-a-terraform-remote-state-backend-with-aws-s3-and-dynamodb'
          >
            {' '}
            this
          </a>{' '}
          guide to get that done. You can do this through the AWS managment
          console or do it using Terraform, in my case, I did it using
          Terraform, but I have this code available only locally and in a
          different directory. To provision the S3 bucket and the DynamoDB table
          required for my main codebase &apos; remote state, I used the
          Terraform local state as opposed to the remote backend. After
          you&apos;ve created the remote backend resources, you&apos;ll need to
          reference them in the remote backend you&apos;ll be setting up for
          this project. For my project I am provisioning my components of my
          infrastructure in region <code>us-east-1</code>, you can pick whatever
          region is best suited to you, find more information about AWS regions{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html'
          >
            here
          </a>
          . There's also a neat{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://aws-latency-test.com/'
          >
            tool
          </a>{' '}
          you can use to gauge which region will result in the lowest latency
          for the geographic origin of most of your users.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          {' '}
          <span className='!important text-customOrangeLogo'>Definition: </span>
          A Terraform provider is a plugin that enables Terraform to interact
          with APIs of cloud platforms and other services, allowing Terraform to
          manage and provision resources on those platforms (e.g., AWS, Azure,
          Google Cloud).
        </p>
        <CodeBlock
          filePath={'provider.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={providerTf}
        ></CodeBlock>
      </section>
      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          Let&apos;s now start building out our other app-related resources
          starting with ECR (elastic container registry) and VPC (virtual
          private cloud), with the latter having a couple of resources in a
          single file.
        </p>
        <CodeBlock
          filePath={'ecr.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={ecrTf}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          As you can see below, we have five distinct resources as part of our
          VPC configuration below, below the code block we will dive into each
          one of them and understand how they all work together.
        </p>
        <CodeBlock
          filePath={'vpc.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={vpcTf}
        ></CodeBlock>
        <div className='my-4'>{vpcExplanation()}</div>
        <p className='mb-2 md:mb-4'>
          Now that we have our network configured correctly to maintain high
          availability for our app running ECS, we can proceed to build out our
          ALB (application load balancer) with a SSL (Secure Sockets Layer)
          certificate request from ACM (AWS Certificate Manager) to ensure that
          our app serves traffic only over HTTPS, for secure transmissions
          between client and server. However, in order to request the
          certificate we need to own a domain first, and you can use Route 53 to
          buy a domain of your choosing, I bought <code>tldrlw.com</code> (and I
          did this throught the management console UI), upon which I was
          provided with a Route 53 hosted zone. We will need this hosted zone
          moving forward, so make sure you buy yourself a domain before
          proceeding.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          {' '}
          <span className='!important text-customOrangeLogo'>Definition: </span>
          A Terraform data source is a mechanism that allows Terraform to query
          external data or resources that are managed outside of the current
          Terraform configuration. Instead of creating resources, data sources
          are used to retrieve information about existing infrastructure—such as
          AWS AMIs, VPCs, or subnets—so that this data can be used in the
          Terraform configuration. This allows you to incorporate existing
          resources into your infrastructure without duplicating them or
          managing them directly with Terraform.
        </p>
        <CodeBlock
          filePath={'sources.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={sourcesTf}
        ></CodeBlock>
        <p className='my-2 md:mb-4'>
          Like the defintion above explains, we need to pull information about
          the hosted zone that was created when you registered your new domain
          in Route 53, we will need to pass in the zone id when creating a Route
          53 A record and also when create Route 53 records involved in our
          process of requesting a certificate from ACM. Let&apos;s create the
          Route 53 and ACM resources and then understand how it all works.
        </p>
        <CodeBlock
          filePath={'route53-acm.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={route53acmTf}
        ></CodeBlock>
        <div className='my-4'>{acmAndRoute53Explanation()}</div>
      </section>

      <section className='mb-6 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 italic text-gray-700'>To be continued...</p>
      </section>
    </main>
  );
}
