# 🖨️ Godawari Printing Solution - Backend API

Laravel 11 backend for the Godawari Printing Solution e-commerce platform.

## 📋 Requirements

- **PHP** >= 8.2
- **Composer** >= 2.x
- **MySQL** >= 8.0
- **Node.js** >= 18.x (for frontend)

## 🚀 Quick Start

### Windows Users

```bash
cd backend
setup.bat
```

### Linux/Mac Users

```bash
cd backend
chmod +x setup.sh
./setup.sh
```

### Manual Setup

```bash
# 1. Install dependencies
composer install

# 2. Setup environment
cp .env.example .env
php artisan key:generate

# 3. Configure database in .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=godawari_printing
# DB_USERNAME=root
# DB_PASSWORD=your_password

# 4. Create database
mysql -u root -p -e "CREATE DATABASE godawari_printing;"

# 5. Run migrations
php artisan migrate

# 6. Seed database
php artisan db:seed

# 7. Install Filament
php artisan filament:install --panels

# 8. Create storage link
php artisan storage:link

# 9. Start server
php artisan serve
```

## 🔐 Default Credentials

**Admin:**
- Email: `admin@godawari.com`
- Password: `password`

**Customer:**
- Email: `customer@godawari.com`
- Password: `password`

## 📡 API Endpoints

Base URL: `http://localhost:8000/api`

### Public Routes

```
GET    /api/products              # List all products
GET    /api/products/{slug}       # Get single product
GET    /api/products/featured     # Featured products
GET    /api/products/best-sellers # Best sellers
GET    /api/products/new-arrivals # New arrivals
GET    /api/products/search       # Search products
GET    /api/categories            # List categories
GET    /api/categories/{slug}     # Get category
GET    /api/site/settings         # Site settings
GET    /api/site/sliders          # Hero sliders
GET    /api/site/services         # Services
POST   /api/site/newsletter/subscribe  # Newsletter subscription
POST   /api/coupons/validate      # Validate coupon
```

### Authentication Routes

```
POST   /api/auth/register         # Register
POST   /api/auth/login            # Login
POST   /api/auth/logout           # Logout (auth required)
GET    /api/auth/me               # Get current user (auth required)
PUT    /api/auth/profile          # Update profile (auth required)
PUT    /api/auth/change-password  # Change password (auth required)
```

### Protected Routes (Require Authentication)

```
GET    /api/orders                # List user's orders
POST   /api/orders                # Create order
GET    /api/orders/{number}       # Get order details
POST   /api/orders/{number}/cancel # Cancel order
GET    /api/orders/{number}/invoice # Download invoice
GET    /api/wishlist              # Get wishlist
POST   /api/wishlist/toggle/{id}  # Toggle wishlist item
GET    /api/addresses             # Get addresses
POST   /api/addresses             # Create address
PUT    /api/addresses/{id}        # Update address
DELETE /api/addresses/{id}        # Delete address
POST   /api/reviews               # Create review
```

## 🎨 Admin Panel

Access the Filament admin panel at: `http://localhost:8000/admin`

### Admin Features

- **Dashboard** - Sales overview, recent orders, low stock alerts
- **Products** - CRUD operations, image management, bulk pricing
- **Orders** - Order management, status updates, invoice generation
- **Categories** - Category management with nested structure
- **Customers** - User management, order history
- **Site Settings** - Dynamic site configuration
- **Sliders** - Homepage hero slider management
- **Services** - Service cards management
- **Coupons** - Discount code management

## 🗄️ Database Schema

### Main Tables

- `users` - Customer and admin accounts
- `categories` - Product categories (nested)
- `products` - Product catalog
- `product_images` - Product image gallery
- `orders` - Customer orders
- `order_items` - Order line items
- `reviews` - Product reviews
- `coupons` - Discount coupons
- `wishlists` - User wishlists
- `addresses` - Customer addresses
- `site_settings` - Dynamic site configuration
- `sliders` - Homepage sliders
- `services` - Service cards
- `newsletter_subscribers` - Newsletter subscriptions
- `audit_logs` - Admin action logs

## 💳 Payment Integration

### Supported Methods

1. **Cash on Delivery (COD)**
2. **eSewa** - Nepali digital wallet
3. **Khalti** - Nepali digital wallet
4. **Bank Transfer** - Direct bank transfer

### Configuration

Add to `.env`:

```env
# eSewa
ESEWA_MERCHANT_ID=your_merchant_id
ESEWA_SECRET_KEY=your_secret_key

# Khalti
KHALTI_PUBLIC_KEY=your_public_key
KHALTI_SECRET_KEY=your_secret_key
```

## 🔒 Security Features

- Laravel Sanctum API authentication
- CSRF protection
- SQL injection prevention
- XSS protection
- Rate limiting
- Password hashing (bcrypt)
- Input validation
- CORS configuration

## 📦 Key Packages

- **Laravel Framework** ^11.44
- **Laravel Sanctum** ^4.0 - API authentication
- **FilamentPHP** ^3.3 - Admin panel
- **Spatie Media Library** ^11.0 - Image management
- **Intervention Image** ^3.0 - Image processing
- **Maatwebsite Excel** ^3.1 - CSV import/export
- **Barryvdh DomPDF** ^3.0 - PDF generation
- **Laravel Scout** ^10.0 - Full-text search

## 🛠️ Development

### Common Commands

```bash
# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Reset database
php artisan migrate:fresh --seed

# Create admin user
php artisan make:filament-user

# Generate API documentation
php artisan route:list --path=api

# Run queue worker
php artisan queue:work

# Monitor queue
php artisan queue:monitor
```

### Testing

```bash
# Run tests
php artisan test

# Run specific test
php artisan test --filter=ProductTest
```

## 🌐 CORS Configuration

CORS is configured in `config/cors.php` to allow:

- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)

For production, update the `allowed_origins` array.

## 📁 Project Structure

```
backend/
├── app/
│   ├── Filament/
│   │   └── Resources/          # Admin panel resources
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/            # API controllers
│   └── Models/                 # Eloquent models
├── config/                     # Configuration files
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
├── routes/
│   ├── api.php                 # API routes
│   └── web.php                 # Web routes
├── storage/                    # File storage
├── .env.example                # Environment template
├── composer.json               # PHP dependencies
└── README.md                   # This file
```

## 🐛 Troubleshooting

### Security Advisory Errors

```bash
# Update to latest secure versions
composer update

# Or temporarily ignore advisories
composer install --no-audit
```

### Database Connection Error

1. Check MySQL is running
2. Verify credentials in `.env`
3. Ensure database exists
4. Check port (default: 3306)

### Admin Panel Not Accessible

```bash
php artisan filament:install --panels
php artisan route:clear
php artisan config:clear
```

### Images Not Displaying

```bash
php artisan storage:link
```

## 📚 Documentation

- **Quick Start**: `QUICKSTART.md`
- **Setup Guide**: `SETUP_GUIDE.md`
- **Deployment**: `DEPLOYMENT.md`
- **Laravel Docs**: https://laravel.com/docs/11.x
- **Filament Docs**: https://filamentphp.com/docs/3.x

## 🤝 Support

For issues and questions:
- Email: support@godawariprinting.com
- Phone: +977-01-5555555

## 📄 License

This project is proprietary software for Godawari Printing Solution.

---

**Built with ❤️ using Laravel 11 + FilamentPHP**
