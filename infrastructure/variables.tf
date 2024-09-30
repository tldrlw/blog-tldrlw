variable "APP_NAME" {
  type    = string
  default = "blog-tldrlw"
}

output "TF_VAR_APP_NAME" {
  value = var.APP_NAME
}

variable "IMAGE_TAG" {
  type = string
  # not having a default will force me to provide the latest image tag when running terraform locally
}

output "TF_VAR_IMAGE_TAG" {
  value = var.IMAGE_TAG
}

variable "ENV" {
  type    = string
  default = "dvm"
  # not being used anywhere as of 9/18/24
}

output "TF_VAR_ENV" {
  value = var.ENV
}

variable "HOSTNAME" {
  type    = string
  default = "blog.tldrlw.com"
}

output "TF_VAR_HOSTNAME" {
  value = var.HOSTNAME
}

variable "ADDITIONAL_HOSTNAMES" {
  description = "List of additional hostnames (e.g., monza.tldrlw.com)"
  type        = list(string)
  default     = ["monza.tldrlw.com"]
}

output "TF_VAR_ADDITIONAL_HOSTNAME" {
  value = var.ADDITIONAL_HOSTNAMES
}
