variable "APP_NAME" {
  type    = string
  default = "blog-tldrlw"
}

output "TF_VAR_APP_NAME" {
  value = var.APP_NAME
}

variable "IMAGE_TAG" {
  type    = string
  default = "8a5002d"
}

output "TF_VAR_IMAGE_TAG" {
  value = var.IMAGE_TAG
}

variable "ENV" {
  type = string
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
