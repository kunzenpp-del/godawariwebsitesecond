<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class QuoteController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'product' => 'required|string|max:255',
            'width' => 'nullable|numeric',
            'height' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'unit' => 'nullable|in:inches,cm,mm,feet',
            'quantity' => 'required|integer|min:1',
            'quantity_2' => 'nullable|integer',
            'quantity_3' => 'nullable|integer',
            'design_file' => 'nullable|file|max:10240',
            'comments' => 'nullable|string',
        ]);

        // Handle file upload
        if ($request->hasFile('design_file')) {
            $path = $request->file('design_file')->store('quote_designs', 'public');
            $validated['design_file'] = $path;
        }

        $quote = QuoteRequest::create($validated);

        // Send notification email (optional)
        // Mail::to('info@godawariprinting.com')->queue(new QuoteRequestMail($quote));

        return response()->json([
            'message' => 'Quote request submitted successfully',
            'quote_id' => $quote->id,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $quote = QuoteRequest::findOrFail($id);
        return response()->json($quote);
    }
}
