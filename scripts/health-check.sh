#!/bin/bash

# Health Check Script for SubscribeMeForAI
# This script checks if the application is running and healthy
# by making HTTP requests to the health check endpoint

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
HEALTH_ENDPOINT="${HEALTH_ENDPOINT:-http://localhost:3000/api/health}"
MAX_RETRIES=5
RETRY_DELAY=2

# Function to print status
print_status() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

print_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Check if curl is installed
if ! command -v curl &> /dev/null; then
    print_error "curl is not installed. Please install curl first."
    exit 1
fi

print_status "Starting health check for: $HEALTH_ENDPOINT"

# Perform health check with retries
for i in $(seq 1 $MAX_RETRIES); do
    print_status "Attempt $i/$MAX_RETRIES..."

    # Make HTTP request to health endpoint
    HTTP_STATUS=$(curl -s -o /tmp/health-response.json -w "%{http_code}" "$HEALTH_ENDPOINT" || echo "000")

    if [ "$HTTP_STATUS" -eq 200 ]; then
        print_status "Health check passed! HTTP Status: $HTTP_STATUS"

        # Try to parse and display response (requires jq, optional)
        if command -v jq &> /dev/null; then
            if [ -f /tmp/health-response.json ]; then
                echo ""
                echo "Response:"
                cat /tmp/health-response.json | jq '.'
                rm -f /tmp/health-response.json
            fi
        else
            if [ -f /tmp/health-response.json ]; then
                echo ""
                echo "Response:"
                cat /tmp/health-response.json
                echo ""
                rm -f /tmp/health-response.json
            fi
        fi

        exit 0
    else
        print_warning "Health check failed. HTTP Status: $HTTP_STATUS"

        if [ -f /tmp/health-response.json ]; then
            echo "Response body:"
            cat /tmp/health-response.json
            rm -f /tmp/health-response.json
        fi

        if [ $i -lt $MAX_RETRIES ]; then
            print_status "Retrying in $RETRY_DELAY seconds..."
            sleep $RETRY_DELAY
        fi
    fi
done

# All retries exhausted
print_error "Health check failed after $MAX_RETRIES attempts!"
exit 1
