# Utiliser l'image PHP officielle avec Apache
FROM php:8.2-apache

# Installer les extensions PHP nécessaires pour Laravel
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copier le projet dans le container
COPY . /var/www/html

# Définir le dossier de travail
WORKDIR /var/www/html

# Donner les droits sur storage et bootstrap/cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Exposer le port
EXPOSE 8080

# Commande par défaut
CMD ["bash", "start.sh"]
