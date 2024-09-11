#!/bin/bash

# Ask the user for the AWS region and repository name
read -p "Enter the AWS region (e.g., us-east-1): " REGION
read -p "Enter the repository name (e.g., blog-tldrlw): " REPO_NAME

# Generate a random 6-character alphanumeric tag
TAG=$(openssl rand -hex 3)

# Get the AWS account ID and save it to a variable
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Print the account ID
echo "The AWS account ID is: $ACCOUNT_ID"

# Get the current time
CURRENT_TIME=$(date "+%B %d, %Y %I:%M %p")

# Authenticate Docker to ECR
aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

# Build the Docker image with the current time and tag as build arguments
docker build --build-arg BUILD_TIME="$CURRENT_TIME" \
             --build-arg IMAGE="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME:$TAG" \
             -t "$REPO_NAME:$TAG" .

# Check if the image was built successfully
if [[ $? -ne 0 ]]; then
  echo "Docker build failed. Exiting."
  exit 1
fi

# Tag the Docker image with the generated tag
docker tag "$REPO_NAME:$TAG" "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME:$TAG"

# Push the Docker image to ECR
docker push "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME:$TAG"

# Check if the image was pushed successfully
if [[ $? -ne 0 ]]; then
  echo "Docker push failed. Exiting."
  exit 1
fi

echo "Docker image pushed to ECR with tag $TAG. Update image_tag in variables.tf to use the new image tag and run 'terraform apply --auto-approve'."