import axios, { AxiosInstance } from 'axios';
import type { Studio, Image, StudioManifest, ImageManifest } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints matching backend
export const api = {
  // Health check
  health: {
    get: () => apiClient.get<{ status: string }>('/health'),
  },

  // Studios endpoints
  studios: {
    getAll: () => apiClient.get<Studio[]>('/api/studios'),
    getById: (id: number) => apiClient.get<Studio>(`/api/studios/${id}`),
  },

  // Images endpoints
  images: {
    getAll: () => apiClient.get<Image[]>('/api/images'),
    getById: (id: number) => apiClient.get<Image>(`/api/images/${id}`),
  },

  // Manifest endpoints
  manifests: {
    getStudioManifest: (studioId: number) => apiClient.get<StudioManifest>(`/api/manifests/studio/${studioId}`),
    getImageManifest: (imageId: number) => apiClient.get<ImageManifest>(`/api/manifests/image/${imageId}`),
  },
};

export default apiClient;
