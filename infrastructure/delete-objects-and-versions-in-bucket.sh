#!/bin/bash

# Set the bucket name
BUCKET_NAME="blog-tldrlw-alb-logs"

# Check if aws-cli is installed
if ! command -v aws &> /dev/null; then
  echo "Error: aws-cli is not installed. Please install it first."
  exit 1
fi

# Function to delete objects in batches
delete_objects_in_batches() {
  local OBJECTS=$1
  echo "$OBJECTS" | jq -c '.[]' | while read -r OBJECT; do
    # Create a JSON payload for a single object
    PAYLOAD=$(echo "$OBJECT" | jq -c '{"Objects": [.]}' )
    aws s3api delete-objects --bucket "$BUCKET_NAME" --delete "$PAYLOAD" > /dev/null
    if [ $? -ne 0 ]; then
      echo "Error: Failed to delete object: $OBJECT"
    else
      echo "Deleted: $(echo "$OBJECT" | jq -c .)"
    fi
  done
}

# Step 1: Fetch and delete object versions
echo "Fetching object versions from the bucket: $BUCKET_NAME"
VERSIONS=$(aws s3api list-object-versions --bucket "$BUCKET_NAME" --query "Versions[].{Key:Key,VersionId:VersionId}" --output json)
if [ -n "$VERSIONS" ] && [ "$VERSIONS" != "[]" ]; then
  echo "Deleting object versions..."
  delete_objects_in_batches "$VERSIONS"
else
  echo "No object versions found."
fi

# Step 2: Fetch and delete delete markers
echo "Fetching delete markers from the bucket: $BUCKET_NAME"
DELETE_MARKERS=$(aws s3api list-object-versions --bucket "$BUCKET_NAME" --query "DeleteMarkers[].{Key:Key,VersionId:VersionId}" --output json)
if [ -n "$DELETE_MARKERS" ] && [ "$DELETE_MARKERS" != "[]" ]; then
  echo "Deleting delete markers..."
  delete_objects_in_batches "$DELETE_MARKERS"
else
  echo "No delete markers found."
fi

echo "All objects and delete markers have been processed for the bucket: $BUCKET_NAME."