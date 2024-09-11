import CodeBlock from '@/components/codeBlock';
import {
  vpcExplanation,
  acmAndRoute53Explanation,
  albAndEcsExplanation,
} from './blog1-sections';

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
  # data.aws_availability_zones.available.names[count.index], will 
  # dynamically get the available zones for the region 
  # you are in makes your configuration more flexible 
  # and adaptable to different regions with different 
  # availability zones all regions have a MINIMUM 
  # of 3 availability zones, so this will alert you when 
  # trying to create x subnets > 3 in an unsupported region
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
  # change the name to whatever domain 
  # you bought from Route 53
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
  # set the name to a subdomain if you want one, 
  # otherwise set it to "" to use your root 
  # domain, for my use case I wanted a subdomain
  name    = "blog"
  # will show up in management console Route 53 
  # as 'blog.tldrlw.com'
  type = "A"
  alias {
    name                   = module.main.alb_dns_name
    zone_id                = module.main.alb_zone_id
    evaluate_target_health = true
  }
}
`;

const variablesTf = `
variable "APP_NAME" {
  type    = string
  default = "blog-tldrlw"
}

output "TF_VAR_APP_NAME" {
  value = var.APP_NAME
}

variable "IMAGE_TAG" {
  type    = string
  default = "latest"
}

output "TF_VAR_IMAGE_TAG" {
  value = var.IMAGE_TAG
}

variable "HOSTNAME" {
  type = string
  # change this to what you want you deployed 
  # domain to be, e.g., mywebsite.com, my.website.com, etc.
  # if using a subdomain like my.website.com, 
  # be sure to check the "name" property in the 
  # resource aws_route_53_record.main we created above
  default = "blog.tldrlw.com"
}

output "TF_VAR_HOSTNAME" {
  value = var.HOSTNAME
}
`;

const albTf = `
module "main" {
  source               = "git::https://github.com/tldrlw/terraform-modules.git//app-load-balancer?ref=dev"
  vpc_id               = aws_vpc.main.id
  subnet_ids           = aws_subnet.public[*].id
  alb_name             = var.APP_NAME
  hostname             = var.HOSTNAME
  target_group_name    = var.APP_NAME
  certificate_arn      = aws_acm_certificate_validation.main.certificate_arn
  # change if you don't want your app to be entirely public
  security_group_cidrs = ["0.0.0.0/0"]
}
`;

const ecsTf = `
resource "aws_ecs_cluster" "main" {
  name = "main"
}

