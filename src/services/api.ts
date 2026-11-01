import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store';

// ==========================================
// CONFIGURATION
// ==========================================
// Set to false when Laravel backend is running
export const USE_MOCK_API = true;

// API Base URL - change this to your Laravel backend URL
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api';

// ==========================================
// AXIOS INSTANCE
// ==========================================
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Required for Sanctum cookies
});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().user;
    if (token) {
      // Note: In production, store the token separately
      // For now, we'll get it from localStorage
      const authToken = localStorage.getItem('auth-token');
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth-token');
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      console.error('Access denied');
    }

    if (error.response?.status === 422) {
      // Validation errors
      const errors = (error.response.data as any)?.errors;
      if (errors) {
        const firstError = Object.values(errors)[0];
        console.error('Validation error:', firstError);
      }
    }

    if (error.response?.status === 500) {
      console.error('Server error');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
