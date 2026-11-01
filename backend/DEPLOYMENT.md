# Godawari Printing Solution - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- MySQL 8.0+
- Node.js 18+
- Redis (optional, for caching)

### Backend Setup (Laravel)

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=godawari_printing
DB_USERNAME=root
DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Seed database
php artisan php artisan db:seed

# Install Filament
php artisan filament:install --panels

# Create storage link
php artisan storage:link

# Start development server
php artisan serve
```

Backend will be running at: `http://localhost:8000`

### Frontend Setup (React)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be running at: `http://localhost:3000`

## 🔗 Connecting Frontend to Backend

### Option 1: Use Mock Data (Default)
The frontend currently uses mock data. To switch to real API:

1. Open `src/services/api.ts`
2. Change `USE_MOCK_API` from `true` to `false`
3. Ensure Laravel backend is running on port 8000

### Option 2: Configure API URL
Edit `src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

## 🌐 CORS Configuration

CORS is already configured in `backend/config/cors.php` to allow:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)

For production, update the `allowed_origins` array in `cors.php`.

## 🔐 Authentication

### Admin Access
- Email: `admin@godawari.com`
- Password: `password`

### Customer Access
- Email: `customer@godawari.com`
- Password: `password`

## 📦 Production Deployment

### Backend (Laravel)

```bash
# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# Set up queue worker
php artisan queue:work --daemon

# Set up scheduler (cron)
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

### Frontend (React)

```bash
# Build for production
npm run build

# Deploy dist/ folder to your web server
```

### Environment Variables for Production

Create `.env.production` in frontend root:

```env
VITE_API_URL=https://api.godawariprinting.com/api
```

## 💳 Payment Gateway Setup

### eSewa
1. Register at https://developer.esewa.com.np
2. Get Merchant ID and Secret Key
3. Add to `.env`:
```env
ESEWA_MERCHANT_ID=your_merchant_id
ESEWA_SECRET_KEY=your_secret_key
```

### Khalti
1. Register at https://khalti.com/#/merchant
2. Get Public Key and Secret Key
3. Add to `.env`:
```env
KHALTI_PUBLIC_KEY=your_public_key
KHALTI_SECRET_KEY=your_secret_key
```

## 📧 Email Configuration

Update `.env` with your SMTP credentials:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@godawariprinting.com
MAIL_FROM_NAME="Godawari Printing Solution"
```

## 🗄️ Database Optimization

### Create Indexes
```sql
-- Already included in migrations, but verify:
CREATE INDEX idx_products_category ON products(category_id, is_active);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_orders_created ON orders(created_at);
```

### Enable Query Caching
In `config/database.php`, ensure Redis is configured for caching.

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Set `APP_DEBUG=false` in production
- [ ] Set `APP_ENV=production`
- [ ] Enable HTTPS
- [ ] Configure rate limiting
- [ ] Set up firewall rules
- [ ] Regular database backups
- [ ] Keep Laravel and dependencies updated

## 📊 Monitoring & Logs

```bash
# View Laravel logs
tail -f storage/logs/laravel.log

# Monitor queue
php artisan queue:monitor

# Check application health
php artisan about
```

## 🆘 Troubleshooting

### CORS Errors
Ensure frontend URL is in `backend/config/cors.php` `allowed_origins`

### 401 Unauthorized
Check Sanctum token is being sent in Authorization header:
```
Authorization: Bearer {token}
```

### Images Not Loading
Run: `php artisan storage:link`

### Cache Issues
Clear all caches:
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

## 📞 Support

For technical support, contact:
- Email: support@godawariprinting.com
- Phone: +977-01-5555555

---

**Built with ❤️ for Godawari Printing Solution**
