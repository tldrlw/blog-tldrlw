resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

resource "aws_subnet" "public" {
  count                   = 3
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index}.0/24"
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  # data.aws_availability_zones.available.names[count.index], will dynamically get the available zones for the region you’re in
  # makes your configuration more flexible and adaptable to different regions with different availability zones
  # all regions have a MINIMUM of 3 availability zones, so this will alert you when trying to create x subnets > 3 in an unsupported region
  tags = {
    Name = "public-${var.APP_NAME}-${data.aws_availability_zones.available.names[count.index]}"
    # ^ shared with monza-tldrlw
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public" {
  count          = 3
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Your VPC and subnet configuration is designed to create three public subnets, each associated with an internet gateway to provide outbound internet access.
# You have configured three public subnets with map_public_ip_on_launch = true, meaning that any resources (such as EC2 instances) launched in these subnets will automatically receive a public IP address and have direct internet access through the internet gateway. However, for λ functions that run inside a VPC, placing them in public subnets is not sufficient to provide outbound internet access.
# When a λ function is configured to run inside a VPC, it uses Elastic Network Interfaces (ENIs) that do not get public IP addresses, even if they are associated with public subnets. Therefore, to provide internet access to λ functions running in a VPC, you typically need:
# Configure private subnets (without direct internet access) for the λ function.
# Deploy a NAT Gateway in one of your public subnets and configure the route tables of the private subnets to route outbound traffic through this NAT Gateway.

### for logging λs ###
# # NAT Gateway in a Public Subnet
# resource "aws_nat_gateway" "main" {
#   allocation_id = aws_eip.nat.id
#   subnet_id     = aws_subnet.public[0].id
# }
# # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/nat_gateway

# # Elastic IP for the NAT Gateway
# resource "aws_eip" "nat" {
#   domain = "vpc"
# }
# # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eip

# # Private Subnets
# resource "aws_subnet" "private" {
#   count                   = 3
#   vpc_id                  = aws_vpc.main.id
#   cidr_block              = "10.0.${count.index + 10}.0/24" # Example CIDR blocks for private subnets
#   availability_zone       = data.aws_availability_zones.available.names[count.index]
#   map_public_ip_on_launch = false
# }

# # Route Table for Private Subnets
# resource "aws_route_table" "private" {
#   vpc_id = aws_vpc.main.id
#   route {
#     cidr_block     = "0.0.0.0/0"
#     nat_gateway_id = aws_nat_gateway.main.id
#   }
# }

# # Associate Private Subnets with Private Route Table
# resource "aws_route_table_association" "private" {
#   count          = 3
#   subnet_id      = aws_subnet.private[count.index].id
#   route_table_id = aws_route_table.private.id
# }
### for logging λs ###
