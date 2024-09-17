import Overview from '@/components/overview';

export const lambdaExplanation = () => {
  const heading = 'Lambda Functions Overview';
  const description =
    'AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. Below is a breakdown of how Lambda functions work and the options available for securing their endpoints through Lambda Function URLs.';
  const components = [
    {
      component: 'What is a Lambda Function?',
      textBlocks: [
        'AWS Lambda is a serverless compute service that automatically runs your code in response to various events, such as HTTP requests, file uploads to S3, changes in DynamoDB tables, and many more. Serverless computing means that you don&apos;t have to worry about provisioning or managing servers. Instead, the infrastructure is entirely managed by AWS, allowing you to focus solely on writing your code.',
        'One of the key benefits of AWS Lambda and serverless computing, in general, is its cost-effectiveness. With traditional server setups, you would need to provision and pay for servers to run your applications, often resulting in unused capacity during off-peak times. In contrast, AWS Lambda only charges you for the compute time that your code actually consumes. You are billed based on the number of requests and the duration it takes for your function to run, measured in milliseconds. This "pay-per-execution" model ensures that you are only charged when your code is actively running, making it an efficient and cost-effective solution, especially for applications with variable workloads.',
        'This model makes Lambda ideal for workloads that don&apos;t require constant server uptime. For example, functions that are triggered by events like user uploads or occasional API calls can run without the overhead of managing idle resources. Even for high-scale applications, AWS Lambda automatically scales based on the incoming requests, ensuring that you don&apos;t have to pay for over-provisioned infrastructure during quieter periods, making it a highly scalable and budget-friendly choice.',
      ],
    },
    {
      component: 'Lambda Function URLs',
      textBlocks: [
        'Lambda Function URLs provide a simple way to expose your Lambda functions as HTTP endpoints. This allows you to create RESTful (Representational State Transfer) APIs (Application Programming) directly from Lambda without needing an API Gateway. When you create a function URL for your Lambda function, AWS automatically provides a URL that can be used to invoke your function from any HTTP client.',
        'The Lambda Function URL supports two authentication options, depending on your security needs: <code>NONE</code> and <code>AWS_IAM</code>.',
      ],
    },
    {
      component: 'Authentication Options: NONE vs AWS_IAM',
      textBlocks: [
        'When configuring a Lambda Function URL, you can choose between two authentication methods:',
        '<strong>NONE</strong>: This option makes the function URL publicly accessible. Anyone with the function URL can invoke the Lambda function without any authentication or authorization, which is useful for testing or for public endpoints where security is not a concern.',
        '<strong>AWS_IAM</strong>: This option secures the function URL using AWS IAM (Identity and Access Management). Only users or services with the necessary IAM permissions can invoke the Lambda function. This is useful for internal APIs or endpoints that require secure access. By using AWS_IAM, you can control who has access to the function URL based on their IAM roles and policies, ensuring secure communication with the Lambda function.',
      ],
    },
    {
      component: 'Event-Driven Architecture',
      textBlocks: [
        'Lambda functions are often part of an event-driven architecture. They are triggered by various AWS services, like API Gateway, S3, DynamoDB, and EventBridge. When an event occurs, the Lambda function is invoked automatically, scaling up as necessary to handle the event load. This makes it an excellent choice for scenarios like real-time data processing, responding to HTTP requests, or performing automated tasks based on cloud events.',
        'By using event triggers, Lambda enables seamless integration with the rest of your AWS infrastructure without worrying about managing underlying resources.',
      ],
    },
  ];
  const closing =
    'AWS Lambda is a powerful serverless computing option that provides scalability, cost-efficiency, and integration with other AWS services. Lambda Function URLs further simplify the process of exposing Lambda functions as HTTP endpoints, while giving you the flexibility to secure them with authentication options suited to your needs. Whether you need public access (NONE) or secure, controlled access (AWS_IAM), Lambda can handle a variety of use cases with minimal infrastructure management.';

  return (
    <section>
      <Overview
        heading={heading}
        description={description}
        components={components}
        closing={closing}
      ></Overview>
    </section>
  );
};

