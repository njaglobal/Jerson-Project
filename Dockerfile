# 1. Base PHP image with extensions
FROM php:8.2-fpm

# 2. Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libonig-dev libpng-dev libjpeg-dev libfreetype6-dev \
    mariadb-client curl npm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# 4. Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 5. Set working directory
WORKDIR /var/www

# 6. Copy project files
COPY . .

# 7. Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# 8. Set permissions for Laravel storage & cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# 9. Expose port (Render provides PORT environment variable)
EXPOSE 10000

# 10. Set entrypoint to serve Laravel
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
