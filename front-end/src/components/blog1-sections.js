export const vpcExplanation = () => {
  return (
    <div className='container mx-auto my-2 bg-gray-100 p-4 shadow-sm'>
      <h1 className='mb-2 text-customRed'>AWS VPC Configuration Overview</h1>

      <p className='mb-4 text-gray-700'>
        This Terraform configuration above creates a highly available
        infrastructure on AWS. Below is a breakdown of each resource and how
        they interact to form a scalable and resilient network environment.
      </p>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>VPC</h2>
        <p className='text-gray-700'>
          The VPC in this configuration defines an isolated network environment
          on AWS. It is created with a large CIDR block of{' '}
          <code>10.0.0.0/16</code>, allowing for multiple subnets to exist
          within it. DNS support and hostnames are enabled to ensure seamless
          communication between resources inside the VPC. A VPC provides full
          control over your networking, including subnets, routing, and traffic
          management, making it essential when deploying applications on Amazon
          ECS.
        </p>
        <p className='mt-2 text-gray-700'>
          In this case, the VPC allows containers running in ECS to securely
          communicate within the network, while load balancers distribute
          traffic efficiently across multiple subnets, enhancing both
          reliability and performance. By configuring public and private
          subnets, the VPC ensures that your application has secure internet
          access when needed while maintaining high availability across AWS
          availability zones. This integration of VPC with ECS enables scalable,
          secure, and resilient containerized applications.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>Subnets</h2>
        <p className='text-gray-700'>
          A subnet within a VPC is a range of IP addresses that divides the VPC
          into smaller, isolated networks. It allows resources, such as EC2
          instances (which power ECS under thehood), to be placed in different
          parts of the VPC with distinct network configurations. Subnets can be
          either public (accessible from the internet) or private (isolated from
          the internet), depending on whether they are associated with an
          Internet Gateway.
        </p>
        <p className='mt-2 text-gray-700'>
          Three public subnets are defined, distributed across three different
          availability zones for high availability. The CIDR blocks for these
          subnets follow a pattern like <code>10.0.x.0/24</code> where{' '}
          <code>x</code> is based on the availability zone index, ensuring each
          subnet has a unique range of IP addresses. These subnets automatically
          assign public IP addresses to instances launched within them, making
          them accessible from the internet.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>Internet Gateway</h2>
        <p className='text-gray-700'>
          An Internet Gateway is created to allow communication between the VPC
          and the internet. This resource enables instances within the public
          subnets to send and receive traffic from the internet, providing
          external access to services and resources.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>Route Table</h2>
        <p className='text-gray-700'>
          A route table is set up for directing traffic. The table includes a
          route that sends all outgoing traffic (destination{' '}
          <code>0.0.0.0/0</code>) to the internet gateway. This ensures that
          instances in the public subnets can access the internet.
        </p>
      </div>

      <div className='border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>
          Route Table Associations
        </h2>
        <p className='text-gray-700'>
          The route table is associated with each of the three subnets, ensuring
          that all subnets direct their traffic through the internet gateway.
          This setup is essential for maintaining internet connectivity in each
          availability zone.
        </p>
      </div>

      <p className='mt-4 text-gray-700'>
        By distributing the subnets across different availability zones, this
        architecture ensures <strong>high availability</strong>. If one
        availability zone goes down, the other subnets in different zones remain
        operational, making this setup resilient to failure and providing
        continuous service.
      </p>
    </div>
  );
};

export const acmAndRoute53Explanation = () => {
  return (
    <div className='container mx-auto my-2 bg-gray-100 p-4 shadow-sm'>
      <h1 className='mb-2 text-customRed'>
        AWS ACM & Route 53 Configuration Overview
      </h1>

      <p className='mb-4 text-gray-700'>
        This Terraform above configuration sets up an SSL certificate for a
        domain using ACM and integrates it with Route 53 for DNS validation.
        Below is a detailed breakdown of how each resource works together to
        ensure secure communication for your web applications.
      </p>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>
          What is AWS Route 53?
        </h2>
        <p className='text-gray-700'>
          AWS's scalable and highly available Domain Name System (DNS) web
          service. It is used to route users to your applications by translating
          human-readable domain names (like <code>example.com</code>) into
          machine-readable IP addresses. Route 53 can also register domain
          names, manage DNS records, and monitor health checks, ensuring traffic
          is directed to healthy endpoints.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>
          What is AWS ACM (AWS Certificate Manager)?
        </h2>
        <p className='text-gray-700'>
          Service that lets you easily provision, manage, and deploy SSL/TLS
          certificates. These certificates are used to secure network
          communications and establish the identity of websites over the
          internet. ACM handles the complexities of certificate management,
          including renewal, allowing you to focus on running your applications
          while ensuring they are secured with industry-standard encryption.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>ACM Certificate</h2>
        <p className='text-gray-700'>
          The AWS ACM (Certificate Manager) resource is used to request an SSL
          certificate for the domain. In this configuration, a certificate is
          requested for the domain defined by the <code>var.HOSTNAME</code>. The
          validation method is set to "DNS", which means the domain's ownership
          will be verified via DNS records. The <code>RSA_2048</code> algorithm
          is used for the certificate's key, providing strong encryption.
        </p>
        <p className='mt-2 text-gray-700'>
          ACM automatically manages certificate renewals, ensuring continuous
          security for your domain. By using DNS validation, there&apos;s no
          need to manually approve the certificate; the validation process is
          handled seamlessly through your Route 53 records.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>
          Route 53 DNS Validation Record
        </h2>
        <p className='text-gray-700'>
          This resource sets up DNS validation for the SSL certificate. For each
          domain validation option that ACM provides, a Route 53 record is
          created. The <code>for_each</code> loop dynamically generates these
          records based on ACM's domain validation options, including the name,
          type, and value of the DNS record required to prove ownership of the
          domain.
        </p>
        <p className='mt-2 text-gray-700'>
          These records are critical for enabling ACM to verify ownership of
          your domain without manual intervention. By automatically creating
          these records, you reduce the risk of delays or errors during the
          validation process. The short TTL ensures that any updates to these
          records propagate quickly.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>
          ACM Certificate Validation
        </h2>
        <p className='text-gray-700'>
          After setting up the DNS records, this resource completes the
          validation process by referencing the certificate's ARN and the fully
          qualified domain names (FQDNs) of the Route 53 records. This step
          ensures that the SSL certificate becomes active once AWS verifies the
          domain ownership through the DNS validation records.
        </p>
        <p className='mt-2 text-gray-700'>
          Once validated, the certificate can be used to secure traffic to your
          domain using HTTPS. This automation reduces the need for manual steps
          and ensures that the certificate becomes active as soon as validation
          is complete.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>
          Route 53 A Record for Domain
        </h2>
        <p className='text-gray-700'>
          The final Route 53 record points the domain name (e.g.,{' '}
          <code>blog.tldrlw.com</code>) to the application load balancer (ALB).
          The <code>alias</code> block within the record defines an alias that
          links the domain to the ALB's DNS name and zone ID. The{' '}
          <code>evaluate_target_health</code> parameter ensures that the DNS
          will only resolve if the ALB is healthy, increasing reliability for
          end-users.
        </p>
        <p className='mt-2 text-gray-700'>
          By using an alias record, AWS can dynamically manage the underlying IP
          addresses of the ALB, ensuring that the domain always points to the
          correct location without needing manual updates. This also allows for
          automatic scaling and resilience without impacting DNS resolution.
        </p>
      </div>

      <p className='mt-4 text-gray-700'>
        This setup seamlessly integrates ACM and Route 53 to manage SSL
        certificates and DNS records, ensuring your domain is validated and
        secured for HTTPS traffic. Automating the entire process reduces errors
        and ensures continuous availability and security.
      </p>
    </div>
  );
};

