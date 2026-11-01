<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['category', 'reviews'])->active();

        // Filters
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%");
            });
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->boolean('new')) {
            $query->newArrivals();
        }

        if ($request->boolean('bestseller')) {
            $query->bestSellers();
        }

        if ($request->boolean('sale')) {
            $query->onSale();
        }

        // Sorting
        $sort = $request->get('sort', 'popularity');
        switch ($sort) {
            case 'price-low':
                $query->orderBy('price', 'asc');
                break;
            case 'price-high':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'discount':
                $query->orderByRaw('(original_price - price) / original_price DESC');
                break;
            default: // popularity
                $query->orderBy('review_count', 'desc');
        }

        $products = $query->paginate($request->get('per_page', 12));

        return response()->json($products);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Cache::remember("product.{$slug}", 3600, function () use ($slug) {
            return Product::with(['category', 'reviews.user'])
                ->where('slug', $slug)
                ->where('is_active', true)
                ->firstOrFail();
        });

        return response()->json($product);
    }

    public function featured(): JsonResponse
    {
        $products = Cache::remember('products.featured', 3600, function () {
            return Product::with('category')
                ->active()
                ->featured()
                ->limit(8)
                ->get();
        });

        return response()->json($products);
    }

    public function bestSellers(): JsonResponse
    {
        $products = Cache::remember('products.bestsellers', 3600, function () {
            return Product::with('category')
                ->active()
                ->bestSellers()
                ->limit(8)
                ->get();
        });

        return response()->json($products);
    }

    public function newArrivals(): JsonResponse
    {
        $products = Cache::remember('products.newarrivals', 3600, function () {
            return Product::with('category')
                ->active()
                ->newArrivals()
                ->limit(8)
                ->get();
        });

        return response()->json($products);
    }

    public function search(Request $request): JsonResponse
    {
        $request->validate(['q' => 'required|string|min:2']);

        $products = Product::search($request->q)
            ->take(10)
            ->get()
            ->load('category');

        return response()->json($products);
    }

    public function related(string $slug): JsonResponse
    {
        $product = Product::where('slug', $slug)->firstOrFail();

        $related = Product::with('category')
            ->active()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return response()->json($related);
    }
}
