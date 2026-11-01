import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Order, Address, Coupon } from '../types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  coupon: Coupon | null;
  addItem: (product: Product, quantity?: number, variant?: Record<string, string>) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCoupon: (coupon: Coupon | null) => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,
      addItem: (product, quantity = 1, variant) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id && JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { product, quantity, selectedVariant: variant }],
            isOpen: true,
          };
        });
      },
      removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) }));
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          }));
        }
      },
      clearCart: () => set({ items: [], coupon: null }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCoupon: (coupon) => set({ coupon }),
      getSubtotal: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      getDiscount: () => {
        const { coupon, items } = get();
        if (!coupon) return 0;
        const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        if (subtotal < coupon.minOrderAmount) return 0;
        if (coupon.type === 'percentage') {
          const discount = subtotal * (coupon.value / 100);
          return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
        }
        return coupon.value;
      },
      getTotal: () => get().getSubtotal() - get().getDiscount(),
      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set((state) => ({ items: [...state.items, product] })),
      removeItem: (productId) => set((state) => ({ items: state.items.filter((p) => p.id !== productId) })),
      isInWishlist: (productId) => get().items.some((p) => p.id === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'wishlist-storage' }
  )
);

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, _password: string) => {
        // Mock login
        const user: User = {
          id: 1,
          name: email.split('@')[0],
          email,
          role: email === 'admin@godawari.com' ? 'admin' : 'customer',
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
        return true;
      },
      register: (name: string, email: string, _password: string) => {
        const user: User = {
          id: Date.now(),
          name,
          email,
          role: 'customer',
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : null })),
    }),
    { name: 'auth-storage' }
  )
);

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [
        {
          id: 'GPS-2024-001',
          items: [],
          total: 2499,
          status: 'delivered',
          paymentMethod: 'cod',
          shippingAddress: { fullName: 'Rajesh Shrestha', phone: '+977-9841234567', province: 'Bagmati Province', district: 'Kathmandu', city: 'Kathmandu', ward: '10', street: 'Baneshwor' },
          createdAt: '2024-02-15',
        },
        {
          id: 'GPS-2024-002',
          items: [],
          total: 5999,
          status: 'shipped',
          paymentMethod: 'esewa',
          shippingAddress: { fullName: 'Rajesh Shrestha', phone: '+977-9841234567', province: 'Bagmati Province', district: 'Kathmandu', city: 'Lalitpur', ward: '5', street: 'Pulchowk' },
          createdAt: '2024-03-01',
          trackingNumber: 'TRK-2024-00234',
        },
        {
          id: 'GPS-2024-003',
          items: [],
          total: 12500,
          status: 'processing',
          paymentMethod: 'khalti',
          shippingAddress: { fullName: 'Rajesh Shrestha', phone: '+977-9841234567', province: 'Gandaki Province', district: 'Kaski', city: 'Pokhara', ward: '5', street: 'Lakeside' },
          createdAt: '2024-03-10',
        },
      ],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map((o) => o.id === orderId ? { ...o, status } : o),
      })),
    }),
    { name: 'order-storage' }
  )
);
