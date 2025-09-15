#!/usr/bin/env bash
set -o errexit

# Suppression de la migration automatique pour éviter l'erreur de connexion à la base de données
# php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

php artisan serve --host=0.0.0.0 --port=$PORT
