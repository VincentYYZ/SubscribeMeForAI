#!/bin/bash

# Production Deployment Script for SubscribeMeForAI
# This script automates the deployment process including:
# - Git pull latest changes
# - Install dependencies
# - Run database migrations
# - Build the application
# - Restart PM2 process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="subscribemeforai"
APP_DIR="/var/www/subscribemeforai"
NODE_ENV="production"

echo -e "${GREEN}=== Starting Deployment ===${NC}"
echo "Application: $APP_NAME"
echo "Directory: $APP_DIR"
echo "Environment: $NODE_ENV"
echo ""

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

# Check if we're in the correct directory
if [ ! -d "$APP_DIR" ]; then
    print_error "Application directory $APP_DIR not found!"
    exit 1
fi

cd "$APP_DIR"
print_status "Changed to application directory"

# Step 1: Git pull
print_status "Pulling latest changes from Git..."
if ! git pull origin main; then
    print_error "Git pull failed!"
    exit 1
fi
print_status "Git pull completed"

# Step 2: Install dependencies
print_status "Installing/updating dependencies..."
if ! npm ci --production=false; then
    print_warning "npm ci failed, trying npm install..."
    if ! npm install; then
        print_error "npm install failed!"
        exit 1
    fi
fi
print_status "Dependencies installed"

# Step 3: Run Prisma migrations
print_status "Running database migrations..."
if ! npx prisma migrate deploy; then
    print_error "Database migration failed!"
    exit 1
fi
print_status "Database migrations completed"

# Step 4: Generate Prisma Client
print_status "Generating Prisma Client..."
if ! npx prisma generate; then
    print_error "Prisma generate failed!"
    exit 1
fi
print_status "Prisma Client generated"

# Step 5: Build the application
print_status "Building Next.js application..."
if ! npm run build; then
    print_error "Build failed!"
    exit 1
fi
print_status "Build completed"

# Step 6: Restart PM2 process
print_status "Restarting PM2 process..."
if command -v pm2 &> /dev/null; then
    # Check if process exists
    if pm2 list | grep -q "$APP_NAME"; then
        print_status "Restarting existing PM2 process..."
        pm2 restart "$APP_NAME"
    else
        print_status "Starting new PM2 process..."
        pm2 start npm --name "$APP_NAME" -- start
    fi

    # Save PM2 process list
    pm2 save

    print_status "PM2 process restarted"
else
    print_warning "PM2 not found! Please install PM2: npm install -g pm2"
    print_status "Starting application with npm start (not recommended for production)"
    npm start &
fi

# Step 7: Health check
print_status "Waiting for application to start..."
sleep 5

print_status "Running health check..."
if bash "$APP_DIR/scripts/health-check.sh"; then
    print_status "Health check passed!"
else
    print_warning "Health check failed! Please check the application logs."
fi

echo ""
echo -e "${GREEN}=== Deployment Completed Successfully ===${NC}"
echo "Application is now running in production mode"
echo ""
echo "Useful commands:"
echo "  - View logs: pm2 logs $APP_NAME"
echo "  - Check status: pm2 status"
echo "  - Monitor: pm2 monit"
echo ""
