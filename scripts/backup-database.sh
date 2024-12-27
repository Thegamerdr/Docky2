#!/bin/bash

# Set variables
DB_NAME="perfume_marketplace"
BACKUP_DIR="/path/to/backup/directory"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Perform backup
pg_dump $DB_NAME > $BACKUP_DIR/backup_$TIMESTAMP.sql

# Keep only the last 7 backups
find $BACKUP_DIR -name "backup_*.sql" -type f -mtime +7 -delete

