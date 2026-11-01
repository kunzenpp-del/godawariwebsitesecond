export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  variants?: ProductVariant[];
  bulkPricing?: BulkPricing[];
  specifications?: Record<string, string>;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
  priceModifier: number;
}

export interface BulkPricing {
  minQty: number;
  maxQty: number;
  pricePerUnit: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: Record<string, string>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  subcategories: { name: string; slug: string }[];
  productCount: number;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  createdAt: string;
  trackingNumber?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  city: string;
  ward: string;
  street: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  expiresAt: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
}

export interface FlashSale {
  id: number;
  product: Product;
  salePrice: number;
  endsAt: string;
  soldPercent: number;
}
