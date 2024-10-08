import CodeBlock from '@/components/codeBlock';
import Image from 'next/image';
import { resizeImage } from '@/app/lib/utilities';
import {
  k8sObjectsExplanation,
  k8sControlPlaneExplanation,
  k8sNodeComponentsExplanation,
} from '@/app/lib/overviews/blog4';

const title = 'Intro to K8s (K8s) and AWS EKS';
const date = 'Tuesday, October 8, 2024';

export default async function Blog4() {
  const dimensions = await resizeImage('components-of-kubernetes.svg', 0.4); // Call the function directly in the server component

  return (
    <main>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>{title}</h1>
      <p className='mb-2 text-sm font-light md:mb-4 md:text-base'>{date}</p>
      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          Having worked with K8s (K8s) both on-prem and in AWS EKS (Elastic K8s
          Service), <span className='font-bold'>and</span> passed the{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://www.credly.com/badges/cd704a5f-0aee-473e-8dcd-d9f1262a52d0'
            target='_blank'
          >
            CKA (Certified K8s Administrator)
          </a>{' '}
          and{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://www.credly.com/badges/5364ef8b-e1fb-41a1-92ed-3b8980f998a8'
            target='_blank'
          >
            CKAD (Certified K8s Application Developer)
          </a>{' '}
          exams, it seems only right to do a refresher and explain the main
          concepts around the technology. Let's begin with Docker and running
          containers, without a basic understanding of these two things, it
          would be remiss of us to begin talking about K8s.
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
          runtime, libraries, and system tools, ensuring that it works the same
          in development, testing, and production. Containers are efficient and
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
          EKS is just an alternative to ECS, they both do
          "container-orchestration", but ECS is native only to AWS, while K8s is
          open-source and can be implemented on-prem or with other cloud
          providers like Microsoft Azure and Google Cloud. AWS&apos; K8s
          implementation is known as EKS, and since I work solely with AWS, we
          will be looking into EKS.
        </p>
        <p className='mb-2 md:mb-4'>
          Ok, so what is K8s and what is it used for?
        </p>
        <p className='mb-2 md:mb-4'>
          {' '}
          <span className='!important font-bold text-customOrangeLogo'>
            Definition:{' '}
          </span>
          K8s is an open-source platform designed for automating the deployment,
          scaling, and management of containerized applications across clusters
          of machines. It provides the tools to ensure that containers are
          efficiently distributed, load-balanced, and resilient to failure,
          handling tasks like scaling based on demand, rolling updates, and
          self-healing when containers crash or become unresponsive. K8s is
          widely used for managing complex, large-scale containerized
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
          A K8s <span className='font-bold'>cluster</span> is a set of machines,
          called nodes, that work together to run and manage containerized
          applications. These machines can be physical servers, virtual machines
          (VMs), or cloud instances, and they are categorized into two types:
          control plane (master node) and worker nodes. The control plane is
          responsible for managing the cluster&apos;s overall state, making
          decisions about scheduling, scaling, and orchestrating resources,
          while the worker nodes handle the actual running of application
          workloads. Each worker node runs components like the kubelet to manage
          containers and a container runtime to execute them. K8s ensures
          scalability, reliability, and high availability within the cluster by
          distributing tasks, managing resources, and maintaining the desired
          state of applications automatically across the nodes.
        </p>
        <h2 className='mb-2 font-bold md:mb-4 md:text-lg'>
          Control Plane Components
        </h2>
        <p className='mb-2 md:mb-4'>
          The control plane in K8s is responsible for managing the overall state
          and operations of the cluster. It ensures that the desired state of
          the cluster, as defined by the user through objects (
          <span className='italic'>
            we&apos;ll explore objects in a following section
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
          <span className='italic'>declarative</span> model where you specify
          the intended outcome, and the system ensures it is achieved.
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
          deployment, scaling, and maintenance, with tools like
          <code>kubectl</code> or direct API integration to manage these
          objects.
        </p>
        <p className='mb-2 md:mb-4'>
          Now let&apos;s try and understand the main objects in K8s and what
          does what.
        </p>
        <div className='my-4'>{k8sObjectsExplanation()}</div>
        <p className='mb-2 md:mb-4'>
          Sure, this is all great, a bunch of concepts pertaining to K8s, but it
          still remains very esoteric. So let's look at an architecture diagram
          to understand the interplay and synergies between the core and node
          components and objects, and how they all contribute to run a simple
          app in K8s. The architecture diagram will focus on running K8s in EKS,
          and whatever concepts and tooling is specific to AWS, will be
          elaborated on.
        </p>
      </section>
      <section className='mb-6 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 italic md:mb-4'>To be continued...</p>
      </section>
    </main>
  );
}
