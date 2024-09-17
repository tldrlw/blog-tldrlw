import CodeBlock from '@/components/codeBlock';
import {
  lambdaExplanation,
  dynamoDBExplanation,
} from '@/app/lib/overviews/blog2';

const dydbTf = `
resource "aws_dynamodb_table" "messages" {
  name         = var.APP_NAME
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "PK" # Partition key (unique identifier for the message)
  # Define table attributes
  attribute {
    name = "PK"
    type = "S"
  }
  tags = {
    Name = var.APP_NAME
  }
}
`;

const variablesTf = `
variable "APP_NAME" {
  type    = string
  default = "aws-next-js-crud-app"
  # ^ feel free to change this to whatever you want to name this app
  # this value will be used to name Lambda functions and the DynamoDB table
}

variable "REGION" {
  type    = string
  default = "us-east-1"
}

variable "LAMBDA_PATH" {
  type    = string
  default = "lambda"
}
`;

const lambdaTf = `
module "lambda_get" {
  source              = "git::https://github.com/tldrlw/terraform-modules.git//apig-lambda"
  source_dir          = var.LAMBDA_PATH
  handler_file_prefix = "app-get"
  REST_method         = "GET"
  function_name       = "\${var.APP_NAME}-get"
  environment_variables = {
    DYDB_TABLE_NAME = aws_dynamodb_table.messages.name,
    REGION          = var.REGION
  }
  is_s3                  = false
  is_dydb                = true
  dydb_table_arn         = aws_dynamodb_table.messages.arn
  dydb_table_permissions = ["dynamodb:Scan", "dynamodb:DescribeTable"]
  function_url_public    = true
}

module "lambda_post" {
  source              = "git::https://github.com/tldrlw/terraform-modules.git//apig-lambda"
  source_dir          = var.LAMBDA_PATH
  handler_file_prefix = "app-post"
  REST_method         = "POST"
  function_name       = "\${var.APP_NAME}-post"
  environment_variables = {
    DYDB_TABLE_NAME = aws_dynamodb_table.messages.name,
    REGION          = var.REGION
  }
  is_s3                  = false
  is_dydb                = true
  dydb_table_arn         = aws_dynamodb_table.messages.arn
  dydb_table_permissions = ["dynamodb:BatchWriteItem"]
  function_url_public    = true
}

module "lambda_delete" {
  source              = "git::https://github.com/tldrlw/terraform-modules.git//apig-lambda"
  source_dir          = var.LAMBDA_PATH
  handler_file_prefix = "app-delete"
  REST_method         = "DELETE"
  function_name       = "\${var.APP_NAME}-delete"
  environment_variables = {
    DYDB_TABLE_NAME = aws_dynamodb_table.messages.name,
    REGION          = var.REGION
  }
  is_s3                  = false
  is_dydb                = true
  dydb_table_arn         = aws_dynamodb_table.messages.arn
  dydb_table_permissions = ["dynamodb:DeleteItem"]
  function_url_public    = true
}

module "lambda_put" {
  source              = "git::https://github.com/tldrlw/terraform-modules.git//apig-lambda"
  source_dir          = var.LAMBDA_PATH
  handler_file_prefix = "app-put"
  REST_method         = "PUT"
  function_name       = "\${var.APP_NAME}-put"
  environment_variables = {
    DYDB_TABLE_NAME = aws_dynamodb_table.messages.name,
    REGION          = var.REGION
  }
  is_s3                  = false
  is_dydb                = true
  dydb_table_arn         = aws_dynamodb_table.messages.arn
  dydb_table_permissions = [""]
  function_url_public    = true
}
`;

const outputsTf = `
output "lambda_get_function_url" {
  value = module.lambda_get.function_url
}

output "lambda_get_arn" {
  value = module.lambda_get.arn
}

output "lambda_post_function_url" {
  value = module.lambda_post.function_url
}

output "lambda_post_arn" {
  value = module.lambda_post.arn
}

output "lambda_delete_function_url" {
  value = module.lambda_delete.function_url
}

output "lambda_delete_arn" {
  value = module.lambda_delete.arn
}
`;

