variable "IMAGE_TAG" {
  type    = string
  default = "latest"
}

output "IMAGE_TAG" {
  value = var.IMAGE_TAG
}

variable "ENV" {
  type = string
}

output "ENV" {
  value = var.ENV
}
