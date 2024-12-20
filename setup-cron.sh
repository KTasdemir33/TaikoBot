#!/bin/bash

# Determine the path to Node.js
NODE_PATH=$(which node)
if [ -z "$NODE_PATH" ]; then
  echo "Node.js is not installed. Please install Node.js and try again."
  exit 1
fi

# Determine the full path to the project directory
PROJECT_PATH=$(pwd)

# Ensure the index.js file exists
if [ ! -f "$PROJECT_PATH/index.js" ]; then
  echo "index.js not found in the current directory. Please navigate to the project directory and try again."
  exit 1
fi

# Define the cron job
CRON_JOB="0 7 * * * $NODE_PATH $PROJECT_PATH/index.js"

# Check if the cron job already exists
(crontab -l 2>/dev/null | grep -Fxq "$CRON_JOB") || (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Cron job added successfully. The bot will run every day at 07:00 UTC."
