import CodeBlock from '@/components/codeBlock';

const providerTf = `
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
  region = "us-east-1"
  default_tags {
    tags = {
      ManagedBy = "Terraform"
    }
  }
}
`;

const hclCode = `
resource "aws_instance" "example" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
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
          This guide will take a very barebones next.js app and deploy it to
          ECS, I assume that you have a basic understanding of Terraform,
          setting up an IAM User with a Secret Key and Secret Access Key to run
          Terraform code against your AWS account, and a basic understanding of
          CI/CD pipelines written in YAML. Code references for everything we
          will do can be found{' '}
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
            href='https://github.com/tldrlw/blog-tldrlw/tree/boilerplate-nextjs'
          >
            {' '}
            this
          </a>{' '}
          guide to get that done. You can do it through the AWS managment
          console or do it using Terraform, in my case, I did it using Terraform
          and have the code only available locally, to provision the S3 bucket
          and the DynamoDB table I used the Terraform local state as opposed to
          the remote backend. After you've created the remote backend resources,
          you'll need to reference them in the remote backend you'll be setting
          up for this project. Your provider.tf should look like this:
        </p>
        <CodeBlock
          filePath={'provider.tf'}
          filePathStyle={'text-sm, text-customRed'}
          fileExtension={'yaml'}
          codeBlock={providerTf}
        ></CodeBlock>
      </section>
      {/* <CodeBlock
        filePath={'hello.tf'}
        fileExtension={'yaml'}
        codeBlock={hclCode}
      ></CodeBlock> */}
      <section className='mb-6 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 italic text-gray-700'>To be continued...</p>
      </section>
    </main>
  );
}