export const dynamoDBExplanation = () => {
  const heading = 'DynamoDB Overview';
  const description =
    'Amazon DynamoDB is a fully managed NoSQL database service designed to deliver fast and predictable performance with seamless scalability. Below is a breakdown of how DynamoDB works and key features like Primary Keys, Sort Keys, and more.';
  const components = [
    {
      component: 'What is DynamoDB?',
      textBlocks: [
        'Amazon DynamoDB is a fully managed NoSQL database service that provides fast and flexible database performance for applications that require low-latency, high throughput access to data. DynamoDB is designed for use cases such as real-time analytics, mobile applications, gaming, IoT, and e-commerce.',
        'As a fully managed service, DynamoDB automatically scales the storage and throughput capacity to meet the demands of your application. This makes it ideal for workloads that experience unpredictable traffic patterns, as it ensures high availability and low operational overhead.',
      ],
    },
    {
      component: 'Data Structure: Tables, Items, and Attributes',
      textBlocks: [
        'In DynamoDB, data is organized in tables. A table is a collection of items, where each item is a group of attributes. This is similar to rows and columns in a relational database. However, in DynamoDB, different items in a table can have different sets of attributes, offering flexibility in how data is structured.',
        'Items in a DynamoDB table are uniquely identified by a primary key. You can optionally use a sort key to organize your data further, allowing multiple items to share the same primary key but be differentiated by the sort key.',
      ],
    },
    {
      component: 'Primary Keys and Sort Keys',
      textBlocks: [
        'DynamoDB uses **Primary Keys** to uniquely identify items within a table. A primary key can be either a simple primary key (Partition Key) or a composite primary key (Partition Key and Sort Key):',
        '<strong>Partition Key</strong>: The partition key is a single attribute that uniquely identifies an item in a table. DynamoDB uses the partition key’s value to determine how data is distributed across partitions in storage.',
        '<strong>Composite Key (Partition Key and Sort Key)</strong>: In tables with a composite primary key, each item is uniquely identified by the combination of both a partition key and a sort key. The partition key is used to group related items, and the sort key is used to order those items within the partition. This is useful for queries that need to retrieve items based on the same partition key but sort them by another attribute.',
      ],
    },
    {
      component: 'Scalability and Performance',
      textBlocks: [
        'DynamoDB is built to scale horizontally by distributing data across multiple partitions based on the partition key. This allows the database to handle large volumes of read and write operations seamlessly, making it an ideal solution for applications with high throughput requirements.',
        'The performance of DynamoDB can be adjusted based on the required read and write capacity through either on-demand or provisioned modes. The on-demand mode automatically scales to meet your traffic needs, while provisioned mode allows you to reserve specific read/write capacity for predictable workloads.',
      ],
    },
    {
      component: 'Event-Driven Architecture with DynamoDB Streams',
      textBlocks: [
        'DynamoDB Streams provide a powerful way to enable event-driven architectures. Streams capture a time-ordered sequence of item-level changes in your DynamoDB table, such as inserts, updates, and deletes. These events can then trigger other services, such as AWS Lambda, to perform additional actions or real-time processing when data changes in your DynamoDB tables.',
        'DynamoDB Streams make it easy to replicate data, update search indexes, or even trigger business workflows based on data changes, making it a powerful addition to your serverless architecture.',
      ],
    },
  ];
  const closing =
    'DynamoDB is a highly scalable and fully managed NoSQL database that provides reliable performance for applications of any size. Its flexibility with primary and sort keys allows for efficient data retrieval and organization, while features like DynamoDB Streams enable real-time, event-driven architectures. Whether you are building a mobile app, an IoT platform, or a serverless solution, DynamoDB offers the scalability and performance needed to handle your application’s data demands.';

  return (
    <section>
      <Overview
        heading={heading}
        description={description}
        components={components}
        closing={closing}
      ></Overview>
    </section>
  );
};
