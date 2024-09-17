import Overview from '@/components/overview';

export const vpcExplanation = () => {
  const heading = 'VPC Configuration Overview';
  const description =
    'This Terraform configuration above creates a highly available infrastructure on AWS. Below is a breakdown of each resource and how they interact to form a scalable and resilient network environment.';
  const components = [
    {
      component: 'VPC',
      textBlocks: [
        'The VPC in this configuration defines an isolated network environment on AWS. It is created with a large CIDR block of <code>10.0.0.0/16</code>, allowing for multiple subnets to exist within it. DNS support and hostnames are enabled to ensure seamless communication between resources inside the VPC. A VPC provides full control over your networking, including subnets, routing, and traffic management, making it essential when deploying apps on Amazon ECS.',
        'In this case, the VPC allows containers running in ECS to securely communicate within the network, while load balancers distribute traffic efficiently across multiple subnets, enhancing both reliability and performance. By configuring public and private subnets, the VPC ensures that your application has secure internet access when needed while maintaining high availability across AWS region AZs (Availability Zone). This integration of VPC with ECS enables scalable, secure, and resilient containerized apps.',
      ],
    },
    {
      component: 'Subnets',
      textBlocks: [
        'A subnet within a VPC is a range of IP addresses that divides the VPC into smaller, isolated networks. It allows resources, such as EC2 instances (which power ECS under thehood), to be placed in different parts of the VPC with distinct network configurations. Subnets can be either public (accessible from the internet) or private (isolated from the internet), depending on whether they are associated with an Internet Gateway.',
        'Three public subnets are defined, distributed across three different availability zones for high availability. The CIDR blocks for these subnets follow a pattern like <code>10.0.x.0/24</code> where <code>x</code> is based on the availability zone index, ensuring each subnet has a unique range of IP addresses. These subnets automatically assign public IP addresses to instances launched within them, making them accessible from the internet.',
      ],
    },
    {
      component: 'Internet Gateway',
      textBlocks: [
        'An Internet Gateway is created to allow communication between the VPC and the internet. This resource enables instances within the public subnets to send and receive traffic from the internet, providing external access to services and resources.',
      ],
    },
    {
      component: 'Route Table',
      textBlocks: [
        'A route table is set up for directing traffic. The table includes a route that sends all outgoing traffic (destination <code>0.0.0.0/0</code>) to the internet gateway. This ensures that instances in the public subnets can access the internet.',
      ],
    },
    {
      component: 'Route Table Associations',
      textBlocks: [
        'The route table is associated with each of the three subnets, ensuring that all subnets direct their traffic through the internet gateway. This setup is essential for maintaining internet connectivity in each availability zone.',
      ],
    },
  ];
  const closing =
    'By distributing the subnets across different availability zones, this architecture ensures <strong>high availability</strong>. If one availability zone goes down, the other subnets in different zones remain operational, making this setup resilient to failure and providing continuous service.';

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

export const acmAndRoute53Explanation = () => {
  const heading = 'ACM & Route 53 Configuration Overview';
  const description =
    'This Terraform configuration above sets up an SSL certificate for a domain using ACM and integrates it with Route 53 for DNS validation. Below is a detailed breakdown of how each resource works together to ensure secure communication for your app.';
  const components = [
    {
      component: 'What is AWS Route 53?',
      textBlocks: [
        "AWS's scalable and highly available Domain Name System (DNS) web service. It is used to route users to your app by translating human-readable domain names (like <code>example.com</code>) into machine-readable IP addresses. Route 53 can also register domain names, manage DNS records, and monitor health checks, ensuring traffic is directed to healthy endpoints.",
      ],
    },
    {
      component: 'What is ACM (AWS Certificate Manager)?',
      textBlocks: [
        'Service that lets you easily provision, manage, and deploy SSL/TLS (Transport Layer Security) certificates. These certificates are used to secure network communications and establish the identity of websites over the internet. ACM handles the complexities of certificate management, including renewal, allowing you to focus on running your app while ensuring they are secured with industry-standard encryption.',
      ],
    },
    {
      component: 'ACM Certificate',
      textBlocks: [
        'ACM is used to request an SSL certificate for the domain. In this configuration, a certificate is requested for the domain defined by the <code>var.HOSTNAME</code>. The validation method is set to "DNS", which means the domain&apos;s ownership will be verified via DNS records. The <code>RSA_2048</code> algorithm is used for the certificate&apos;s key, providing strong encryption.',
        "ACM automatically manages certificate renewals, ensuring continuous security for your domain. By using DNS validation, there's no need to manually approve the certificate; the validation process is handled seamlessly through your Route 53 records.",
      ],
    },
    {
      component: 'Route 53 DNS Validation Record',
      textBlocks: [
        'This resource sets up DNS validation for the SSL certificate. For each domain validation option that ACM provides, a Route 53 record is created. The Terraform <code>for_each</code> loop dynamically generates these records based on ACM&apos;s domain validation options, including the name, type, and value of the DNS record required to prove ownership of the domain.',
        'These records are critical for enabling ACM to verify ownership of your domain without manual intervention. By automatically creating these records, you reduce the risk of delays or errors during the validation process. The short TTL ensures that any updates to these records propagate quickly.',
      ],
    },
    {
      component: 'ACM Certificate Validation',
      textBlocks: [
        'After setting up the DNS records, this resource completes the validation process by referencing the certificate&apos;s ARN and the fully qualified domain names (FQDNs) of the Route 53 records. This step ensures that the SSL certificate becomes active once AWS verifies the domain ownership through the DNS validation records.',
        'Once validated, the certificate can be used to secure traffic to your domain using HTTPS. This automation reduces the need for manual steps and ensures that the certificate becomes active as soon as validation is complete.',
      ],
    },
    {
      component: 'Route 53 A Record for Domain',
      textBlocks: [
        'The final Route 53 record points the domain name (e.g., <code>blog.tldrlw.com</code>) to the ALB. The <code>alias</code> block within the record defines an alias that links the domain to the ALB&apos;s DNS name and zone ID. The <code>evaluate_target_health</code> parameter ensures that the DNS will only resolve if the ALB is healthy, increasing reliability for end-users.',
        'By using an alias record, AWS can dynamically manage the underlying IP addresses of the ALB, ensuring that the domain always points to the correct location without needing manual updates. This also allows for automatic scaling and resilience without impacting DNS resolution.',
      ],
    },
  ];

  const closing =
    'This setup seamlessly integrates ACM and Route 53 to manage SSL certificates and DNS records, ensuring your domain is validated and secured for HTTPS traffic. Automating the entire process reduces errors and ensures continuous availability and security.';

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

export const albAndEcsExplanation = () => {
  const heading = 'ALB & ECS Service Configuration Overview';
  const description =
    'This Terraform configuration sets up an ALB and ECS Service to host and scale the containerized app. Below is a detailed breakdown of how each resource works together to ensure efficient traffic distribution and container management for your Next.js app.';

  const components = [
    {
      component: 'What is an ALB?',
      textBlocks: [
        'An ALB is a key component in AWS that distributes incoming traffic across multiple targets, such as EC2 instances or containers, in different availability zones. It operates at the application layer (Layer 7 of the OSI model) and supports advanced routing features, making it ideal for microservices architectures and container-based deployments. ALBs can automatically distribute traffic to healthy targets, ensuring high availability and better performance for your application.',
      ],
    },
    {
      component: 'What is ECS?',
      textBlocks: [
        'ECS is a fully managed container orchestration service that allows you to run and scale containerized apps easily. With ECS, you can deploy containers on a cluster of EC2 instances or use AWS Fargate (what we&apos;re using) to run containers without managing underlying infrastructure. ECS integrates seamlessly with other AWS services like ALB and ECR, enabling efficient scaling, secure networking, and management of container-based workloads.',
      ],
    },
    {
      component: 'ALB Setup',
      textBlocks: [
        'In this configuration, the ALB is provisioned using a Terraform module that handles its setup. The ALB is created within the VPC specified by <code>vpc_id</code>, and it is associated with the public subnets (<code>subnet_ids</code>) to make the application accessible from the internet. The ALB listens for traffic on a specific port, and the SSL certificate (managed by ACM) ensures that traffic is encrypted via HTTPS.',
        'Additionally, a target group is created that registers ECS tasks running in the cluster as targets. This target group allows the ALB to distribute incoming requests across the tasks, ensuring load balancing and high availability.',
      ],
    },
    {
      component: 'ECS Cluster Setup',
      textBlocks: [
        'An ECS cluster is the fundamental resource where your containers run. In this configuration, the cluster named <code>"main"</code> is created, and all services and tasks will be deployed into it. Here, the ECS service interacts with the ALB through the target group, enabling efficient distribution of network traffic to the containerized app.',
      ],
    },
    {
      component: 'ECS Service',
      textBlocks: [
        'The ECS service is responsible for managing the deployment and scaling of your containers in the ECS cluster. In this configuration, the service pulls container images from the ECR repository, identified by the <code>ecr_repo_url</code>, and deploys them using the image tag specified in <code>var.IMAGE_TAG</code>.',
        'The service launches containers that listen on port <code>3000</code>, and traffic is routed to these containers via the ALB. By specifying security group rules and subnet configurations, the service ensures that the containers are securely accessible, while remaining scalable to meet demand. This ECS service <span className="italic">can</span> dynamically adjust the number of running tasks based on the desired task count and traffic load. For our purposes, we have a static value of "1" for <code>task_count</code>, but feel free to change this if youd like, and monitor task deployments across AZs to guarantee high availability.',
      ],
    },
  ];

  const closing =
    'By integrating the ALB with the ECS service, this setup ensures that your containerized app is securely deployed, automatically load balanced, and scalable, while using Terraform to automate the entire provisioning process.';

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
