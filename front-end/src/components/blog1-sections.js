export const vpcExplanation = () => {
  return (
    <div className='container mx-auto my-2 bg-gray-100 p-4 shadow-sm'>
      <h1 className='mb-2 text-customRed'>AWS VPC Configuration Overview</h1>

      <p className='mb-4 text-gray-700'>
        This Terraform configuration creates a highly available infrastructure
        on AWS. Below is a breakdown of each resource and how they interact to
        form a scalable and resilient network environment.
      </p>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>VPC</h2>
        <p className='text-gray-700'>
          The VPC (Virtual Private Cloud) defines an isolated network
          environment on AWS. In this configuration, a VPC is created with a
          large CIDR block of <code>10.0.0.0/16</code>, allowing for multiple
          subnets to exist within it. DNS support and hostnames are enabled for
          seamless communication between resources inside the VPC.
        </p>
      </div>

      <div className='mb-4 border-l-4 border-customRed bg-white p-4 shadow-sm'>
        <h2 className='mb-1 font-semibold text-customRed'>Subnets</h2>
        <p className='text-gray-700'>
          A subnet within a Virtual Private Cloud (VPC) is a range of IP
          addresses that divides the VPC into smaller, isolated networks. It
          allows resources, such as EC2 instances, to be placed in different
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
