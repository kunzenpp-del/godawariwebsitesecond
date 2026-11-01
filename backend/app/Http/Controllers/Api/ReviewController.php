<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function productReviews(string $slug): JsonResponse
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        $reviews = $product->reviews()->with('user')->latest()->paginate(10);
        return response()->json($reviews);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $review = Review::create([
            'product_id' => $request->product_id,
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_approved' => false,
        ]);

        // Update product rating
        $product = Product::find($request->product_id);
        $avgRating = $product->reviews()->where('is_approved', true)->avg('rating');
        $product->update([
            'rating' => round($avgRating, 2),
            'review_count' => $product->reviews()->where('is_approved', true)->count(),
        ]);

        return response()->json($review, 201);
    }
}
