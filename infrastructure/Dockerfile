# Start from the official Grafana image
FROM grafana/grafana:latest

# Switch to root to install dependencies and AWS CLI (if needed)
USER root

# Install AWS CLI if you still need it for other purposes
RUN apk --no-cache add curl python3 py3-pip aws-cli

# Set the working directory to root
WORKDIR /

# Copy the Grafana configuration file into the provisioning directory
COPY grafana-datasources.yaml /etc/grafana/provisioning/datasources/

# Switch back to the Grafana user
USER grafana

# Run Grafana (default entrypoint)
CMD ["/run.sh"]
