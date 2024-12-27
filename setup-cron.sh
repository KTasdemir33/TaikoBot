#!/bin/bash

# Node.js yolunu belirleyin
NODE_PATH=$(which node)
if [ -z "$NODE_PATH" ]; then
  echo "Node.js is not installed. Please install Node.js and try again."
  exit 1
fi

# Proje dizinine gidin
PROJECT_PATH=$(pwd)

# index.js dosyasının varlığını kontrol edin
if [ ! -f "$PROJECT_PATH/index.js" ]; then
  echo "index.js not found in the current directory. Please navigate to the project directory and try again."
  exit 1
fi

# Cron job'u ekleyin (çevresel değişkenlerin yüklendiğinden emin olun)
CRON_JOB="07 15 * * * cd $PROJECT_PATH && . /etc/profile && . ~/.bashrc && env $(cat .env) $NODE_PATH $PROJECT_PATH/index.js >> $PROJECT_PATH/cron.log 2>&1"
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Cron job added successfully. The bot will run every day at 12:45 PM UTC."
