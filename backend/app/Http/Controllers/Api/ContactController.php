<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ContactController extends Controller
{
    public function index(): JsonResponse
    {
        $contactInfo = Cache::remember('contact_info.all', 3600, function () {
            return ContactInfo::active()
                ->ordered()
                ->get()
                ->groupBy('type');
        });

        return response()->json($contactInfo);
    }

    public function show(string $type): JsonResponse
    {
        $info = Cache::remember("contact_info.{$type}", 3600, function () use ($type) {
            return ContactInfo::byType($type)
                ->active()
                ->ordered()
                ->get();
        });

        return response()->json($info);
    }
}
