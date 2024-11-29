# module "vpn_client" {
#   source              = "git::https://github.com/tldrlw/terraform-modules.git//vpn-client?ref=dev"
#   CLIENT_CIDR         = "10.1.0.0/22"
#   DOMAIN              = "tldrlw.com"
#   PRIVATE_SUBNET_CIDR = "10.0.20.0/24" # Adjusted range for the single VPN subnet
#   ROUTE_53_ZONE_ID    = data.aws_route53_zone.tldrlw_com.zone_id
#   TRUSTED_CIDR        = "100.15.211.96/32"
#   VPC_CIDR            = "10.0.0.0/16"
#   VPC_ID              = aws_vpc.main.id
# }
# rm -rf .terraform/modules
