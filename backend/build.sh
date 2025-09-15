#!/bin/bash
set -e

cd /var/www/html

# Installer les dépendances Laravel
composer install --no-dev --optimize-autoloader

# Générer la clé si nécessaire
php artisan key:generate

# Mettre en cache config/routes/views
php artisan config:cache
php artisan route:cache
php artisan view:cache
