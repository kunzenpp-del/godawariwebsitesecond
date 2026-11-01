import apiClient, { USE_MOCK_API } from './api';
import { User } from '../types';

// ==========================================
// AUTH SERVICE
// ==========================================
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export const authService = {
  // Register new user
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user: User = {
        id: Date.now(),
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      return { user, token: 'mock-token-' + Date.now(), message: 'Registration successful' };
    }

    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    // Store token
    localStorage.setItem('auth-token', response.data.token);
    return response.data;
  },

  // Login user
  async login(payload: LoginPayload): Promise<AuthResponse> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const isAdmin = payload.email === 'admin@godawari.com';
      const user: User = {
        id: isAdmin ? 1 : Date.now(),
        name: payload.email.split('@')[0],
        email: payload.email,
        role: isAdmin ? 'admin' : 'customer',
        createdAt: new Date().toISOString(),
      };
      return { user, token: 'mock-token-' + Date.now(), message: 'Login successful' };
    }

    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    // Store token
    localStorage.setItem('auth-token', response.data.token);
    return response.data;
  },

  // Logout user
  async logout(): Promise<void> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return;
    }

    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth-token');
    }
  },

  // Get current user
  async getMe(): Promise<User> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const stored = localStorage.getItem('auth-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.state.user;
      }
      throw new Error('Not authenticated');
    }

    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  // Update profile
  async updateProfile(data: Partial<User>): Promise<User> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return data as User;
    }

    const response = await apiClient.put<User>('/auth/profile', data);
    return response.data;
  },

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return;
    }

    await apiClient.put('/auth/change-password', {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: newPassword,
    });
  },

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    if (USE_MOCK_API) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return;
    }

    await apiClient.post('/auth/forgot-password', { email });
  },
};
