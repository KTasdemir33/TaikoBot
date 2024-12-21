#!/bin/bash

# Node.js yolunu belirleme
NODE_PATH=$(which node)
if [ -z "$NODE_PATH" ]; then
  echo "Node.js is not installed. Please install Node.js and try again."
  exit 1
fi

# Proje dizininin tam yolunu belirleme
PROJECT_PATH=$(pwd)

# index.js dosyasının mevcut olup olmadığını kontrol etme
if [ ! -f "$PROJECT_PATH/index.js" ]; then
  echo "index.js not found in the current directory. Please navigate to the project directory and try again."
  exit 1
fi

# Rastgele bir saat ve dakika belirleme (08:00 - 09:30 arası)
HOUR=$((8 + RANDOM % 2)) # 08 veya 09
MINUTE=$((RANDOM % 60)) # 00-59

if [ "$HOUR" -eq 9 ] && [ "$MINUTE" -gt 30 ]; then
  MINUTE=$((RANDOM % 31)) # 09:00-09:30
fi

# Cron job'u tanımlama
CRON_JOB="$MINUTE $HOUR * * * $NODE_PATH $PROJECT_PATH/index.js"

# Önceki cron job'u kaldırma
(crontab -l | grep -v "$NODE_PATH $PROJECT_PATH/index.js") | crontab -

# Yeni cron job'u ekleme
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Cron job added successfully. The bot will run every day at a random time between 08:00 and 09:30 UTC."
