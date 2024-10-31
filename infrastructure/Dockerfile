# Start from the official Grafana image
FROM grafana/grafana:latest

# Switch to root to install dependencies and AWS CLI
USER root

# Install dependencies and AWS CLI
RUN apk --no-cache add curl python3 py3-pip aws-cli

# Set the working directory for Grafana
WORKDIR /etc/grafana/provisioning/datasources

# Switch back to the Grafana user for running Grafana
USER grafana

# Run Grafana (this starts Grafana with its default entrypoint)
CMD ["/run.sh"]