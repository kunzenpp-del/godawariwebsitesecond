# Godawari Printing Solution - Quick Start Guide

## 🚀 Getting Started

### Step 1: Set Up Laravel Backend

```bash
# Navigate to backend folder
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env file:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=godawari_printing
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Create the database (if it doesn't exist)
mysql -u root -p -e "CREATE DATABASE godawari_printing;"

# Run migrations
php artisan migrate

# Seed the database with demo data
php artisan db:seed

# Install Filament admin panel
php artisan filament:install --panels

# Create storage symlink for uploaded files
php artisan storage:link

# Start Laravel development server
php artisan serve
```

Backend will be running at: **http://localhost:8000**

### Step 2: Access Admin Panel

Open your browser and go to:

```
http://localhost:8000/admin
```

### Step 3: Login Credentials

**Admin Access:**
- Email: `admin@godawari.com`
- Password: `password`

**Customer Access (for testing):**
- Email: `customer@godawari.com`
- Password: `password`

### Step 4: Set Up React Frontend

In a new terminal:

```bash
# Navigate to project root
cd ..

# Install Node dependencies
npm install

# Start React development server
npm run dev
```

Frontend will be running at: **http://localhost:3000**

---

## 📋 What's Included

### Admin Panel Features (FilamentPHP)

1. **Dashboard** - Overview of sales, orders, and key metrics
2. **Products Management**
   - Create, edit, delete products
   - Upload multiple images
   - Set pricing, stock, variants
   - Bulk pricing tiers
   - Categories and tags
3. **Orders Management**
   - View all orders
   - Update order status
   - Track payments
   - Print invoices
4. **Site Settings**
   - Manage site name, contact info
   - Configure social media links
   - Set shipping thresholds
   - Toggle maintenance mode
5. **Sliders** - Manage homepage hero sliders
6. **Services** - Manage service cards
7. **Categories** - Organize products
8. **Customers** - View and manage users
9. **Coupons** - Create discount codes

### API Endpoints

All API endpoints are prefixed with `/api`:

**Public Routes:**
- `GET /api/products` - List all products
- `GET /api/products/{slug}` - Get single product
- `GET /api/categories` - List categories
- `GET /api/site/settings` - Get site settings
- `GET /api/site/sliders` - Get hero sliders

**Authenticated Routes (require Sanctum token):**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/wishlist` - Get wishlist

---

## 🔧 Configuration

### CORS Setup

CORS is already configured to allow frontend requests. The configuration is in `backend/config/cors.php`:

```php
'allowed_origins' => ['http://localhost:3000', 'http://localhost:5173'],
```

### Database Setup

Make sure MySQL is running and create the database:

```bash
mysql -u root -p
CREATE DATABASE godawari_printing;
EXIT;
```

Then update `.env` with your MySQL credentials.

### Switch Frontend to Use Real API

By default, the frontend uses mock data. To connect to the Laravel backend:

1. Open `src/services/api.ts`
2. Change line 6:
   ```typescript
   export const USE_MOCK_API = false;  // Change from true to false
   ```
3. Ensure Laravel backend is running on port 8000
4. Restart the React dev server

---

## 🎯 Common Tasks

### Create a New Admin User

```bash
cd backend
php artisan make:filament-user
```

Or use tinker:

```bash
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Your Name',
    'email' => 'your@email.com',
    'password' => bcrypt('your-password'),
    'role' => 'admin',
    'email_verified_at' => now(),
]);
```

### Reset Database

```bash
php artisan migrate:fresh --seed
```

This will:
- Drop all tables
- Re-run all migrations
- Seed demo data (admin user, categories, products, etc.)

### Clear Cache

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── Filament/
│   │   └── Resources/          # Admin panel resources
│   │       ├── ProductResource.php
│   │       ├── OrderResource.php
│   │       └── SiteSettingResource.php
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/            # API controllers
│   └── Models/                 # Eloquent models
├── config/
│   └── cors.php                # CORS configuration
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
├── routes/
│   └── api.php                 # API routes
└── .env                        # Environment configuration

frontend/
├── src/
│   ├── services/               # API service layer
│   │   ├── api.ts              # Axios configuration
│   │   ├── productService.ts   # Product API calls
│   │   ├── orderService.ts     # Order API calls
│   │   ├── authService.ts      # Authentication
│   │   └── siteService.ts      # Site settings
│   ├── store/                  # Zustand stores
│   ├── pages/                  # Page components
│   └── components/             # Reusable components
```

---

## 🆘 Troubleshooting

### "Class 'Filament\...' not found"

```bash
composer dump-autoload
php artisan filament:install --panels
```

### CORS Error in Browser Console

1. Check `backend/config/cors.php` has correct origins
2. Clear config cache: `php artisan config:clear`
3. Restart Laravel server

### Database Connection Error

1. Verify MySQL is running
2. Check credentials in `.env`
3. Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### 404 on /admin

```bash
php artisan filament:install --panels
php artisan route:list | grep admin
```

### Images Not Displaying

```bash
php artisan storage:link
```

---

## 📞 Need Help?

- **Documentation**: Check `backend/DEPLOYMENT.md` for detailed deployment guide
- **Laravel Docs**: https://laravel.com/docs/11.x
- **Filament Docs**: https://filamentphp.com/docs/3.x

---

## ✅ Quick Checklist

- [ ] MySQL is running
- [ ] Database `godawari_printing` created
- [ ] `.env` configured with database credentials
- [ ] `composer install` completed
- [ ] `php artisan migrate` run successfully
- [ ] `php artisan db:seed` completed
- [ ] Laravel server running on port 8000
- [ ] Can access http://localhost:8000/admin
- [ ] Can login with admin@godawari.com / password
- [ ] React frontend running on port 3000
- [ ] CORS configured correctly

---

**Happy Coding! 🎉**
