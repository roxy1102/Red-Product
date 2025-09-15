FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Copy backend application code
COPY backend /var/www/html

# Copy start script
COPY backend/start.sh /var/www/html/start.sh

# Make start script executable
RUN chmod +x /var/www/html/start.sh

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Start the application
CMD ["/var/www/html/start.sh"]
