# Utiliser l'image PHP officielle avec Apache
FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Installer les extensions PHP nécessaires pour Laravel
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip

# Configurer Apache pour Laravel
RUN a2enmod rewrite \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf \
    && sed -i 's|<Directory /var/www/html>|<Directory /var/www/html/public>|' /etc/apache2/sites-available/000-default.conf \
    && sed -i 's|DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm|DirectoryIndex index.php index.html|' /etc/apache2/sites-available/000-default.conf

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copier le projet dans le container
COPY . /var/www/html

# Définir le dossier de travail
WORKDIR /var/www/html

# Installer les dépendances Laravel
RUN composer install --no-dev --optimize-autoloader

# Copier le fichier .env.example vers .env si nécessaire
RUN cp .env.example .env || true

# Créer la base de données SQLite si elle n'existe pas
RUN touch database/database.sqlite

# Générer la clé si nécessaire (seulement si APP_KEY n'est pas défini)
RUN php artisan key:generate --force

# Exécuter les migrations
RUN php artisan migrate --force

# Mettre en cache config/routes/views
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Donner les droits sur storage, bootstrap/cache et database
RUN chown -R www-data:www-data storage bootstrap/cache database

# Exposer le port
EXPOSE 8080

# Commande par défaut
CMD ["bash", "start.sh"]