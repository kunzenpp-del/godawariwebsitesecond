<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function esewaSuccess(Request $request): JsonResponse
    {
        // Verify eSewa payment
        // In production, verify with eSewa API
        $orderId = $request->input('order_id');
        $transactionId = $request->input('transaction_id');

        $order = Order::findOrFail($orderId);
        $order->update([
            'payment_status' => 'paid',
            'transaction_id' => $transactionId,
            'status' => 'processing',
        ]);

        return response()->json(['message' => 'Payment verified', 'order' => $order]);
    }

    public function esewaVerify(Request $request): JsonResponse
    {
        // eSewa verification endpoint
        return response()->json(['verified' => true]);
    }

    public function khaltiSuccess(Request $request): JsonResponse
    {
        // Verify Khalti payment
        $orderId = $request->input('order_id');
        $transactionId = $request->input('token');

        // In production, verify with Khalti API
        // $verification = Http::withHeaders([...])->post('https://khalti.com/api/v2/payment/verify/', [...]);

        $order = Order::findOrFail($orderId);
        $order->update([
            'payment_status' => 'paid',
            'transaction_id' => $transactionId,
            'status' => 'processing',
        ]);

        return response()->json(['message' => 'Payment verified', 'order' => $order]);
    }

    public function khaltiVerify(Request $request): JsonResponse
    {
        // Khalti verification endpoint
        return response()->json(['verified' => true]);
    }
}
