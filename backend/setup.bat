@echo off
REM Godawari Printing Solution - Backend Setup Script for Windows
REM This script sets up the Laravel backend from scratch

echo.
echo 🚀 Setting up Godawari Printing Solution Backend...
echo.

REM Check if composer is installed
where composer >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Composer is not installed. Please install Composer first:
    echo    https://getcomposer.org/download/
    pause
    exit /b 1
)

REM Check if PHP is installed
where php >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PHP is not installed. Please install PHP 8.2 or higher first.
    pause
    exit /b 1
)

echo ✓ PHP detected
echo ✓ Composer detected
echo.

REM Step 1: Install dependencies
echo 📦 Step 1: Installing Composer dependencies...
call composer install --no-interaction --prefer-dist

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Step 2: Setup environment
echo 🔧 Step 2: Setting up environment...
if not exist .env (
    copy .env.example .env >nul
    call php artisan key:generate
    echo ✓ Environment file created and key generated
) else (
    echo ⚠ .env file already exists, skipping...
)
echo.

REM Step 3: Database setup
echo 🗄️  Step 3: Database setup...
echo Please ensure your database is configured in .env file:
echo   DB_CONNECTION=mysql
echo   DB_HOST=127.0.0.1
echo   DB_PORT=3306
echo   DB_DATABASE=godawari_printing
echo   DB_USERNAME=root
echo   DB_PASSWORD=your_password
echo.
set /p CONFIRM="Have you created the database and configured .env? (y/n) "

if /i "%CONFIRM%"=="y" (
    REM Run migrations
    echo Running migrations...
    call php artisan migrate --force
    
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Migration failed. Please check your database configuration.
        pause
        exit /b 1
    )
    echo ✓ Migrations completed
    
    REM Seed database
    echo Seeding database with demo data...
    call php artisan db:seed --force
    echo ✓ Database seeded
) else (
    echo ⚠ Skipping database setup. You can run migrations later with:
    echo    php artisan migrate
    echo    php artisan db:seed
)
echo.

REM Step 4: Install Filament
echo 🎨 Step 4: Installing Filament admin panel...
call php artisan filament:install --panels --no-interaction
echo ✓ Filament installed
echo.

REM Step 5: Create storage link
echo 🔗 Step 5: Creating storage link...
call php artisan storage:link
echo ✓ Storage link created
echo.

REM Step 6: Clear caches
echo 🧹 Step 6: Clearing caches...
call php artisan config:clear
call php artisan cache:clear
call php artisan route:clear
call php artisan view:clear
echo ✓ Caches cleared
echo.

REM Success message
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ Setup completed successfully!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📋 Next steps:
echo    1. Start the Laravel server:
echo       php artisan serve
echo.
echo    2. Access the admin panel:
echo       http://localhost:8000/admin
echo.
echo    3. Login credentials:
echo       Email: admin@godawari.com
echo       Password: password
echo.
echo    4. API endpoints:
echo       http://localhost:8000/api/products
echo       http://localhost:8000/api/categories
echo.
echo 📚 For more information, see:
echo    - backend\QUICKSTART.md
echo    - backend\DEPLOYMENT.md
echo.
echo 🎉 Happy coding!
pause
