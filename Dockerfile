# 1. Base image with PHP 8.4 and extensions
FROM php:8.4-fpm

# 2. Set working directory
WORKDIR /var/www/html

# 3. Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 4. Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd

# 5. Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 6. Copy project files
COPY . .

# 7. Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# 8. Set permissions for Laravel storage & cache
RUN chown -R www-data:www-data storage bootstrap/cache

# 9. Expose port 9000 and start PHP-FPM
EXPOSE 9000
CMD ["php-fpm"]
