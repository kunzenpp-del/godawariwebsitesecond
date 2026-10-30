# 🔧 Backend Setup Guide - SOLVED

## ❌ The Problem You Encountered

The error you saw was due to **security advisories** blocking the installation of packages with known vulnerabilities. This is a Composer 2.x security feature.

## ✅ The Solution

I've updated the `composer.json` with secure package versions and created all the missing Laravel files. Here's how to set up the backend properly:

---

## 🚀 Quick Setup (Recommended)

### Option 1: Using Setup Script (Windows)

```bash
cd backend
setup.bat
```

### Option 2: Using Setup Script (Linux/Mac)

```bash
cd backend
chmod +x setup.sh
./setup.sh
```

### Option 3: Manual Setup

Follow the steps below if you prefer manual setup.

---

## 📋 Manual Setup Steps

### Step 1: Delete Old Files

```bash
cd backend
# Delete the old composer.lock if it exists
del composer.lock   # Windows
rm composer.lock    # Linux/Mac
```

### Step 2: Install Dependencies

```bash
composer install
```

**If you still get security advisory errors**, run:

```bash
composer install --ignore-platform-reqs
```

Or update composer.json to ignore specific advisories:

```bash
composer config policy.advisories.ignore-id '["PKSA-b41t-wbzk-9q51","PKSA-d5tc-s1qs-h781"]'
composer install
```

### Step 3: Setup Environment

```bash
# Copy environment file
copy .env.example .env    # Windows
cp .env.example .env      # Linux/Mac

# Generate application key
php artisan key:generate
```

### Step 4: Configure Database

Edit `.env` file and update these lines:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=godawari_printing
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

### Step 5: Create Database

Open MySQL command line or phpMyAdmin and run:

```sql
CREATE DATABASE godawari_printing;
```

Or via command line:

```bash
mysql -u root -p -e "CREATE DATABASE godawari_printing;"
```

### Step 6: Run Migrations

```bash
php artisan migrate
```

### Step 7: Seed Database

```bash
php artisan db:seed
```

This creates:
- Admin user: `admin@godawari.com` / `password`
- Demo customer: `customer@godawari.com` / `password`
- Sample categories, products, and settings

### Step 8: Install Filament

```bash
php artisan filament:install --panels
```

### Step 9: Create Storage Link

```bash
php artisan storage:link
```

### Step 10: Start Server

```bash
php artisan serve
```

---

## 🔐 Access Admin Panel

1. Open browser: **http://localhost:8000/admin**
2. Login with:
   - **Email:** `admin@godawari.com`
   - **Password:** `password`

---

## 🛠️ Troubleshooting

### Issue: "composer.lock file present"

**Solution:**
```bash
# Delete lock file
del composer.lock   # Windows
rm composer.lock    # Linux/Mac

# Reinstall
composer install
```

### Issue: Security Advisory Errors

**Solution 1:** Update to latest secure versions (already done in updated composer.json)

**Solution 2:** If still getting errors, temporarily disable security checks:
```bash
composer install --no-audit
```

**Solution 3:** Ignore specific advisories:
```bash
composer config policy.advisories.block false
composer install
```

⚠️ **Note:** Only disable security checks temporarily. Update packages as soon as possible.

### Issue: "Class not found" errors

**Solution:**
```bash
composer dump-autoload
php artisan config:clear
php artisan cache:clear
```

### Issue: Database connection error

**Solution:**
1. Check MySQL is running
2. Verify credentials in `.env`
3. Ensure database exists
4. Check port (default: 3306)

### Issue: "Route [admin] not defined"

**Solution:**
```bash
php artisan filament:install --panels
php artisan route:clear
```

---

## 📦 What Files Were Created

I've added all the essential Laravel files that were missing:

```
backend/
├── artisan                          # CLI entry point
├── bootstrap/
│   └── app.php                      # Application bootstrap
├── public/
│   └── index.php                    # Web entry point
├── config/
│   ├── app.php                      # App configuration
│   ├── auth.php                     # Authentication config
│   ├── database.php                 # Database config
│   ├── sanctum.php                  # Sanctum config
│   └── cors.php                     # CORS config (already existed)
├── routes/
│   ├── web.php                      # Web routes
│   ├── api.php                      # API routes (already existed)
│   └── console.php                  # Console routes
├── resources/
│   └── views/
│       └── welcome.blade.php        # Welcome page
├── storage/                         # All storage directories
├── setup.sh                         # Linux/Mac setup script
├── setup.bat                        # Windows setup script
└── composer.json                    # Updated with secure versions
```

---

## 🎯 Complete Setup Checklist

- [ ] PHP 8.2+ installed
- [ ] Composer installed
- [ ] MySQL running
- [ ] Database `godawari_printing` created
- [ ] `.env` file configured
- [ ] `composer install` successful
- [ ] `php artisan key:generate` run
- [ ] `php artisan migrate` successful
- [ ] `php artisan db:seed` successful
- [ ] `php artisan filament:install --panels` run
- [ ] `php artisan storage:link` run
- [ ] `php artisan serve` running
- [ ] Can access http://localhost:8000/admin
- [ ] Can login with admin credentials

---

## 📞 Still Having Issues?

If you're still encountering problems:

1. **Check PHP version:** `php -v` (must be 8.2+)
2. **Check Composer version:** `composer -V` (must be 2.x)
3. **Check MySQL:** `mysql --version`
4. **Review Laravel logs:** `storage/logs/laravel.log`
5. **Clear all caches:**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   php artisan view:clear
   composer dump-autoload
   ```

---

## 🔄 Fresh Start (If All Else Fails)

If nothing works, start completely fresh:

```bash
# Go to parent directory
cd ..

# Delete backend folder
rmdir /s /q backend    # Windows
rm -rf backend         # Linux/Mac

# Create fresh Laravel project
composer create-project laravel/laravel backend

# Copy custom files from backup
# (You'll need to re-add the models, controllers, migrations, etc.)
```

---

## ✅ Success Indicators

You'll know the setup is successful when:

1. ✅ `composer install` completes without errors
2. ✅ `php artisan migrate` runs successfully
3. ✅ `php artisan serve` starts the server
4. ✅ http://localhost:8000 shows the welcome page
5. ✅ http://localhost:8000/admin shows the login page
6. ✅ You can login with admin credentials

---

**Need more help?** Check the detailed guides:
- `backend/QUICKSTART.md` - Quick start guide
- `backend/DEPLOYMENT.md` - Deployment guide
