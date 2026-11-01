#!/bin/bash

# Godawari Printing Solution - Backend Setup Script
# This script sets up the Laravel backend from scratch

echo "🚀 Setting up Godawari Printing Solution Backend..."
echo ""

# Check if composer is installed
if ! command -v composer &> /dev/null; then
    echo "❌ Composer is not installed. Please install Composer first:"
    echo "   https://getcomposer.org/download/"
    exit 1
fi

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP 8.2 or higher first."
    exit 1
fi

# Check PHP version
PHP_VERSION=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
REQUIRED_VERSION="8.2"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$PHP_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ PHP version $PHP_VERSION is too old. PHP $REQUIRED_VERSION or higher is required."
    exit 1
fi

echo "✓ PHP $PHP_VERSION detected"
echo "✓ Composer detected"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing Composer dependencies..."
composer install --no-interaction --prefer-dist

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

# Step 2: Setup environment
echo "🔧 Step 2: Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    php artisan key:generate
    echo "✓ Environment file created and key generated"
else
    echo "⚠ .env file already exists, skipping..."
fi
echo ""

# Step 3: Database setup
echo "🗄️  Step 3: Database setup..."
echo "Please ensure your database is configured in .env file:"
echo "  DB_CONNECTION=mysql"
echo "  DB_HOST=127.0.0.1"
echo "  DB_PORT=3306"
echo "  DB_DATABASE=godawari_printing"
echo "  DB_USERNAME=root"
echo "  DB_PASSWORD=your_password"
echo ""
read -p "Have you created the database and configured .env? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Run migrations
    echo "Running migrations..."
    php artisan migrate --force
    
    if [ $? -ne 0 ]; then
        echo "❌ Migration failed. Please check your database configuration."
        exit 1
    fi
    echo "✓ Migrations completed"
    
    # Seed database
    echo "Seeding database with demo data..."
    php artisan db:seed --force
    echo "✓ Database seeded"
else
    echo "⚠ Skipping database setup. You can run migrations later with:"
    echo "   php artisan migrate"
    echo "   php artisan db:seed"
fi
echo ""

# Step 4: Install Filament
echo "🎨 Step 4: Installing Filament admin panel..."
php artisan filament:install --panels --no-interaction
echo "✓ Filament installed"
echo ""

# Step 5: Create storage link
echo "🔗 Step 5: Creating storage link..."
php artisan storage:link
echo "✓ Storage link created"
echo ""

# Step 6: Clear caches
echo "🧹 Step 6: Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
echo "✓ Caches cleared"
echo ""

# Success message
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup completed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next steps:"
echo "   1. Start the Laravel server:"
echo "      php artisan serve"
echo ""
echo "   2. Access the admin panel:"
echo "      http://localhost:8000/admin"
echo ""
echo "   3. Login credentials:"
echo "      Email: admin@godawari.com"
echo "      Password: password"
echo ""
echo "   4. API endpoints:"
echo "      http://localhost:8000/api/products"
echo "      http://localhost:8000/api/categories"
echo ""
echo "📚 For more information, see:"
echo "   - backend/QUICKSTART.md"
echo "   - backend/DEPLOYMENT.md"
echo ""
echo "🎉 Happy coding!"
