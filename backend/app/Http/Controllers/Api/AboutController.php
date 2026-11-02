<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class AboutController extends Controller
{
    public function index(): JsonResponse
    {
        $sections = Cache::remember('about_us.all', 3600, function () {
            return AboutUs::active()
                ->ordered()
                ->get()
                ->groupBy('section_key');
        });

        return response()->json($sections);
    }

    public function show(string $sectionKey): JsonResponse
    {
        $section = Cache::remember("about_us.{$sectionKey}", 3600, function () use ($sectionKey) {
            return AboutUs::where('section_key', $sectionKey)
                ->where('is_active', true)
                ->firstOrFail();
        });

        return response()->json($section);
    }
}
