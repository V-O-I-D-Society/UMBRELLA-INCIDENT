#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build completed successfully!"
  
  # Check if Netlify CLI is installed
  if ! command -v netlify &> /dev/null; then
    echo "Netlify CLI is not installed. Installing..."
    npm install -g netlify-cli
  fi
  
  # Deploy to Netlify
  echo "Deploying to Netlify..."
  netlify deploy --prod --dir=dist
  
  echo "Deployment process completed!"
else
  echo "Build failed. Fix the issues before deploying."
  exit 1
fi