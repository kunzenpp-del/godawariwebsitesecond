<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function index(): JsonResponse
    {
        $wishlist = Auth::user()->wishlists()->with('category')->paginate(12);
        return response()->json($wishlist);
    }

    public function toggle(int $productId): JsonResponse
    {
        $product = Product::findOrFail($productId);
        $user = Auth::user();

        if ($user->wishlists()->where('product_id', $productId)->exists()) {
            $user->wishlists()->detach($productId);
            return response()->json(['message' => 'Removed from wishlist', 'in_wishlist' => false]);
        }

        $user->wishlists()->attach($productId);
        return response()->json(['message' => 'Added to wishlist', 'in_wishlist' => true]);
    }

    public function clear(): JsonResponse
    {
        Auth::user()->wishlists()->detach();
        return response()->json(['message' => 'Wishlist cleared']);
    }
}
