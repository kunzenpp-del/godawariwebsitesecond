import apiClient, { USE_MOCK_API } from './api';
import { Order, CartItem, Address } from '../types';
import { generateOrderId } from '../utils/helpers';

// ==========================================
// ORDER SERVICE
// ==========================================
export interface CreateOrderPayload {
  items: CartItem[];
  shipping: Address;
  paymentMethod: 'cod' | 'esewa' | 'khalti' | 'bank_transfer';
  couponCode?: string;
  notes?: string;
}

export const orderService = {
  // Create a new order
  async create(payload: CreateOrderPayload): Promise<{ order: Order; orderNumber: string }> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const orderNumber = generateOrderId();
      const subtotal = payload.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const shippingCost = subtotal >= 2000 ? 0 : 100;

      const order: Order = {
        id: orderNumber,
        items: payload.items,
        total: subtotal + shippingCost,
        status: 'pending',
        paymentMethod: payload.paymentMethod,
        shippingAddress: payload.shipping,
        createdAt: new Date().toISOString(),
      };

      return { order, orderNumber };
    }

    const response = await apiClient.post('/orders', {
      items: payload.items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        selected_variant: item.selectedVariant,
      })),
      shipping: payload.shipping,
      payment_method: payload.paymentMethod,
      coupon_code: payload.couponCode,
      notes: payload.notes,
    });

    return response.data;
  },

  // Get user's orders
  async getMyOrders(page = 1): Promise<{ data: Order[]; total: number }> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const { useOrderStore } = await import('../store');
      const orders = useOrderStore.getState().orders;
      return { data: orders, total: orders.length };
    }

    const response = await apiClient.get('/orders', { params: { page } });
    return response.data;
  },

  // Get single order
  async getOrder(orderNumber: string): Promise<Order> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const { useOrderStore } = await import('../store');
      const order = useOrderStore.getState().orders.find(o => o.id === orderNumber);
      if (!order) throw new Error('Order not found');
      return order;
    }

    const response = await apiClient.get(`/orders/${orderNumber}`);
    return response.data;
  },

  // Cancel order
  async cancelOrder(orderNumber: string): Promise<void> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const { useOrderStore } = await import('../store');
      useOrderStore.getState().updateOrderStatus(orderNumber, 'cancelled');
      return;
    }

    await apiClient.post(`/orders/${orderNumber}/cancel`);
  },

  // Download invoice
  async downloadInvoice(orderNumber: string): Promise<Blob> {
    if (USE_MOCK_API) {
      // Return a simple text blob for mock
      return new Blob([`Invoice for Order #${orderNumber}\n\nThis is a mock invoice.`], { type: 'text/plain' });
    }

    const response = await apiClient.get(`/orders/${orderNumber}/invoice`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Get saved addresses
  async getAddresses(): Promise<Address[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return [
        {
          fullName: 'Rajesh Shrestha',
          phone: '+977-9841234567',
          province: 'Bagmati Province',
          district: 'Kathmandu',
          city: 'Kathmandu',
          ward: '10',
          street: 'Baneshwor',
        },
      ];
    }

    const response = await apiClient.get('/addresses');
    return response.data;
  },

  // Save address
  async saveAddress(address: Address & { label?: string; isDefault?: boolean }): Promise<Address> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return address;
    }

    const response = await apiClient.post('/addresses', address);
    return response.data;
  },
};

// ==========================================
// COUPON SERVICE
// ==========================================
export const couponService = {
  async validate(code: string, subtotal: number): Promise<{ valid: boolean; discount: number; message?: string }> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const { coupons } = await import('../data/mockData');
      const coupon = coupons.find(c => c.code === code.toUpperCase());

      if (!coupon) return { valid: false, discount: 0, message: 'Invalid coupon code' };
      if (subtotal < coupon.minOrderAmount) {
        return { valid: false, discount: 0, message: `Minimum order amount is Rs. ${coupon.minOrderAmount}` };
      }

      let discount = 0;
      if (coupon.type === 'percentage') {
        discount = subtotal * (coupon.value / 100);
        if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
      } else {
        discount = coupon.value;
      }

      return { valid: true, discount };
    }

    const response = await apiClient.post('/coupons/validate', { code, subtotal });
    return response.data;
  },
};
