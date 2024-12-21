# module "vpn_client" {
#   source              = "git::https://github.com/tldrlw/terraform-modules.git//vpn-client?ref=dev"
#   NAME                = "vpc-access"
#   PROJECT             = "tldrlw"
#   CLIENT_CIDR         = "10.1.0.0/22"
#   PRIVATE_SUBNET_CIDR = "10.0.20.0/24" # Adjusted range for the single VPN subnet
#   REGION              = "us-east-1"
#   ROUTE_53_ZONE_ID    = data.aws_route53_zone.tldrlw_com.zone_id
#   TRUSTED_CIDR        = "100.15.211.96/32"
#   VPC_CIDR            = "10.0.0.0/16"
#   VPC_ID              = aws_vpc.main.id
#   VPN_INACTIVE_PERIOD = "600" # in seconds, 600 = 10 minutes
# }
# rm -rf .terraform/modules
