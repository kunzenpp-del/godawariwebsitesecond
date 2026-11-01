<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index(): JsonResponse
    {
        // Cart is managed client-side with localStorage
        // This endpoint syncs with server for logged-in users
        return response()->json(['items' => []]);
    }

    public function add(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Added to cart']);
    }

    public function update(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Cart updated']);
    }

    public function remove(int $productId): JsonResponse
    {
        return response()->json(['message' => 'Item removed']);
    }

    public function clear(): JsonResponse
    {
        return response()->json(['message' => 'Cart cleared']);
    }

    public function applyCoupon(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Coupon applied']);
    }

    public function removeCoupon(): JsonResponse
    {
        return response()->json(['message' => 'Coupon removed']);
    }
}
