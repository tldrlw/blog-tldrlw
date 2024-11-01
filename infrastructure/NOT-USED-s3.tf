# resource "aws_s3_bucket" "ecs_config_files" {
#   bucket = "tldrlw-ecs-config-files"
#   tags = {
#     Name = "tldrlw-ecs-config-files"
#   }
# }

# resource "aws_s3_bucket_versioning" "ecs_config_files" {
#   bucket = aws_s3_bucket.ecs_config_files.id
#   versioning_configuration {
#     status = "Enabled"
#   }
# }

# resource "aws_s3_bucket_ownership_controls" "ecs_config_files" {
#   bucket = aws_s3_bucket.ecs_config_files.id
#   rule {
#     object_ownership = "BucketOwnerPreferred"
#   }
# }

# resource "aws_s3_bucket_acl" "ecs_config_files" {
#   depends_on = [aws_s3_bucket_ownership_controls.ecs_config_files]
#   bucket     = aws_s3_bucket.ecs_config_files.id
#   acl        = "private"
# }
# # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_acl

# resource "aws_s3_bucket_server_side_encryption_configuration" "ecs_config_files" {
#   bucket = aws_s3_bucket.ecs_config_files.id
#   rule {
#     apply_server_side_encryption_by_default {
#       sse_algorithm = "AES256"
#     }
#   }
# }

# resource "aws_s3_object" "grafana_datasources" {
#   key                    = "grafana-datasources.yaml"
#   bucket                 = aws_s3_bucket.ecs_config_files.id
#   source                 = "${path.module}/grafana-datasources.yaml" # Path to your local YAML file
#   server_side_encryption = "AES256"
#   # Use etag to detect file content changes and force updates to S3
#   etag = filemd5("${path.module}/grafana-datasources.yaml")
#   tags = {
#     Name = "grafana_datasources.yaml"
#   }
# }
