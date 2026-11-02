<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Models\Slider;
use App\Models\Service;
use App\Models\Coupon;
use App\Models\AboutUs;
use App\Models\ContactInfo;
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

        // Create About Us sections
        $aboutSections = [
            [
                'section_key' => 'hero',
                'title' => 'About Godawari Printing Solution',
                'content' => '<p>Your trusted partner for premium printing services in Nepal since 2010. We combine cutting-edge technology with traditional craftsmanship to deliver exceptional quality prints.</p>',
                'metadata' => ['established' => '2010', 'employees' => '50+', 'clients' => '5000+'],
                'order' => 1,
            ],
            [
                'section_key' => 'story',
                'title' => 'Our Story',
                'content' => '<p>Founded in 2010 in the heart of Godawari, Lalitpur, we started as a small printing shop with a big vision. Over the years, we have grown into one of Nepal\'s leading printing solutions providers, serving thousands of satisfied customers across the country.</p><p>Our journey has been marked by continuous innovation, quality improvement, and customer satisfaction. Today, we operate state-of-the-art printing facilities equipped with the latest technology to meet all your printing needs.</p>',
                'order' => 2,
            ],
            [
                'section_key' => 'mission',
                'title' => 'Our Mission',
                'content' => '<p>To provide high-quality, affordable printing solutions that help businesses and individuals communicate effectively. We strive to exceed customer expectations through innovation, reliability, and exceptional service.</p>',
                'order' => 3,
            ],
            [
                'section_key' => 'vision',
                'title' => 'Our Vision',
                'content' => '<p>To be Nepal\'s most trusted and innovative printing company, setting industry standards for quality, sustainability, and customer service.</p>',
                'order' => 4,
            ],
            [
                'section_key' => 'values',
                'title' => 'Our Core Values',
                'content' => '<p>Quality, Innovation, Integrity, Customer Focus, Sustainability</p>',
                'metadata' => [
                    'quality' => 'We never compromise on quality',
                    'innovation' => 'Embracing new technologies and methods',
                    'integrity' => 'Honest and transparent business practices',
                    'customer_focus' => 'Customer satisfaction is our priority',
                    'sustainability' => 'Environmentally responsible printing',
                ],
                'order' => 5,
            ],
            [
                'section_key' => 'why_choose_us',
                'title' => 'Why Choose Us',
                'content' => '<ul><li>State-of-the-art printing equipment</li><li>Experienced and skilled team</li><li>Competitive pricing</li><li>Fast turnaround time</li><li>Free design support</li><li>Nationwide delivery</li><li>100% satisfaction guarantee</li></ul>',
                'order' => 6,
            ],
        ];

        foreach ($aboutSections as $section) {
            AboutUs::create($section);
        }

        // Create Contact Info
        $contactItems = [
            ['type' => 'phone', 'label' => 'Main Office', 'value' => '+977-01-5555555', 'icon' => 'phone', 'link' => 'tel:+977015555555', 'order' => 1],
            ['type' => 'phone', 'label' => 'Mobile', 'value' => '+977-9841234567', 'icon' => 'smartphone', 'link' => 'tel:+9779841234567', 'order' => 2],
            ['type' => 'email', 'label' => 'General Inquiry', 'value' => 'info@godawariprinting.com', 'icon' => 'mail', 'link' => 'mailto:info@godawariprinting.com', 'order' => 3],
            ['type' => 'email', 'label' => 'Sales', 'value' => 'sales@godawariprinting.com', 'icon' => 'mail', 'link' => 'mailto:sales@godawariprinting.com', 'order' => 4],
            ['type' => 'address', 'label' => 'Main Office', 'value' => 'Godawari-12, Lalitpur, Nepal', 'icon' => 'map-pin', 'order' => 5],
            ['type' => 'working_hours', 'label' => 'Sunday - Friday', 'value' => '9:00 AM - 6:00 PM', 'icon' => 'clock', 'order' => 6],
            ['type' => 'working_hours', 'label' => 'Saturday', 'value' => '10:00 AM - 4:00 PM', 'icon' => 'clock', 'order' => 7],
            ['type' => 'social', 'label' => 'Facebook', 'value' => 'facebook.com/godawariprinting', 'icon' => 'facebook', 'link' => 'https://facebook.com/godawariprinting', 'order' => 8],
            ['type' => 'social', 'label' => 'Instagram', 'value' => 'instagram.com/godawariprinting', 'icon' => 'instagram', 'link' => 'https://instagram.com/godawariprinting', 'order' => 9],
        ];

        foreach ($contactItems as $item) {
            ContactInfo::create($item);
        }
    }
}