export default function Blog2() {
  return (
    <main>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>
        AWS Next.js CRUD app
      </h1>
      <p className='mb-2 text-sm font-light md:mb-4 md:text-base'>
        Wednesday, September 18, 2024
      </p>

      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          In today&apos;s digital landscape, creating custom software to manage
          user data is crucial for organizations looking to gain insights and
          improve their operations. Many large-scale SaaS solutions collect,
          analyze, and leverage user information, but understanding how to build
          these capabilities from the ground up is essential for anyone looking
          to develop tailored applications. In this post, we&apos;ll walk
          through the steps to create a simple CRUD (Create, Read, Update,
          Delete) app using Next.js on AWS. This hands-on guide will help you
          establish a practical foundation for building custom software that
          empowers organizations to collect, manage, and utilize user data
          effectively. Whether you&apos;re new to development or seeking to
          enhance your skills, this project will give you the tools to get
          started on building data-driven applications.
        </p>
        <p className='mb-2 md:mb-4'>
          In this project, we&apos;ll be building and deploying a Next.js app
          running in ECS (Elastic Container Service) that will serve as the
          front-end, and AWS services like DynamoDB and Lambda which will serve
          as the back-end. We will store the data in DynamoDB (a NoSQL database)
          and use Lambda functions to perform our CRUD operations against the
          database. To get started, you will need to configure your local
          machine to run Terraform against an AWS account, set up your Terraform
          remote backend state resources, configure the Terraform{' '}
          <code>provider.tf</code>{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://github.com/tldrlw/aws-nextjs-crud-app/blob/dev/infrastructure/provider.tf'
          >
            file
          </a>
          , etc., there is a brief guide on how to do this with external links
          at the start of my{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://blog.tldrlw.com/blogs/1'
          >
            first blog post
          </a>
          . Additionally, code we'll be going over is available{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://github.com/tldrlw/aws-nextjs-crud-app/tree/main'
          >
            here
          </a>{' '}
          on Github.
        </p>
        <p>
          So let's get started, we will begin by provisioning our back-end with
          Lambda functions and a DynamoDB table, with the Lambda functions being
          created using my Lambda Terraform module which can be found{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://github.com/tldrlw/terraform-modules/tree/main/apig-lambda'
          >
            here
          </a>
          , also on Github.
        </p>
      </section>

      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          However, before getting started, let's take some time to understand
          Lambda functions, what are they and how can they help us create our
          backend?
        </p>
        <div className='my-4'>{lambdaExplanation()}</div>
        <p className='mb-2 md:mb-4'>
          Now that we understand what Lambda is, let&apos;s dive in. We will be
          creating four separate Lambda functions, each for the operations we'll
          be executing from our front-end app. Our operations will follow the
          RESTful API methodology, and if you&apos;re unfamiliar with RESTful, a
          definition is provided below:
        </p>
        <ul className='mb-2 list-inside text-gray-700 md:mb-4 md:list-disc'>
          <li>
            GET - <span className='italic'>fetch</span> data from DynamoDB -{' '}
            <a
              className='text-blue-500 hover:underline'
              href='https://github.com/tldrlw/aws-nextjs-crud-app/blob/dev/infrastructure/lambda/app-get.mjs'
            >
              source code
            </a>
          </li>
          <li>
            POST - <span className='italic'>write new</span> new items to
            DynamoDB -{' '}
            <a
              className='text-blue-500 hover:underline'
              href='https://github.com/tldrlw/aws-nextjs-crud-app/blob/dev/infrastructure/lambda/app-post.mjs'
            >
              source code
            </a>
          </li>
          <li>
            PUT - <span className='italic'>update existing</span> existing items
            in DynamoDB -{' '}
            <a
              className='text-blue-500 hover:underline'
              href='https://github.com/tldrlw/aws-nextjs-crud-app/blob/dev/infrastructure/lambda/app-put.mjs'
            >
              source code
            </a>
          </li>
          <li>
            DELETE - <span className='italic'>delete existing</span> existing
            items from DynamoDB -{' '}
            <a
              className='text-blue-500 hover:underline'
              href='https://github.com/tldrlw/aws-nextjs-crud-app/blob/dev/infrastructure/lambda/app-delete.mjs'
            >
              source code
            </a>
          </li>
        </ul>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important font-bold text-customOrangeLogo'>
            Definition:{' '}
          </span>
          A RESTful API is a web service that allows different applications to
          communicate over HTTP by following a set of architectural principles.
          It treats everything as a resource, which is accessible via a unique
          URL, and uses standard HTTP methods like GET, POST, PUT, and DELETE to
          perform actions on these resources. RESTful APIs are stateless,
          meaning each request must contain all the necessary information,
          making them highly scalable and flexible. They are widely used due to
          their simplicity, scalability, and interoperability with different
          platforms and languages.
        </p>
        <p className='mb-2 md:mb-4'>
          Take some time to look through the four Lambda functions&apos; Node.js
          code, you&apos;ll see that I&apos;m just calling DynamoDB functions
          from the AWS SDK (Software Development Kit) for Node.js, these
          functions imported will vary based on the RESTful methods associated
          with each function. The two functions running <code>PUT</code> and{' '}
          <code>DELETE</code> operations will expect data in the request&apos;s
          body, data such as the unique identifier for the item we will try to
          update or delete.
        </p>
        <p className='mb-2 md:mb-4'>
          Before writing Terraform code for our Lambda functions, we need to
          prepare our configuration for the DynamoDB table the functions will
          execute operations against. Let&apos;s also understand what DynamoDB
          is it&apos;s features.
        </p>
        <div className='my-4'>{dynamoDBExplanation()}</div>
        <CodeBlock
          filePath={'dydb.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={dydbTf}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          To maintain consistency across our Terraform configuration, we&apos;ll
          also define some variables we can use in our files.{' '}
          <code>APP_NAME</code> will be used to name our Lambda functions,
          DynamoDB table, ECS service, etc.
        </p>
        <CodeBlock
          filePath={'variables.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={variablesTf}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          Now we can start to build out our Lambda functions, as mentioned
          before, we will be using the Lambda module I personally manage, I use
          this module to statisfy a myriad of different needs, e.g., setting up
          Lambda to work as API Gateway integrations with Cognito
          authentication. Having said that, for{' '}
          <span className='italic'>this</span> project we won't be using API
          Gateway or any sort of authentication. These Lambda functions will be
          exposed publically, hence <code>function_url_public = true</code> in
          the module instantiation, therefore, it might be a good idea to
          destroy your resources after you've tried things out.
        </p>
        <CodeBlock
          filePath={'lambda.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={lambdaTf}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          After provisioning our Terraform configuration thus far, we can test
          out these Lambda functions using their published function URLs, so
          let&apos;s set up an outputs.tf file that will log the URLs after the
          Lambda functions are created in our Terraform apply logs.
        </p>
        <CodeBlock
          filePath={'outputs.tf'}
          filePathStyle={'text-customRed'}
          fileExtension={'hcl'}
          codeBlock={outputsTf}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          At this point, you can run the following Terraform commands from your
          local to provision all our resources thus far to AWS. Despite still
          having the front-end infrastructure to set up, we can deploy the
          Lambda functions and test out their functionality using Postman, check
          out this{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://learning.postman.com/docs/getting-started/installation/installation-and-updates/'
          >
            guide
          </a>{' '}
          on installing Postman.
        </p>
        <ul className='mb-2 list-inside text-gray-700 md:mb-4 md:list-disc'>
          <li>
            <code>terraform init</code>
          </li>
          <li>
            <code>terraform plan</code>
          </li>
          <li>
            <code>terraform apply --auto-approve</code>
          </li>
        </ul>
      </section>

      <section className='mb-6 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 italic md:mb-4'>To be continued...</p>
      </section>
    </main>
  );
}
