#!/bin/bash
set -e

cd /var/www/html

# Démarrer Apache (inclus dans l'image PHP)
apache2-foreground
