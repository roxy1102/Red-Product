#!/usr/bin/env bash
set -o errexit

composer install --no-dev --optimize-autoloader
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Créer la base de données SQLite si elle n'existe pas
touch database/database.sqlite
chmod 664 database/database.sqlite
