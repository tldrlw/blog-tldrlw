#!/bin/bash

# Set variables
AWS_REGION="us-east-1"         # e.g., us-east-1
ACCOUNT_ID=""                  # Your AWS account ID
ECR_REPO_NAME="grafana-tldrlw" # ECR repository name, defined in ecr.tf
IMAGE_NAME="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"
TAG="latest"

# Function to check if Docker is running
function check_docker {
  if ! docker info >/dev/null 2>&1; then
    echo "Error: Docker daemon is not running. Please start Docker and try again."
    exit 1
  fi
}

# Check if Docker is running
check_docker

# Log in to ECR
echo "Logging in to Amazon ECR..."
if ! aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com; then
  echo "Error: Failed to log in to Amazon ECR."
  exit 1
fi

# Build the Docker image using the Dockerfile in the current directory
echo "Building the Docker image..."
if ! docker build -t ${IMAGE_NAME}:${TAG} .; then
  echo "Error: Failed to build the Docker image."
  exit 1
fi

# Tag the Docker image
echo "Tagging the image as ${IMAGE_NAME}:${TAG}..."
if ! docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:${TAG}; then
  echo "Error: Failed to tag the Docker image."
  exit 1
fi

# Push the Docker image to ECR
echo "Pushing the image to Amazon ECR..."
if ! docker push ${IMAGE_NAME}:${TAG}; then
  echo "Error: Failed to push the Docker image to Amazon ECR."
  exit 1
fi

echo "Docker image ${IMAGE_NAME}:${TAG} has been pushed to ECR successfully."
