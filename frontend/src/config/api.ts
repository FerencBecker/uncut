import axios from 'axios';
import type { Image, ImageManifest, StudioManifest } from '@/types';
import type { Studio } from '@/types/map';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error logging interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('[API Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// Health check
export const getHealth = () => apiClient.get<{ status: string }>('/health').then(r => r.data);

// Studios
export const getStudios = () => apiClient.get<Studio[]>('/api/studios').then(r => r.data);

export const getStudioById = (id: number) => apiClient.get<Studio>(`/api/studios/${id}`).then(r => r.data);

// Images
export const getImages = () => apiClient.get<Image[]>('/api/images').then(r => r.data);

export const getImageById = (id: number) => apiClient.get<Image>(`/api/images/${id}`).then(r => r.data);

// Manifests
export const getStudioManifest = (studioId: number) =>
  apiClient.get<StudioManifest>(`/api/manifests/studio/${studioId}`).then(r => r.data);

export const getImageManifest = (imageId: number) =>
  apiClient.get<ImageManifest>(`/api/manifests/image/${imageId}`).then(r => r.data);
