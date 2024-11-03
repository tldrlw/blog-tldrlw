#!/bin/bash

# Set variables
AWS_REGION="us-east-1"      # e.g., us-east-1
ACCOUNT_ID="920394549028"   # Your AWS account ID
ECR_REPO_NAME="loki-tldrlw" # ECR repository name, defined in ecr.tf
IMAGE_NAME="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"
TAG="latest"
DOCKERFILE="Dockerfile-loki" # Specify the Dockerfile name

# Function to check if Docker is running
function check_docker {
  if ! docker info >/dev/null 2>&1; then
    echo "Error: Docker daemon is not running. Please start Docker and try again."
    exit 1
  fi
}

# Function to check if the account ID is set
function check_account_id {
  if [[ -z "${ACCOUNT_ID}" ]]; then
    echo "Error: AWS account ID is not set. Please set the ACCOUNT_ID variable and try again."
    exit 1
  fi
}

# Check if the account ID is set
check_account_id

# Check if Docker is running
check_docker

# Log in to ECR
echo "Logging in to Amazon ECR..."
if ! aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com; then
  echo "Error: Failed to log in to Amazon ECR."
  exit 1
fi

# Check if Dockerfile-loki exists
if [[ ! -f "${DOCKERFILE}" ]]; then
  echo "Error: ${DOCKERFILE} not found in the current directory."
  exit 1
fi

# Build the Docker image using Dockerfile-loki
echo "Building the Docker image using ${DOCKERFILE}..."
if ! docker build -f ${DOCKERFILE} -t ${IMAGE_NAME}:${TAG} .; then
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
