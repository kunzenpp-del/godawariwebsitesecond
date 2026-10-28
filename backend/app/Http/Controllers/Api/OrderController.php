<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Coupon;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $orders = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json($orders);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.selected_variant' => 'nullable|array',
            'shipping' => 'required|array',
            'shipping.full_name' => 'required|string|max:255',
            'shipping.phone' => 'required|string|max:20',
            'shipping.email' => 'nullable|email',
            'shipping.province' => 'required|string',
            'shipping.district' => 'required|string',
            'shipping.city' => 'required|string',
            'shipping.ward' => 'nullable|string',
            'shipping.street' => 'nullable|string',
            'payment_method' => 'required|in:cod,esewa,khalti,bank_transfer',
            'coupon_code' => 'nullable|string',
            'notes' => 'nullable|string|max:500',
        ]);

        return DB::transaction(function () use ($request) {
            $items = [];
            $subtotal = 0;

            // Validate and calculate items
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    return response()->json([
                        'message' => "Insufficient stock for {$product->name}",
                    ], 422);
                }

                $price = $product->price;

                // Apply bulk pricing if applicable
                if ($product->bulk_pricing) {
                    foreach ($product->bulk_pricing as $bp) {
                        if ($item['quantity'] >= $bp['minQty'] && $item['quantity'] <= $bp['maxQty']) {
                            $price = $bp['pricePerUnit'];
                            break;
                        }
                    }
                }

                $total = $price * $item['quantity'];
                $subtotal += $total;

                $items[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $price,
                    'quantity' => $item['quantity'],
                    'total' => $total,
                    'selected_variant' => $item['selected_variant'] ?? null,
                ];
            }

            // Calculate discount
            $discount = 0;
            $coupon = null;

            if ($request->coupon_code) {
                $coupon = Coupon::where('code', $request->coupon_code)
                    ->where('is_active', true)
                    ->where(function ($q) {
                        $q->whereNull('expires_at')->orWhere('expires_at', '>', now());
                    })
                    ->first();

                if ($coupon && $subtotal >= $coupon->min_order_amount) {
                    if ($coupon->type === 'percentage') {
                        $discount = $subtotal * ($coupon->value / 100);
                        if ($coupon->max_discount) {
                            $discount = min($discount, $coupon->max_discount);
                        }
                    } else {
                        $discount = $coupon->value;
                    }

                    $coupon->increment('used_count');
                }
            }

            // Calculate shipping
            $shippingCost = $subtotal >= 2000 ? 0 : 100;
            $total = $subtotal - $discount + $shippingCost;

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'subtotal' => $subtotal,
                'discount' => $discount,
                'shipping_cost' => $shippingCost,
                'total' => $total,
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'payment_status' => $request->payment_method === 'cod' ? 'pending' : 'pending',
                'coupon_id' => $coupon?->id,
                'shipping_full_name' => $request->shipping['full_name'],
                'shipping_phone' => $request->shipping['phone'],
                'shipping_email' => $request->shipping['email'],
                'shipping_province' => $request->shipping['province'],
                'shipping_district' => $request->shipping['district'],
                'shipping_city' => $request->shipping['city'],
                'shipping_ward' => $request->shipping['ward'],
                'shipping_street' => $request->shipping['street'],
                'notes' => $request->notes,
            ]);

            // Create order items and update stock
            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    ...$item,
                ]);

                Product::where('id', $item['product_id'])
                    ->decrement('stock', $item['quantity']);
            }

            // Send confirmation email
            // Mail::to($order->shipping_email)->queue(new OrderConfirmationMail($order));

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order->load('items'),
                'order_number' => $order->order_number,
            ], 201);
        });
    }

    public function show(string $orderNumber): JsonResponse
    {
        $order = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        return response()->json($order);
    }

    public function invoice(string $orderNumber)
    {
        $order = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        $pdf = Pdf::loadView('invoices.order', compact('order'));

        return $pdf->download("invoice-{$orderNumber}.pdf");
    }

    public function cancel(string $orderNumber): JsonResponse
    {
        $order = Order::where('user_id', Auth::id())
            ->where('order_number', $orderNumber)
            ->whereIn('status', ['pending', 'processing'])
            ->firstOrFail();

        $order->update(['status' => 'cancelled']);

        // Restore stock
        foreach ($order->items as $item) {
            Product::where('id', $item->product_id)
                ->increment('stock', $item->quantity);
        }

        return response()->json(['message' => 'Order cancelled successfully']);
    }

    // Addresses
    public function addresses(): JsonResponse
    {
        $addresses = Address::where('user_id', Auth::id())->get();
        return response()->json($addresses);
    }

    public function storeAddress(Request $request): JsonResponse
    {
        $request->validate([
            'label' => 'required|string|max:50',
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'province' => 'required|string',
            'district' => 'required|string',
            'city' => 'required|string',
            'ward' => 'nullable|string',
            'street' => 'nullable|string',
            'is_default' => 'boolean',
        ]);

        if ($request->boolean('is_default')) {
            Address::where('user_id', Auth::id())->update(['is_default' => false]);
        }

        $address = Address::create([
            'user_id' => Auth::id(),
            ...$request->all(),
        ]);

        return response()->json($address, 201);
    }

    public function updateAddress(Request $request, int $id): JsonResponse
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);

        $request->validate([
            'label' => 'sometimes|string|max:50',
            'full_name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
            'province' => 'sometimes|string',
            'district' => 'sometimes|string',
            'city' => 'sometimes|string',
            'ward' => 'nullable|string',
            'street' => 'nullable|string',
            'is_default' => 'boolean',
        ]);

        if ($request->boolean('is_default')) {
            Address::where('user_id', Auth::id())->update(['is_default' => false]);
        }

        $address->update($request->all());

        return response()->json($address);
    }

    public function destroyAddress(int $id): JsonResponse
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);
        $address->delete();

        return response()->json(['message' => 'Address deleted']);
    }
}
