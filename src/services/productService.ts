import apiClient, { USE_MOCK_API } from './api';
import { products as mockProducts, categories as mockCategories } from '../data/mockData';
import { Product, Category } from '../types';

// ==========================================
// PRODUCT SERVICE
// ==========================================
// This service abstracts API calls. When USE_MOCK_API is true,
// it returns mock data. When false, it calls the Laravel backend.

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  sort?: 'popularity' | 'price-low' | 'price-high' | 'newest' | 'rating' | 'discount';
  page?: number;
  perPage?: number;
}

export const productService = {
  // Get all products with filters
  async getAll(filters: ProductFilters = {}): Promise<{ data: Product[]; total: number }> {
    if (USE_MOCK_API) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      let filtered = [...mockProducts];

      if (filters.category) {
        filtered = filtered.filter(p =>
          p.category.toLowerCase().replace(/\s+/g, '-').includes(filters.category!)
        );
      }

      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q))
        );
      }

      if (filters.isNew) filtered = filtered.filter(p => p.isNew);
      if (filters.isBestSeller) filtered = filtered.filter(p => p.isBestSeller);
      if (filters.isOnSale) filtered = filtered.filter(p => p.originalPrice);

      if (filters.minPrice) filtered = filtered.filter(p => p.price >= filters.minPrice!);
      if (filters.maxPrice) filtered = filtered.filter(p => p.price <= filters.maxPrice!);

      // Sort
      switch (filters.sort) {
        case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
        case 'newest': filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
        case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
        default: filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      }

      return { data: filtered, total: filtered.length };
    }

    // Real API call
    const response = await apiClient.get('/products', { params: filters });
    return response.data;
  },

  // Get single product by slug
  async getBySlug(slug: string): Promise<Product> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const product = mockProducts.find(p => p.slug === slug);
      if (!product) throw new Error('Product not found');
      return product;
    }

    const response = await apiClient.get(`/products/${slug}`);
    return response.data;
  },

  // Get featured products
  async getFeatured(): Promise<Product[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockProducts.filter(p => p.isBestSeller || p.isNew).slice(0, 8);
    }

    const response = await apiClient.get('/products/featured');
    return response.data;
  },

  // Get best sellers
  async getBestSellers(): Promise<Product[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockProducts.filter(p => p.isBestSeller);
    }

    const response = await apiClient.get('/products/best-sellers');
    return response.data;
  },

  // Get new arrivals
  async getNewArrivals(): Promise<Product[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockProducts.filter(p => p.isNew);
    }

    const response = await apiClient.get('/products/new-arrivals');
    return response.data;
  },

  // Get related products
  async getRelated(slug: string): Promise<Product[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const product = mockProducts.find(p => p.slug === slug);
      if (!product) return [];
      return mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    }

    const response = await apiClient.get(`/products/${slug}/related`);
    return response.data;
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const q = query.toLowerCase();
      return mockProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    const response = await apiClient.get('/products/search', { params: { q: query } });
    return response.data;
  },
};

// ==========================================
// CATEGORY SERVICE
// ==========================================
export const categoryService = {
  async getAll(): Promise<Category[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockCategories;
    }

    const response = await apiClient.get('/categories');
    return response.data;
  },

  async getBySlug(slug: string): Promise<Category> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const category = mockCategories.find(c => c.slug === slug);
      if (!category) throw new Error('Category not found');
      return category;
    }

    const response = await apiClient.get(`/categories/${slug}`);
    return response.data;
  },
};
