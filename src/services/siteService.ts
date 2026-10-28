import apiClient, { USE_MOCK_API } from './api';
import { heroSlides } from '../data/mockData';

// ==========================================
// SITE SERVICE
// ==========================================
// Fetches dynamic content that can be managed from the Filament admin panel

export interface SiteSettings {
  general?: {
    site_name?: string;
    site_tagline?: string;
    free_shipping_threshold?: number;
    maintenance_mode?: boolean;
  };
  contact?: {
    contact_phone?: string;
    contact_email?: string;
    contact_address?: string;
  };
  social?: {
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    youtube_url?: string;
  };
  seo?: {
    meta_title?: string;
    meta_description?: string;
    google_analytics_id?: string;
  };
}

export interface Slider {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta_text: string;
  cta_link: string;
  order: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export const siteService = {
  // Get all site settings
  async getSettings(): Promise<SiteSettings> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return {
        general: {
          site_name: 'Godawari Printing Solution',
          site_tagline: 'Premium Quality Printing in Nepal',
          free_shipping_threshold: 2000,
          maintenance_mode: false,
        },
        contact: {
          contact_phone: '+977-01-5555555',
          contact_email: 'info@godawariprinting.com',
          contact_address: 'Godawari-12, Lalitpur, Nepal',
        },
        social: {
          facebook_url: 'https://facebook.com/godawariprinting',
          instagram_url: 'https://instagram.com/godawariprinting',
        },
      };
    }

    const response = await apiClient.get<SiteSettings>('/site/settings');
    return response.data;
  },

  // Get hero sliders
  async getSliders(): Promise<Slider[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return heroSlides.map((slide, i) => ({
        id: slide.id,
        title: slide.title,
        subtitle: slide.subtitle,
        image: slide.bgColor,
        cta_text: slide.ctaText,
        cta_link: slide.ctaLink,
        order: i + 1,
      }));
    }

    const response = await apiClient.get<Slider[]>('/site/sliders');
    return response.data;
  },

  // Get services
  async getServices(): Promise<Service[]> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return [
        { id: 1, title: 'Digital Printing', description: 'High-quality digital prints for short runs', icon: '🖨️', order: 1 },
        { id: 2, title: 'Offset Printing', description: 'Cost-effective for large volume orders', icon: '🎨', order: 2 },
        { id: 3, title: 'Special Finishes', description: 'Gold foil, embossing, spot UV, die-cutting', icon: '✨', order: 3 },
      ];
    }

    const response = await apiClient.get<Service[]>('/site/services');
    return response.data;
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email: string): Promise<void> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return;
    }

    await apiClient.post('/site/newsletter/subscribe', { email });
  },
};
