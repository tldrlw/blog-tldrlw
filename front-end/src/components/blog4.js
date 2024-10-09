import CodeBlock from '@/components/codeBlock';
import Image from 'next/image';
import { resizeImage } from '@/app/lib/utilities';
import {
  k8sObjectsExplanation,
  k8sControlPlaneExplanation,
  k8sNodeComponentsExplanation,
} from '@/app/lib/overviews/blog4';

const title = 'Intro to K8s (K8s) and AWS EKS';
const date = 'Wednesday, October 9, 2024';

export default async function Blog4() {
  const dimensions = await resizeImage('components-of-kubernetes.svg', 0.4); // Call the function directly in the server component
  const tetrisDimensions = await resizeImage('tetris-1.png', 0.5); // Call the function directly in the server component
  const eksctlDimensions = await resizeImage('eksctl-build-cluster.png', 0.4); // Call the function directly in the server component
  const diagramDimensions = await resizeImage('eks.webp', 2); // Call the function directly in the server component

  return (
    <main>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>{title}</h1>
      <p className='mb-2 text-sm font-light md:mb-4 md:text-base'>{date}</p>
      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          Having worked with Kubernetes (colloquilly known as "K8s") both
          on-prem and in AWS EKS (Elastic Kubernetes Service),{' '}
          <span className='font-bold'>and</span> passed the{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://www.credly.com/badges/cd704a5f-0aee-473e-8dcd-d9f1262a52d0'
            target='_blank'
          >
            CKA (Certified Kubernetes Administrator)
          </a>{' '}
          and{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://www.credly.com/badges/5364ef8b-e1fb-41a1-92ed-3b8980f998a8'
            target='_blank'
          >
            CKAD (Certified Kubernetes Application Developer)
          </a>{' '}
          exams, it seems only right to do a refresher and explain the main
          concepts around the technology. We&apos;ll begin by trying to
          understand why we use K8s in the first place.
        </p>
        <p className='mb-2 md:mb-4'>
          We use K8s to essentially be able to run containers, and containers
          are imperative when running enterprise-grade, large-scale workloads
          because they allow you to{' '}
          <span className='font-bold'>
            share the underlying infrastructure like a single physical server,
            virtual machine (VM), or cloud instance,{' '}
            <span className='italic'>or a set of these</span>
          </span>
          . Instead of confining a single app or service to a single machine
          (i.e., physical server, virtual machine (VM), or cloud instance), you
          can run <span className='font-bold'>multiple</span> apps and services
          on a single machine with containers, in effect, ensuring that you are
          maximizing the compute and memory capacity of that single machine. If
          you were running a single app or service on a single machine, there
          could be underutilized capacity, which would not be cost-effective.
        </p>
        <p className='mb-2 md:mb-4'>
          Let&apos;s assume that the set of machines your containers are running
          on consists of three, meaning you have three machines/servers/VMs
          allocated to run your set of apps or services as containers. With K8s,
          you can rely on its scheduler to allocate the predetermined number of
          containers to whichever machine in your set has available capacity.
          It's intelligent enough to determine where to run the containers and
          can move them across the allocated machines based on factors such as
          compute and memory utilization, as well as the health of the machine
          itself. For example, let&apos;s say we have machines A, B, and C, with
          a total of six containers running. Three of them are front-end
          containers that handle user traffic, and the other three serve as the
          back-end API layer for the front-end. K8s will continuously shift
          these six containers across the three machines to ensure optimal
          performance and cost-efficiency.
        </p>
        <p className='mb-2 md:mb-4'>
          In my opinion, K8s is analogous to the game of Tetris. In Tetris, you
          have arrangements of blocks that you must try to fit into whatever
          space is available, and that's exactly what K8s does with containers.
          Containers have varying memory and compute requirements, and they need
          to fit into machine slots that can accommodate them. While “Pods” will
          be discussed in a following section, Pods are the smallest unit of
          measurement in K8s. Typically, each Pod runs a single container, but
          it <span className='italic'>can run multiple</span> multiple
          containers. If you&apos;re interested in use cases for a
          multi-container Pod, look up “sidecar.”
        </p>
        <p className='mb-2 md:mb-4'>
          Further building upon this analogy, K8s also has the ability to
          “self-heal.” This means that if, for any reason, a container dies due
          to an application-level error or the machine it runs on encounters
          issues, K8s will automatically spin up a new container on another
          machine, based on the desired count and available compute/memory
          capacity.
        </p>
        <div className='my-3 md:mb-4 md:flex md:flex-col md:items-center'>
          <Image
            src='/images/tetris-1.png' // Replace with your actual image URL
            alt='tetris'
            className='h-auto w-auto'
            width={tetrisDimensions.width}
            height={tetrisDimensions.height}
          />
          <p className='text-xs text-gray-700 md:text-sm'>
            Image credit: https://containers.goffinet.org/k8s/setup-k8s
          </p>
        </div>
        <p className='mb-2 md:mb-4'>
          K8s can also “auto-scale,” but what does this mean? K8s can scale the
          number of containers up or down based on certain metrics and
          parameters you set. For example, if I have a configuration that states
          CPU (compute) utilization must not exceed 50%, and that the number of
          containers can scale up to 8 (with a minimum of 3), K8s will handle
          the scaling for you. If front-end traffic is high during peak
          operating hours and containers are hitting the 50% CPU threshold, K8s
          will increase the number of running containers to 8 to accommodate the
          increased traffic. This alleviates the compute pressure on the
          existing containers by distributing the traffic across 8 containers.
          This mechanism is called “Horizontal Pod Auto-Scaling” and is
          available out of the box. Additionally, there is “Vertical Pod
          Auto-Scaling,” which can increase the compute and memory allocated to
          the Pods themselves, and “Node Autoscaling,” which adds more machines
          to your set of nodes as needed.
        </p>
      </section>

      <section>
        <p className='mb-2 md:mb-4'>
          Now that we understand the basics of K8s, let&apos;s shift our focus
          to Docker and running containers. Without a foundational understanding
          of these two concepts, it would be remiss to dive into the intricacies
          of K8s and its various components.
        </p>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important font-bold text-customOrangeLogo'>
            Definition:{' '}
          </span>
          Docker is a platform that allows developers to package applications
          and their dependencies into lightweight, portable containers that run
          consistently across different environments. A container encapsulates
          everything needed to execute the application, including the code,
          runtime, libraries, and system tools, ensuring it works the same in
          development, testing, and production. Containers are efficient and
          scalable, making them ideal for microservices architectures (an
          architectural style where applications are broken down into small,
          loosely coupled services that can be developed, deployed, and scaled
          independently). K8s extends this by providing a system to
          automatically manage, scale, and orchestrate containers across
          clusters of machines, ensuring high availability and efficient
          resource utilization.
        </p>
        <p className='mb-2 md:mb-4'>
          If you&apos;ve read my prior blogs (like{' '}
          <a
            className='text-blue-500 hover:underline'
            target='_blank'
            href='https://blog.tldrlw.com/blogs/1'
          >
            this one
          </a>
          ), you&apos;ll see that we&apos;ve worked with a Dockerfile (a script
          that outlines the steps to build a Docker image, specifying the base
          image, application code, dependencies, and configurations for running
          the container) to prepare our Docker images which will run as
          containers once deployed to AWS ECS (Elastic Container Service). Now,
          EKS is just an alternative to ECS; they both do
          "container-orchestration", but ECS is native only to AWS, while K8s is
          open-source and can be implemented on-prem or with other cloud
          providers like Microsoft Azure and Google Cloud. AWS&apos; K8s
          implementation is known as EKS, and since I work solely with AWS, we
          will be looking into EKS.
        </p>
        <p className='mb-2 md:mb-4'>
          Ok, so we discussed why K8s is so great at the start, let&apos;s again
          remind ourselves of what it is and what it&apos;s used for.
        </p>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important font-bold text-customOrangeLogo'>
            Definition:{' '}
          </span>
          K8s is an open-source platform designed for automating the deployment,
          scaling, and management of containerized applications across clusters
          of machines. It provides the tools to ensure that containers are
          <span className='font-bold'>
            efficiently distributed, load-balanced, and resilient to failure,
            handling tasks like scaling based on demand, rolling updates, and
            self-healing when containers crash or become unresponsive
          </span>
          . K8s is widely used for managing complex, large-scale containerized
          environments, making it easier to deploy microservices architectures
          while maintaining high availability and performance. It helps solve
          challenges such as handling distributed systems, managing resource
          allocation, and automating the orchestration of containers across
          multiple hosts, reducing the manual effort involved in scaling,
          updating, and maintaining applications in production environments.
        </p>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important font-bold text-customOrangeLogo'>
            Definition:{' '}
          </span>
          A K8s{' '}
          <span className='font-bold'>
            cluster is a set of machines, called nodes, that work together to
            run and manage containerized applications
          </span>
          . These machines can be physical servers, virtual machines (VMs), or
          cloud instances, and they are categorized into two types: control
          plane (master node) and worker nodes. The control plane is responsible
          for managing the cluster&apos;s overall state, making decisions about
          scheduling, scaling, and orchestrating resources, while the worker
          nodes handle the actual running of application workloads. Each worker
          node runs components like the kubelet to manage containers and a
          container runtime to execute them. K8s ensures scalability,
          reliability, and high availability within the cluster by distributing
          tasks, managing resources, and maintaining the desired state of
          applications automatically across the nodes.
        </p>
        <p className='mb-2 md:mb-4'>
          The control plane, worker nodes, and K8s objects together form the
          core of K8s and its ability to orchestrate containerized applications.
          The{' '}
          <span className='font-bold'>
            control plane acts as the decision-maker, managing the overall state
            of the cluster
          </span>{' '}
          by continuously evaluating and enforcing the desired state, which is
          defined through K8s objects like Pods, Services, and Deployments.
          These{' '}
          <span className='font-bold'>
            objects describe what applications and resources should be running
          </span>
          . The control plane assigns workloads (Pods) to the{' '}
          <span className='font-bold'>
            worker nodes, where the actual application containers are executed
          </span>
          . The worker nodes, managed by the kubelet and powered by a container
          runtime like Docker, ensure that the workloads are running as
          expected. The kube-proxy manages communication between these Pods and
          across nodes, while the control plane constantly monitors and adjusts
          workloads to ensure the system remains in the desired state. Together,
          these three components provide the scalability, reliability, and
          automation that K8s is known for.
        </p>
        <h2 className='mb-2 font-bold md:mb-4 md:text-lg'>
          Control Plane Components
        </h2>
        <p className='mb-2 md:mb-4'>
          The control plane in K8s is responsible for managing the overall state
          and operations of the cluster. It ensures that the desired state of
          the cluster, as defined by the user through objects (
          <span className='italic'>
            we&apos;ll explore objects in the following section
          </span>
          ) like Pods, Services, and Deployments, is maintained. The control
          plane orchestrates tasks like scheduling, scaling, and networking
          across all the nodes in the cluster, effectively coordinating the
          lifecycle of containers and workloads. It is composed of several
          critical components that communicate to manage and control the K8s
          environment.
        </p>
        <p className='mb-2 md:mb-4'>
          The kube-apiserver is the core component of the control plane,
          exposing the K8s API and serving as the entry point for all
          administrative tasks. etcd is a consistent and highly available
          key-value store that holds all cluster data and configuration states,
          ensuring reliability and persistence. The kube-scheduler assigns Pods
          to nodes based on resource availability and other constraints, while
          the kube-controller-manager runs various controllers that enforce the
          desired state of the cluster, such as ensuring Pods stay running or
          handling scaling events. The cloud-controller-manager is an optional
          component that integrates K8s with underlying cloud providers,
          handling tasks like managing load balancers and storage resources tied
          to the cloud infrastructure. Together, these components keep the K8s
          cluster running smoothly and in accordance with the desired
          configurations.
        </p>
        <div className='my-4'>{k8sControlPlaneExplanation()}</div>
        <h2 className='mb-2 font-bold md:mb-4 md:text-lg'>Node Components</h2>
        <p className='mb-2 md:mb-4'>
          The node components in K8s are responsible for maintaining the runtime
          environment on each individual node, ensuring that the Pods and
          containers are running as expected. These components interact with the
          control plane to execute the desired state of the cluster on a
          per-node basis. Each node in the K8s cluster includes these components
          to manage networking, container execution, and monitoring of the
          running workloads.
        </p>
        <p className='mb-2 md:mb-4'>
          The kubelet is the primary agent that runs on each node, ensuring that
          all containers within Pods are running as instructed by the control
          plane. It communicates with the control plane to receive updates about
          the desired state of the node and acts to maintain it. The kube-proxy
          (optional) manages network rules to enable communication between Pods
          and across the network, ensuring Services can route traffic to the
          correct Pods. Finally, the container runtime is the software that is
          responsible for actually running the containers within the Pods, with
          Docker, containerd, and CRI-O being common examples. These node
          components collectively enable K8s to manage workloads effectively
          across the entire cluster.
        </p>
        <div className='my-4'>{k8sNodeComponentsExplanation()}</div>
        <div className='my-3 md:mb-4 md:flex md:flex-col md:items-center'>
          <Image
            src='/images/components-of-kubernetes.svg' // Replace with your actual image URL
            alt='k8s control plane and node components'
            className='h-auto w-auto'
            width={dimensions.width}
            height={dimensions.height}
          />
          <p className='text-xs text-gray-700 md:text-sm'>
            Image credit:
            https://kubernetes.io/docs/concepts/overview/components/
          </p>
        </div>
      </section>

      <section>
        <h2 className='mb-2 font-bold md:mb-4 md:text-lg'>Objects</h2>
        <p className='mb-2 md:mb-4'>
          In K8s, resources are represented as objects, which are persistent
          entities that define the desired state of the cluster. As mentioned
          previously, a cluster is a set of machines that work together to run
          and manage containerized applications, orchestrated by K8s to ensure
          scalability, reliability, and high availability. These objects
          describe the resources needed and specify how they should behave,
          including what applications are running, their resource allocation,
          and policies such as restart behavior, upgrades, and fault tolerance.
          Once an object is created, K8s continually works to maintain the
          desired state you declare, following a{' '}
          <span className='font-bold'>
            <span className='italic'>declarative</span> model where you specify
            the intended outcome, and the system ensures it is achieved
          </span>
          .
        </p>
        <p className='mb-2 md:mb-4'>
          For example, a Pod is the smallest deployable unit and encapsulates
          one or more containers that share storage, networking, and runtime
          configurations. A Service is another object that exposes a set of Pods
          to external traffic, facilitating communication between services or
          users. Deployments manage the desired state of Pods by ensuring the
          correct number of replicas are running and handling updates or
          rollbacks. Other objects like ConfigMaps and Secrets store
          configuration data and sensitive information, such as API keys or
          environment variables, that can be used by containers. By abstracting
          the complexity of managing containerized applications, K8s simplifies
          deployment, scaling, and maintenance, with tools like{' '}
          <code>kubectl</code> or direct API integration to manage these
          objects.
        </p>
        <p className='mb-2 md:mb-4'>
          Now let&apos;s go into some details around the main objects in K8s and
          learn what does what.
        </p>
        <div className='my-4'>{k8sObjectsExplanation()}</div>
        <p className='mb-2 md:mb-4'>
          Sure, this is all great—a bunch of concepts pertaining to K8s—but it
          still remains very esoteric. So let&apos;s look at an architecture
          diagram to understand the interplay and synergies between the control
          plane, node components, and objects, and how they all work together to
          run a simple app in K8s. The architecture diagram will focus on
          running K8s in EKS, and any AWS-specific concepts and tooling will be
          elaborated on. However, before we dive into EKS, why use a
          cloud-managed service like EKS instead of running "vanilla" K8s on
          your own, either locally or in a cloud VM like EC2?
        </p>
        <p className='mb-2 md:mb-4'>
          K8s is a complex technology that isn&apos;t easy to set up and
          maintain. As discussed above, there are many components to manage
          (e.g., the control plane, worker nodes, objects, etc.), along with
          numerous add-ons and plugins (e.g.,{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://cilium.io/'
          >
            cilium
          </a>
          ,{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://coredns.io/'
          >
            coreDNS
          </a>
          , etc.). For many developers, it&apos;s just easier to rely on a cloud
          provider&apos;s managed service to handle the "heavy lifting." By
          "heavy lifting," I mean the work required to maintain a highly
          available, secure, and scalable environment for running K8s—this is
          exactly what AWS EKS provides. For example, there&apos;s an
          open-source (
          <span className='italic'>recently taken over by AWS</span>) library
          called <code>eksctl</code>, which makes life much easier by allowing
          you to create a cluster from the command line. Check out the
          documentation{' '}
          <a
            className='text-blue-500 hover:underline'
            target='_blank'
            href='https://eksctl.io/'
          >
            here
          </a>
          .
        </p>
        <div className='my-3 md:mb-4 md:flex md:flex-col md:items-center'>
          <Image
            src='/images/eksctl-build-cluster.png' // Replace with your actual image URL
            alt='using eksctl to build an EKS cluster'
            className='h-auto w-auto'
            width={eksctlDimensions.width}
            height={eksctlDimensions.height}
          />
          <p className='text-xs text-gray-700 md:text-sm'>
            Image credit: Cumulus Cycles on YouTube -
            https://www.youtube.com/watch?v=QiE6YpA5jk4
          </p>
        </div>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important font-bold text-customOrangeLogo'>
            Important!{' '}
          </span>
          <code>kubectl</code> and <code>eksctl</code> are not serving the same
          function. they serve different purposes when working with K8s and AWS
          EKS. <code>kubectl</code> is the command-line tool used to interact
          with any K8s cluster, allowing you to manage resources like Pods,
          Deployments, and Services, perform CRUD operations, view logs, and
          execute commands within containers. It works across all K8s
          environments, regardless of where the cluster is running. On the other
          hand, <code>eksctl</code> is a specialized tool for creating and
          managing AWS EKS clusters. It simplifies tasks such as provisioning
          EKS control planes, node groups, and networking components with just a
          few commands. While
          <code>kubectl</code> is used to manage applications and resources
          inside an existing K8s cluster, <code>eksctl</code> is focused on the
          infrastructure, automating the setup and maintenance of EKS clusters.
          Both tools are often used together when working with AWS EKS—
          <code>eksctl</code> for cluster creation and <code>kubectl</code> for
          day-to-day management of resources within the cluster.
        </p>
        <p className='mb-2 md:mb-4'>
          Returning to EKS, it can also architect and maintain the control plane
          for you, in addition to offering something called "Managed Node
          Groups," which makes it easier to set up groups of EC2 instances that
          serve as your worker nodes. In the diagram below, I&apos;ll discuss
          some of these features.
        </p>
        <div className='my-3 md:mb-4 md:flex md:flex-col md:items-center'>
          <Image
            src='/images/eks.webp' // Replace with your actual image URL
            alt='diagram showing how EKS works'
            className='h-auto w-auto'
            width={diagramDimensions.width}
            height={diagramDimensions.height}
          />
        </div>
        <p className='mb-2 md:mb-4'>
          What you see is an incredibly rudimentary app running in K8s. You can
          have apps that rely on storage, for which you can leverage{' '}
          <code>PersistentVolume</code> and <code>PersistentVolumeClaims</code>,
          and you can expose your app to the public internet using{' '}
          <code>Ingress</code>. The potential for K8s truly knows no bounds, and
          the ecosystem continues to grow with third-party offerings that can
          make your clusters even more efficient. For example, a few months ago,
          I was introduced to something called "
          <a
            className='text-blue-500 hover:underline'
            target='_blank'
            href='https://docs.cast.ai/docs/getting-started?_gl=1*aji9l5*_up*MQ..&gclid=EAIaIQobChMI38_0xcaBiQMVYGVHAR0q3RVlEAAYASAAEgIW-vD_BwE'
          >
            cast.ai
          </a>
          ," which uses AI to significantly improve cost efficiency for EKS
          clusters. Based on your cluster setup (I saw a combination of EC2 Spot
          and Reserved Instances), it automatically selects the most
          cost-efficient EC2 pricing type and even instance type (e.g.,
          t2.micro, t2.large, t2.nano, etc.) available in your allocation to
          provision new nodes to your cluster based on the memory and compute
          requirements of your Pods and Deployments. This all happens on the
          fly, and it was magical to witness, as it even scales down based on
          the cluster metrics it consistently observes.
        </p>
        <p className='mb-2 md:mb-4'>
          While for TLDRLW, I am not currently using K8s, it&apos;s something I
          might explore adopting once we need to scale beyond the capabilities
          of AWS ECS (Elastic Container Service). For now, ECS is sufficiently
          meeting my workload requirements. ECS is easier to provision and
          maintain, but at some point, the extra effort involved in spinning up
          an EKS cluster could pay dividends.
        </p>
      </section>
    </main>
  );
}
