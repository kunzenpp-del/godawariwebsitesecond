<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Models\Slider;
use App\Models\Service;
use App\Models\Coupon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Admin',
            'email' => 'admin@godawari.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create Demo Customer
        User::create([
            'name' => 'Demo Customer',
            'email' => 'customer@godawari.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'email_verified_at' => now(),
            'phone' => '+977-9841234567',
        ]);

        // Create Categories
        $categories = [
            ['name' => 'Business Cards', 'slug' => 'business-cards', 'icon' => '💳'],
            ['name' => 'Banners & Flex', 'slug' => 'banners-flex', 'icon' => '🏳️'],
            ['name' => 'Brochures & Flyers', 'slug' => 'brochures-flyers', 'icon' => '📄'],
            ['name' => 'Stickers & Labels', 'slug' => 'stickers-labels', 'icon' => '🏷️'],
            ['name' => 'Packaging', 'slug' => 'packaging', 'icon' => '📦'],
            ['name' => 'Stationery', 'slug' => 'stationery', 'icon' => '✏️'],
            ['name' => 'Wedding & Events', 'slug' => 'wedding-events', 'icon' => '💒'],
            ['name' => 'Signage', 'slug' => 'signage', 'icon' => '🪧'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Create Site Settings
        $settings = [
            ['key' => 'site_name', 'value' => 'Godawari Printing Solution', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_tagline', 'value' => 'Premium Quality Printing in Nepal', 'type' => 'text', 'group' => 'general'],
            ['key' => 'contact_phone', 'value' => '+977-01-5555555', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_email', 'value' => 'info@godawariprinting.com', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_address', 'value' => 'Godawari-12, Lalitpur, Nepal', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/godawariprinting', 'type' => 'text', 'group' => 'social'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/godawariprinting', 'type' => 'text', 'group' => 'social'],
            ['key' => 'free_shipping_threshold', 'value' => '2000', 'type' => 'integer', 'group' => 'general'],
            ['key' => 'maintenance_mode', 'value' => '0', 'type' => 'boolean', 'group' => 'general'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }

        // Create Sliders
        Slider::create([
            'title' => 'Premium Printing Solutions',
            'subtitle' => 'Transform your brand with our high-quality printing services',
            'image' => 'sliders/hero-1.jpg',
            'cta_text' => 'Shop Now',
            'cta_link' => '/products',
            'order' => 1,
        ]);

        // Create Services
        $services = [
            ['title' => 'Digital Printing', 'description' => 'High-quality digital prints for short runs', 'icon' => '🖨️', 'order' => 1],
            ['title' => 'Offset Printing', 'description' => 'Cost-effective for large volume orders', 'icon' => '🎨', 'order' => 2],
            ['title' => 'Special Finishes', 'description' => 'Gold foil, embossing, spot UV, die-cutting', 'icon' => '✨', 'order' => 3],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        // Create Coupons
        Coupon::create([
            'code' => 'WELCOME10',
            'type' => 'percentage',
            'value' => 10,
            'min_order_amount' => 500,
            'expires_at' => now()->addYear(),
        ]);

        Coupon::create([
            'code' => 'PRINT200',
            'type' => 'fixed',
            'value' => 200,
            'min_order_amount' => 1000,
            'expires_at' => now()->addYear(),
        ]);

        Coupon::create([
            'code' => 'BULK15',
            'type' => 'percentage',
            'value' => 15,
            'min_order_amount' => 2000,
            'expires_at' => now()->addYear(),
        ]);
    }
}
