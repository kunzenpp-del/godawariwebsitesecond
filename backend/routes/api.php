<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SiteController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes - Godawari Printing Solution
|--------------------------------------------------------------------------
| Base URL: http://localhost:8000/api
| Frontend: http://localhost:3000
*/

// Public Routes
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Site Settings (Public)
Route::prefix('site')->group(function () {
    Route::get('/settings', [SiteController::class, 'getSettings']);
    Route::get('/sliders', [SiteController::class, 'getSliders']);
    Route::get('/services', [SiteController::class, 'getServices']);
    Route::post('/newsletter/subscribe', [SiteController::class, 'subscribeNewsletter']);
});

// Authentication
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    // Protected Auth Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::put('/change-password', [AuthController::class, 'changePassword']);
    });
});

// Products (Public)
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/featured', [ProductController::class, 'featured']);
    Route::get('/best-sellers', [ProductController::class, 'bestSellers']);
    Route::get('/new-arrivals', [ProductController::class, 'newArrivals']);
    Route::get('/search', [ProductController::class, 'search']);
    Route::get('/{slug}', [ProductController::class, 'show']);
    Route::get('/{slug}/related', [ProductController::class, 'related']);
    Route::get('/{slug}/reviews', [ReviewController::class, 'productReviews']);
});

// Categories (Public)
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{slug}', [CategoryController::class, 'show']);
    Route::get('/{slug}/products', [CategoryController::class, 'products']);
});

// Coupons (Public)
Route::post('/coupons/validate', [CouponController::class, 'validate']);

// Payment Webhooks (Public - called by payment gateways)
Route::prefix('payments')->group(function () {
    Route::post('/esewa/success', [PaymentController::class, 'esewaSuccess']);
    Route::post('/esewa/verify', [PaymentController::class, 'esewaVerify']);
    Route::post('/khalti/success', [PaymentController::class, 'khaltiSuccess']);
    Route::post('/khalti/verify', [PaymentController::class, 'khaltiVerify']);
});

// ==========================================
// Authenticated Routes (require Sanctum token)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {

    // Cart
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);
        Route::post('/add', [CartController::class, 'add']);
        Route::put('/update', [CartController::class, 'update']);
        Route::delete('/remove/{productId}', [CartController::class, 'remove']);
        Route::delete('/clear', [CartController::class, 'clear']);
        Route::post('/apply-coupon', [CartController::class, 'applyCoupon']);
        Route::delete('/remove-coupon', [CartController::class, 'removeCoupon']);
    });

    // Wishlist
    Route::prefix('wishlist')->group(function () {
        Route::get('/', [WishlistController::class, 'index']);
        Route::post('/toggle/{productId}', [WishlistController::class, 'toggle']);
        Route::delete('/clear', [WishlistController::class, 'clear']);
    });

    // Orders
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::post('/', [OrderController::class, 'store']);
        Route::get('/{orderNumber}', [OrderController::class, 'show']);
        Route::get('/{orderNumber}/invoice', [OrderController::class, 'invoice']);
        Route::post('/{orderNumber}/cancel', [OrderController::class, 'cancel']);
    });

    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store']);

    // Addresses
    Route::prefix('addresses')->group(function () {
        Route::get('/', [OrderController::class, 'addresses']);
        Route::post('/', [OrderController::class, 'storeAddress']);
        Route::put('/{id}', [OrderController::class, 'updateAddress']);
        Route::delete('/{id}', [OrderController::class, 'destroyAddress']);
    });
});
