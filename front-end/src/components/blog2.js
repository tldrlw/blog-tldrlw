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
          In this project, we'll be building and deploying a Next.js app that
          will serve as the front-end, and AWS resources like ECS, DynamoDB and
          Lambda which will serve as the back-end. We will store the data in
          DynamoDB (a NoSQL database) and use Lambda functions to perform our
          CRUD operations against the database. To get started, you will need to
          configure your local machine to run Terraform against an AWS account,
          there is a brief guide on how to do this with external links at the
          start of my{' '}
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
        <p className='mb-2 md:mb-4'></p>
      </section>

      <section className='mb-6 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 italic md:mb-4'>To be continued...</p>
      </section>
    </main>
  );
}