module "ecs_service" {
  source                      = "git::https://github.com/tldrlw/terraform-modules.git//ecs-service?ref=dev"
  app_name                    = var.APP_NAME
  ecr_repo_url                = aws_ecr_repository.main.repository_url
  image_tag                   = var.IMAGE_TAG
  ecs_cluster_id              = aws_ecs_cluster.main.id
  task_count                  = 1
  alb_target_group_arn        = module.main.alb_target_group_arn
  source_security_group_id    = module.main.alb_security_group_id
  # change if you don't want your app to be entirely public
  security_group_egress_cidrs = ["0.0.0.0/0"]
  subnets                     = aws_subnet.public[*].id
  vpc_id                      = aws_vpc.main.id
  container_port              = 3000
  host_port                   = 3000
  # linux_arm64          = true
  # ^ set to true if using the following scripts to build and push images to ECR on M-series Macs:
  # https://github.com/tldrlw/radiotodaydhaka/blob/main/docker-push.sh
  # https://github.com/tldrlw/gc-reservations/blob/main/front-end/docker-push.sh
}
`;

export default function Blog1() {
  return (
    <main>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>
        Deploying a public Next.js app to AWS ECS
      </h1>
      <p className='mb-2 text-sm font-light md:mb-4 md:text-base'>
        Wednesday, September 11, 2024
      </p>

      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          In addition to multiple *tldrlw.com apps, I consistently work on other
          projects for friends, family and partnerships, therefore, I needed to
          build a template to deploy Next.js apps efficiently and reliably.
          Having worked out a good system I want to share this with others who
          might be looking for a similar solution. This guide will take a very
          barebones next.js app and deploy it to ECS (Elastic Container
          Service), and I&apos;m assuming you have a basic understanding of
          Terraform and how it works, creating an AWS IAM (identity access
          management) User with a Secret Key and Secret Access Key to run
          Terraform{' '}
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
        <p className='mb-2 md:mb-4'>
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
        <p className='mb-2 md:mb-4'>
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
          starting with ECR (Elastic Container Registry) and VPC (Virtual
          Private Cloud), with the latter having a couple of resources in a
          single file.
        </p>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important text-customOrangeLogo'>
            Why use containers?{' '}
          </span>
          They provide a lightweight, portable, and consistent environment,
          ensuring that applications can run uniformly across development,
          testing, and production environments. This helps eliminate the “it
          works on my machine” problem by encapsulating all dependencies, making
          environments identical across different stages of the software
          lifecycle, while also improving scalability and resource efficiency.
        </p>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important text-customOrangeLogo'>Definition: </span>
          ECR is a fully managed Docker container registry service, and it
          allows you to store, manage, and deploy Docker container images
          securely. With ECR, developers can push, pull, and manage container
          images, making it an essential service for working with AWS services
          like Amazon ECS.
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
          ALB (Application Load Balancer) with a SSL (Secure Sockets Layer)
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
        <p className='mb-2 md:mb-4'>
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

      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          By now you would've noticed things like <code>var.APP_NAME</code> and{' '}
          <code>var.HOSTNAME</code>, these are Terraform variables we will need
          to define in a <code>variables.tf</code> file, using variables ensure
          consistency and maintainability when building infrastructure,
          furthermore, should you need to make any changes, you only need to do
          it in one place. Let's define our variables like how you see below.
        </p>
        <CodeBlock
          filePath={'variables.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={variablesTf}
        ></CodeBlock>
        <p className='my-2 md:mb-4'>
          At this point, for the infrastructure part of things, all we have left
          are the ECS and ALB resources. For these resources, we will be using
          Terraform modules. A Terraform module is a reusable collection of
          Terraform resources that are organized and packaged to perform a
          specific task, such as provisioning infrastructure components. It
          helps simplify infrastructure management by allowing you to define
          common patterns and reuse them across different configurations, making
          your code more maintainable and scalable. Since I'm building multiple
          Next.js apps, I've tried to modularize as much Terraform configuration
          as possible, to keep app-specific repositories "DRY" (Don't Repeat
          Yourself). The modules we'll be using can be found{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://github.com/tldrlw/terraform-modules'
          >
            here
          </a>
          .
        </p>
        <p className='mb-2 md:mb-4'>
          For the purposes of education, my preference in relying on modules is
          not ideal, since you won't be able to see the underlying
          infrastructure resources that go into provisioning an ECS service +
          task and the ALB. I will have another blog post soon explaining the
          components of these two modules and their synergies.
        </p>
        <CodeBlock
          filePath={'alb.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={albTf}
        ></CodeBlock>
        <p className='my-2 md:mb-4'>
          As you can see above the CIDR range is set to <code>"0.0.0.0/0"</code>
          , this is because we are building a public app, if your app will serve
          traffic from a confined space like an office network, you can change
          this value to your appropriate CIDR range. And now that the ALB is
          created, we can move on to ECS, as mentioned above, we will rely on my
          module to create the service, but the cluster itself will be managed
          normally as a resource.
        </p>
        <CodeBlock
          filePath={'ecs.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={ecsTf}
        ></CodeBlock>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important text-customOrangeLogo'>Important!: </span>
          If you&apos;re running the provided bash script to build and push your
          Next.js Docker image to ECR on an{' '}
          <span class='italic'>M-series Mac</span>, you will need to set{' '}
          <code>linux_arm64 = true</code>
        </p>
        <p className='my-2 md:mb-4'>
          Note the lines{' '}
          <code>
            alb_target_group_arn = module.main.alb_target_group_arn
            source_security_group_id = module.main.alb_security_group_id
          </code>{' '}
          above, this module is getting configuration data that is being
          outputted from the ALB module reference. This is something you can do
          in Terraform when one module reference relies on information upon the
          creation of resources from <span className='italic'>another</span>{' '}
          module reference. Having set up our ALB and ECS resources, let&apos;s
          try and better understand what they do (quick refreshers) and how
          they're connected.
        </p>
        <div className='my-4'>{albAndEcsExplanation()}</div>
      </section>

      <section className='mb-6 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 italic text-gray-700'>To be continued...</p>
      </section>
    </main>
  );
}
