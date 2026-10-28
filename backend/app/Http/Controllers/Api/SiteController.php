<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\Slider;
use App\Models\Service;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class SiteController extends Controller
{
    public function getSettings(): JsonResponse
    {
        $settings = Cache::remember('site.settings', 3600, function () {
            return SiteSetting::getAll();
        });

        return response()->json($settings);
    }

    public function getSliders(): JsonResponse
    {
        $sliders = Cache::remember('site.sliders', 3600, function () {
            return Slider::where('is_active', true)
                ->orderBy('order')
                ->get();
        });

        return response()->json($sliders);
    }

    public function getServices(): JsonResponse
    {
        $services = Cache::remember('site.services', 3600, function () {
            return Service::where('is_active', true)
                ->orderBy('order')
                ->get();
        });

        return response()->json($services);
    }

    public function subscribeNewsletter(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|unique:newsletter_subscribers,email',
        ]);

        NewsletterSubscriber::create([
            'email' => $request->email,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Successfully subscribed to newsletter',
        ], 201);
    }
}