export const albAndEcsExplanation = () => {
  return (
    <div className='container mx-auto my-2 bg-gray-100 p-4 shadow-sm'>
      <h1 className='mb-2 text-customRed'>
        AWS ALB & ECS Service Configuration Overview
      </h1>

      <p className='mb-4 text-gray-700'>
        This Terraform configuration sets up an ALB and ECS Service to host and
        scale containerized applications. Below is a detailed breakdown of how
        each resource works together to ensure efficient traffic distribution
        and container management for your web applications.
      </p>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>What is an ALB?</h2>
        <p className='text-gray-700'>
          An ALB is a key component in AWS that distributes incoming traffic
          across multiple targets, such as EC2 instances or containers, in
          different availability zones. It operates at the application layer
          (Layer 7 of the OSI model) and supports advanced routing features,
          making it ideal for microservices architectures and container-based
          deployments. ALBs can automatically distribute traffic to healthy
          targets, ensuring high availability and better performance for your
          application.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>
          What is Amazon ECS?
        </h2>
        <p className='text-gray-700'>
          ECS is a fully managed container orchestration service that allows you
          to run and scale containerized applications easily. With ECS, you can
          deploy containers on a cluster of EC2 instances or use AWS Fargate to
          run containers without managing underlying infrastructure. ECS
          integrates seamlessly with other AWS services like ALB and ECR,
          enabling efficient scaling, secure networking, and management of
          container-based workloads.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>
          Application Load Balancer Setup
        </h2>
        <p className='text-gray-700'>
          In this configuration, the ALB is provisioned using a Terraform module
          that handles its setup. The ALB is created within the VPC specified by{' '}
          <code>vpc_id</code>, and it is associated with the public subnets (
          <code>subnet_ids</code>) to make the application accessible from the
          internet. The ALB listens for traffic on a specific port, and the SSL
          certificate (managed by ACM) ensures that traffic is encrypted via
          HTTPS.
        </p>
        <p className='mt-2 text-gray-700'>
          Additionally, a target group is created that registers ECS tasks
          running in the cluster as targets. This target group allows the ALB to
          distribute incoming requests across the tasks, ensuring load balancing
          and high availability.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>ECS Cluster Setup</h2>
        <p className='text-gray-700'>
          An ECS cluster is the fundamental resource where your containers run.
          In this configuration, the cluster named <code>"main"</code> is
          created, and all services and tasks will be deployed into it. ECS
          clusters can run on EC2 instances or using AWS Fargate. Here, the ECS
          service interacts with the ALB through the target group, enabling
          efficient distribution of network traffic to the containerized
          applications.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>ECS Service</h2>
        <p className='text-gray-700'>
          The ECS service is responsible for managing the deployment and scaling
          of your containers in the ECS cluster. In this configuration, the
          service pulls container images from an ECR (Elastic Container
          Registry) repository, identified by the <code>ecr_repo_url</code>, and
          deploys them using the image tag specified in{' '}
          <code>var.IMAGE_TAG</code>.
        </p>
        <p className='mt-2 text-gray-700'>
          The service launches containers that listen on port <code>3000</code>,
          and traffic is routed to these containers via the ALB. By specifying
          security group rules and subnet configurations, the service ensures
          that the containers are securely accessible, while remaining scalable
          to meet demand. This ECS service dynamically adjusts the number of
          running tasks based on the desired task count and traffic load.
        </p>
      </div>

      <p className='mt-4 text-gray-700'>
        By integrating the ALB with the ECS service, this setup ensures that
        your containerized applications are securely deployed, automatically
        load balanced, and scalable, while using Terraform to automate the
        entire provisioning process.
      </p>
    </div>
  );
};
