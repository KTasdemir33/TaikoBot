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

# Create a directory for cron job scripts if it doesn't exist
mkdir -p $PROJECT_PATH/cron_jobs

# Create a script that will run our main script at a random time
RANDOM_SCRIPT="$PROJECT_PATH/cron_jobs/random_run.sh"
cat << EOF > "$RANDOM_SCRIPT"
#!/bin/bash
RANDOM_SECOND=\$((\$RANDOM % 60))
sleep \$RANDOM_SECOND
$NODE_PATH $PROJECT_PATH/index.js
EOF

# Make the random script executable
chmod +x "$RANDOM_SCRIPT"

# Add the cron job
CRON_JOB="15 6 * * * cd $PROJECT_PATH && run-parts cron_jobs"
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Cron job added successfully. The bot will run every day at 06:15 UTC with a random second delay."
