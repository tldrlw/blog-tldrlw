#!/bin/bash

# Variables
WORK_DIR="./vpn_certs"
CA_KEY="${WORK_DIR}/ca.key"
CA_CERT="${WORK_DIR}/ca.crt"
CLIENT_KEY="${WORK_DIR}/client.key"
CLIENT_CSR="${WORK_DIR}/client.csr"
CLIENT_CERT="${WORK_DIR}/client.crt"
OUTPUT_FILE="vpn-client-config.ovpn"
CUSTOM_DOMAIN="vpn.tldrlw.com"     # Correct custom domain for the VPN endpoint
CLIENT_CN="${CLIENT_CN:-"Client"}" # Default to "Client" if not set
AMAZON_ROOT_CA_URL="${AMAZON_ROOT_CA_URL:-"https://www.amazontrust.com/repository/AmazonRootCA1.pem"}"
AMAZON_ROOT_CA_FILE="${WORK_DIR}/AmazonRootCA1.pem"
AMAZON_ROOT_CA_SHA256="2c43952ee9e000ff2acc4e2ed0897c0a72ad5fa72c3d934e81741cbd54f05bd1"

# Ensure the working directory exists
mkdir -p "${WORK_DIR}"

# Function to log messages
log() {
  echo "[INFO] $1"
}

# Function to handle errors and exit
error_exit() {
  echo "[ERROR] $1"
  exit 1
}

# Step 1: Verify dependencies
verify_dependencies() {
  log "Verifying dependencies..."
  command -v openssl >/dev/null 2>&1 || error_exit "OpenSSL is not installed. Please install it and try again."
  command -v curl >/dev/null 2>&1 || error_exit "cURL is not installed. Please install it and try again."
}

# Step 2: Download Amazon Root CA
download_amazon_root_ca() {
  log "Downloading Amazon Root CA..."
  curl -o "${AMAZON_ROOT_CA_FILE}" "${AMAZON_ROOT_CA_URL}" || error_exit "Failed to download Amazon Root CA."
  if [[ -f "${AMAZON_ROOT_CA_FILE}" ]]; then
    log "Amazon Root CA downloaded successfully: ${AMAZON_ROOT_CA_FILE}"
    validate_root_ca_checksum
  else
    error_exit "Amazon Root CA file is missing after download."
  fi
}

# Step 3: Validate Root CA checksum
validate_root_ca_checksum() {
  log "Validating Amazon Root CA checksum..."
  DOWNLOAD_SHA256=$(sha256sum "${AMAZON_ROOT_CA_FILE}" | awk '{print $1}')
  if [[ "$DOWNLOAD_SHA256" != "$AMAZON_ROOT_CA_SHA256" ]]; then
    error_exit "Amazon Root CA checksum validation failed. Expected: $AMAZON_ROOT_CA_SHA256, Got: $DOWNLOAD_SHA256"
  fi
  log "Amazon Root CA checksum validated successfully."
}

# Step 4: Generate CA if not already existing
generate_ca() {
  if [[ ! -f "${CA_KEY}" || ! -f "${CA_CERT}" ]]; then
    log "Generating CA (Certificate Authority)..."
    openssl genrsa -out "${CA_KEY}" 2048 || error_exit "Failed to generate CA private key."
    openssl req -x509 -new -nodes -key "${CA_KEY}" -sha256 -days 3650 -out "${CA_CERT}" \
      -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=RootCA" || error_exit "Failed to generate CA certificate."
  else
    log "Using existing CA..."
  fi
}

# Step 5: Generate Client Certificate
generate_client_cert() {
  log "Generating Client Certificate..."
  openssl genrsa -out "${CLIENT_KEY}" 2048 || error_exit "Failed to generate client private key."
  openssl req -new -key "${CLIENT_KEY}" -out "${CLIENT_CSR}" -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=${CLIENT_CN}" || error_exit "Failed to generate client CSR."
  openssl x509 -req -in "${CLIENT_CSR}" -CA "${CA_CERT}" -CAkey "${CA_KEY}" -CAcreateserial -out "${CLIENT_CERT}" -days 365 -sha256 || error_exit "Failed to generate client certificate."
}

# Step 6: Generate the .ovpn configuration file
generate_ovpn_file() {
  log "Generating .ovpn file..."
  cat >"$OUTPUT_FILE" <<EOF
client
dev tun
proto udp
remote $CUSTOM_DOMAIN 443
remote-random-hostname
resolv-retry infinite
nobind
remote-cert-tls server
cipher AES-256-GCM
verb 3

<ca>
$(cat "$AMAZON_ROOT_CA_FILE")
</ca>

<cert>
$(cat "$CLIENT_CERT")
</cert>

<key>
$(cat "$CLIENT_KEY")
</key>

reneg-sec 0

verify-x509-name $CUSTOM_DOMAIN name
EOF

  if [[ -f "$OUTPUT_FILE" ]]; then
    log "VPN client configuration file generated: $OUTPUT_FILE"
  else
    error_exit "Failed to generate .ovpn file."
  fi

  log "Setting strict permissions on sensitive files..."
  chmod 600 "${CA_KEY}" "${CLIENT_KEY}" "${CLIENT_CERT}" "${OUTPUT_FILE}"
}

# Main Script Execution
log "Starting VPN client configuration generation process..."
verify_dependencies
download_amazon_root_ca
generate_ca
generate_client_cert
generate_ovpn_file
log "VPN client configuration generation completed successfully."
