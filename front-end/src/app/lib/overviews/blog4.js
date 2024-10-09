import Overview from '@/components/overview';

export const k8sNodeComponentsExplanation = () => {
  const heading = 'K8s Node Components';
  const description =
    'Node components are responsible for running workloads and maintaining the runtime environment on each individual node within the K8s cluster. These components work together to ensure that Pods are running as expected and that the necessary network rules and resources are in place. Below is an explanation of the key node components and their roles in K8s.';
  const components = [
    {
      component: 'kubelet',
      textBlocks: [
        'The kubelet is the primary agent running on every node in the K8s cluster. It ensures that all containers in a Pod are running as intended. The kubelet interacts with the control plane to receive instructions and monitors the state of Pods on the node. If a container fails or needs to be restarted, the kubelet ensures that it aligns with the desired state as specified by the control plane, taking corrective action when necessary.',
      ],
    },
    {
      component: 'kube-proxy (optional)',
      textBlocks: [
        'kube-proxy is responsible for maintaining network rules on each node. It facilitates networking in K8s by ensuring that Pods can communicate with each other, both within the node and across different nodes in the cluster. kube-proxy enables the implementation of K8s Services by managing IP forwarding and load balancing rules. While kube-proxy is optional, it plays an important role in ensuring smooth service discovery and communication within the cluster.',
      ],
    },
    {
      component: 'Container runtime',
      textBlocks: [
        'The container runtime is the software responsible for running the containers that make up a Pod. While Docker is the most ubiquitous container runtime, widely known and used due to its simplicity and vast ecosystem, K8s supports other container runtimes as well. Alternatives include containerd, which is a lightweight runtime designed for K8s, and CRI-O, a K8s-native container runtime designed to be efficient and optimized for K8s workloads. The container runtime abstracts the low-level container execution, allowing K8s to manage and orchestrate containers across nodes, regardless of the runtime being used.',
      ],
    },
  ];
  const closing =
    'These node components work together to provide the runtime environment for K8s Pods. The kubelet ensures that containers are running as specified, kube-proxy manages network rules to allow communication across Pods and services, and the container runtime, such as Docker, containerd, or CRI-O, runs the containers themselves. Together, these components ensure that each node can fulfill its role in running and managing the workloads in a K8s cluster.';

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

export const k8sControlPlaneExplanation = () => {
  const heading = 'K8s Control Plane Components';
  const description =
    "The control plane is responsible for managing the overall state of the K8s cluster. It ensures that the cluster's desired state is maintained, coordinating everything from scheduling to resource management. Below is a breakdown of the key components in the control plane and how they interact to ensure the smooth operation of the cluster.";
  const components = [
    {
      component: 'kube-apiserver',
      textBlocks: [
        'The kube-apiserver is the core component of the K8s control plane. It exposes the K8s API, which serves as the primary interface for interacting with the cluster. Whether you&apos;re using <code>kubectl</code>, making requests via the K8s dashboard, or utilizing the API directly, the kube-apiserver handles all these requests. It validates incoming requests and processes changes to the cluster, allowing users and system components to communicate with K8s efficiently.',
        'The K8s API can be accessed directly or through tools like kubectl, which simplifies cluster management. With kubectl, you can perform actions such as deploying applications, scaling services, and managing resources like Pods, Services, and Deployments. For example, to create a new deployment, you would use <code>kubectl apply -f {deployment.yaml}</code>, where the YAML file defines the configuration of your application. You can also interact with live objects, such as checking the status of Pods using <code>kubectl get pods</code> or scaling a deployment with <code>kubectl scale deployment {deployment-name} --replicas={number}</code>. Through these commands, kubectl makes API calls to the kube-apiserver, which then processes the requests and ensures the cluster&apos;s desired state is maintained.',
      ],
    },
    {
      component: 'etcd',
      textBlocks: [
        'etcd is a highly available key-value store that holds all the configuration data for the cluster, including the current and desired states of K8s resources. It provides reliable, consistent storage for all the data managed by the API server. In a distributed K8s environment, etcd ensures data consistency and availability, even during network partitions or node failures, making it the backbone of K8s persistence.',
      ],
    },
    {
      component: 'kube-scheduler',
      textBlocks: [
        'The kube-scheduler is responsible for assigning Pods to nodes within the cluster. It continuously monitors for Pods that have not yet been assigned to a node and matches them to nodes based on resource requirements, node capacity, and other constraints like affinity, taints, or tolerations. The scheduler ensures efficient resource utilization by balancing workloads across the cluster&apos;s nodes.',
        'The kube-scheduler uses several factors to determine the best node for a Pod, ensuring it runs optimally within the cluster. <strong>Affinity</strong> rules allow you to specify preferences or requirements for where Pods should be scheduled. For instance, you can configure node affinity so that a Pod is only scheduled on nodes with specific labels, like ensuring that a Pod runs on nodes in a particular region or with certain hardware. <strong>Taints and tolerations</strong> work together to repel Pods from specific nodes. A node may be tainted to prevent most Pods from being scheduled on it (e.g., if it&apos;s reserved for critical workloads), and only Pods with a matching toleration will be scheduled there. This mechanism is useful for ensuring that high-priority or specialized workloads don&apos;t compete for resources on nodes intended for general use. The scheduler balances these rules with resource requirements (like CPU and memory) to select the most appropriate node for each Pod, maximizing efficiency and resource utilization.',
      ],
    },
    {
      component: 'kube-controller-manager',
      textBlocks: [
        'The kube-controller-manager runs various controllers that continuously work to maintain the desired state of the cluster. These controllers manage important functions like ensuring that the correct number of Pods are running, managing node availability, handling scaling, and managing networking and storage. Each controller monitors the state of the cluster and makes changes as needed to align the actual state with the desired state.',
      ],
    },
    {
      component: 'cloud-controller-manager (optional)',
      textBlocks: [
        'The cloud-controller-manager integrates K8s with the underlying cloud provider&apos;s infrastructure. In the case of AWS EKS, this component is responsible for managing cloud resources such as Elastic Load Balancers (ELBs), Elastic Block Storage (EBS), and VPC routing. AWS EKS relies on this integration to handle cloud-specific resources like automatic provisioning of load balancers for Services of type LoadBalancer, attaching persistent storage volumes to nodes, and managing node health. The AWS cloud-controller-manager ensures seamless interaction between K8s and AWS infrastructure, providing a unified management experience for workloads running in the cloud.',
      ],
    },
  ];
  const closing =
    'These control plane components work together to manage the state and operation of the K8s cluster. The kube-apiserver acts as the front door to the cluster, etcd stores the desired state, the kube-scheduler assigns Pods to nodes, and the kube-controller-manager ensures that everything in the cluster remains in the desired state. In AWS EKS, the cloud-controller-manager handles cloud-specific resources like load balancers, storage, and networking, making the cluster integration with AWS infrastructure seamless. Together, they enable K8s to be a powerful and efficient orchestration tool for containerized applications.';

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

export const k8sObjectsExplanation = () => {
  const heading = 'K8s Objects Overview';
  const description =
    'In K8s, everything is managed through objects, which represent the desired state of your cluster. These objects define the configuration, scaling, and behavior of applications and resources running within the cluster. Below is an explanation of the key K8s objects and how they interact to form a dynamic, scalable, and self-healing infrastructure.';
  const components = [
    {
      component: 'Pod',
      textBlocks: [
        'A Pod is the smallest and simplest K8s object. It encapsulates one or more tightly coupled containers, along with their storage and networking. Pods are the basic building blocks for running applications in K8s, and they ensure that containers within them share resources and communicate with each other. However, Pods are ephemeral, which means they can be destroyed and recreated, so other objects like Deployments are often used to manage Pods more efficiently.',
      ],
    },
    {
      component: 'Service',
      textBlocks: [
        'A Service is an abstraction that defines a logical set of Pods and the policies by which they are accessed. K8s Services provide load balancing and ensure that even as Pods are dynamically created or destroyed, the application remains reachable via a consistent endpoint. Services can expose Pods both internally within the cluster or externally to the internet, depending on their configuration (<strong>ClusterIP, NodePort, LoadBalancer</strong>).',
        'A K8s Service adds a layer of abstraction by providing a unified and stable networking interface for Pods, even as they are created or destroyed across different nodes with varying IP addresses. Without Services, managing network communication between constantly changing Pods would be complex, as each Pod has its own unique IP address, which can change when the Pod is rescheduled or recreated. The Service solves this problem by acting as a consistent entry point for accessing Pods. It keeps track of the Pods that belong to the logical group it manages and automatically routes traffic to healthy Pods, regardless of where they are running in the cluster. This ensures that applications remain accessible through a single, stable endpoint, regardless of the underlying changes in Pod IPs or node locations. By decoupling the network layer from the actual Pod infrastructure, Services make communication between distributed components in K8s much more reliable and scalable. This concept is often referred to as K8s "Service Discovery".',
        'ClusterIP is the default service type and exposes the service on an internal IP within the cluster, making it accessible only to other services and Pods inside the cluster. This is ideal for internal communication between microservices or components that don&apos;t need to be exposed externally. NodePort exposes the service on a static port on each node&apos;s IP, allowing external traffic to access the service through <NodeIP>:<NodePort>. It&apos;s typically used for development or testing, as it offers basic external access but can be less secure and scalable. LoadBalancer creates an external load balancer (e.g., AWS ELB or GCP Load Balancer) that automatically routes traffic to the underlying Pods, offering a fully managed and scalable solution for exposing services to the internet. LoadBalancer is best used when you need to expose a service externally with automatic traffic distribution, especially in production environments.',
      ],
    },
    {
      component: 'Deployment',
      textBlocks: [
        'A Deployment ensures the desired state of your application by managing Pods. It defines how many replicas (copies) of a Pod should be running at any given time and takes care of rolling updates, rollbacks, and scaling. Deployments provide high availability by automatically distributing Pods across nodes, ensuring that your application remains up and running even during updates or failures.',
        'Rolling updates, rollbacks, and scaling are key features of K8s Deployments that help manage application lifecycle and stability. Rolling updates allow for seamless updates to your application by gradually replacing old Pods with new ones, ensuring zero downtime. This process ensures that a portion of the application remains available at all times while new Pods are deployed incrementally. Rollbacks come into play when an update causes issues, allowing you to revert to a previous stable version of the application quickly, ensuring minimal disruption. Scaling refers to adjusting the number of Pod replicas running your application to meet demand. You can scale up (add more Pods) during high traffic or scale down (reduce Pods) during low demand, ensuring efficient resource usage while maintaining high availability.',
      ],
    },
    {
      component: 'ReplicaSet',
      textBlocks: [
        'A ReplicaSet&apos;s purpose is to maintain a stable set of replicas (copies) of a Pod running at all times. While ReplicaSets ensure the correct number of Pods are running, they are usually managed by Deployments. ReplicaSets are important for maintaining the desired state of applications when Pods fail or are removed, automatically replacing them as needed to keep the system running smoothly.',
      ],
    },
    {
      component: 'StatefulSet',
      textBlocks: [
        'A StatefulSet is a K8s object designed for managing stateful applications. Unlike Deployments, StatefulSets provide guarantees about the ordering and uniqueness of Pods, making them ideal for use with databases or applications that require stable network identifiers and persistent storage.',
        'StatefulSets are particularly useful in scenarios where applications require consistent identities, stable storage, or ordered deployment and scaling. For example, databases like MySQL, Cassandra, or MongoDB (both Cassandra and MongoDB are "NoSQL" databases, similar to DynamoDB I&apos;ve worked with in other blog posts), which require persistent data across restarts, benefit from StatefulSets because they ensure each Pod retains its unique identifier and associated storage. Another common use case is for distributed systems, such as Apache Zookeeper or Kafka, which rely on stable network identities and ordered pod creation and termination to maintain cluster coordination. In these situations, StatefulSets ensure that even as Pods are scaled or restarted, they maintain their connections, data, and predictable behavior across the cluster.',
      ],
    },
    {
      component: 'Job & CronJob',
      textBlocks: [
        'Jobs and CronJobs are K8s objects for running tasks. A Job runs a task to completion, ensuring that the task runs successfully even if Pods fail and need to be restarted. A CronJob schedules recurring tasks, similar to cron jobs on a Linux system, making them useful for periodic tasks like backups or scheduled maintenance.',
      ],
    },
    {
      component: 'PersistentVolume & PersistentVolumeClaim',
      textBlocks: [
        'PersistentVolumes (PV) and PersistentVolumeClaims (PVC) are used to manage storage in K8s. A PersistentVolume represents a piece of storage provisioned in the cluster, while a PersistentVolumeClaim allows a Pod to request storage. This separation between PV and PVC allows for dynamic storage management and ensures that data can persist across Pod restarts or rescheduling.',
      ],
    },
    {
      component: 'ConfigMap & Secret',
      textBlocks: [
        'ConfigMaps and Secrets are K8s objects used to store configuration data for your applications. ConfigMaps hold non-sensitive data, such as environment variables or configuration files, while Secrets store sensitive information like passwords, API keys, or tokens. Both objects allow you to decouple configuration from your containerized application, making it easier to update or manage settings without modifying the actual application image.',
      ],
    },
    {
      component: 'Ingress',
      textBlocks: [
        'Ingress is an API object that manages external access to services within the cluster, typically HTTP or HTTPS routes. Unlike Services that expose Pods directly, Ingress allows you to define more complex routing rules and can offer SSL termination, load balancing, and name-based virtual hosting, providing a flexible and secure way to manage traffic coming into the cluster.',
        'In AWS EKS, Ingress can be seamlessly integrated with AWS&apos;s native load balancers (a service that distributes incoming network traffic across multiple backend services or Pods to ensure reliability, high availability, and optimal resource utilization in the cluster) to manage external traffic. When an Ingress resource is deployed in EKS, AWS often provisions an Elastic Load Balancer (ELB)—either an Application Load Balancer (ALB) or Network Load Balancer (NLB)—to handle incoming requests based on the routing rules defined in the Ingress object. By using the AWS ALB Ingress Controller, for example, K8s can automatically configure an ALB to manage HTTP/HTTPS traffic, offer SSL termination, and distribute traffic across services, all while leveraging AWS&apos;s scalable and high-availability infrastructure. This integration combines K8s&apos; flexibility in routing with AWS&apos;s powerful load balancing capabilities, providing a streamlined solution for handling complex traffic patterns securely and efficiently.',
      ],
    },
    {
      component: 'Namespace',
      textBlocks: [
        'A Namespace is used to organize and isolate resources within a K8s cluster. Namespaces allow you to group related resources together, making it easier to manage large clusters and divide resources across different teams or environments (such as development and production).',
        'Namespaces are especially useful in scenarios where multiple teams or environments share the same K8s cluster. For example, if you have separate development, staging, and production environments, you can create a namespace for each to ensure that resources like Pods, Services, and ConfigMaps are isolated from one another, reducing the risk of accidental conflicts or misconfigurations. Additionally, when managing multiple applications, each application can be placed in its own namespace, as I&apos;ve experienced personally, to simplify resource management, monitoring, and access control. This approach also allows administrators to apply specific quotas, policies, or security settings at the namespace level, ensuring each application has the right amount of resources and permissions without interfering with others in the same cluster.',
      ],
    },
  ];
  const closing =
    'These K8s objects work together to build a robust, self-healing, and scalable infrastructure. Pods run your containerized workloads, Services ensure consistent access to those workloads, and Deployments and StatefulSets manage the lifecycle and scaling. ConfigMaps, Secrets, PersistentVolumes, and Ingress handle configuration, storage, and traffic management, while Namespaces help organize and isolate resources in large-scale environments. Together, they form the backbone of modern cloud-native applications in K8s.';

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
