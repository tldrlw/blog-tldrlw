# blog-tldrlw

This repository contains infrastructure and application code for **blog-tldrlw**, and shared components of the tldrlw ecosystem. It includes resources that are utilized by multiple applications running in the `us-east-1` region, ensuring efficient and centralized management.

## Shared Resources

The following infrastructure components in this repository are shared across other tldrlw applications:

- **ALB (Application Load Balancer)**
- **VPC (Virtual Private Cloud)**
- **ECS Cluster (Elastic Container Service)**
- **Centralized Logging**: Logging setup used across all tldrlw applications

---

## Change Log

### December 21, 2024

- Destroyed ECS service module instantiation for blog app for cost savings

### September 26, 2024

- Added a sitemap for improved SEO and discoverability.
- Reduced the ECS task count to 1 to optimize resource usage.
- Updated the meta title and description for better search engine ranking.
- Made updates to Blog 2 content.

### November 1, 2024

- **Grafana Configuration**: Grafana requires the `grafana-datasources.yaml` file to configure Loki as the data source.
- Attempted to implement a container startup script to pull the configuration file from S3 and restart Grafana. However, this method didn't work as expected.
- Solution: Baked the `grafana-datasources.yaml` file into the Docker image to ensure it's available when ECS starts the Grafana container.

### November 3, 2024

- Spent significant time configuring a reliable shipper/forwarder to send CloudWatch logs to Loki and make them available in Grafana.
- Detailed notes on this process are documented in `logging.md`.

---
