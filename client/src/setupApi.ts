import axios from 'axios';
import { OpenAPI } from './api/generated/core/OpenAPI';
import { UsersService } from './api/generated/services/UsersService';

// Initialize configuration
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Assign token dynamically to the generated client's options resolver
OpenAPI.TOKEN = async () => {
  return localStorage.getItem('accessToken') || '';
};

// Also configure default axios instances
axios.defaults.baseURL = OpenAPI.BASE;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor to append Authorization Header automatically
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to catch 401s and rotate Access + Refresh Tokens
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Catch 401 errors, make sure it's not a login/register request, and check if it hasn't been retried already
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/api/users/login') &&
      !originalRequest.url?.includes('/api/users/register')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken') || '';
        
        // Refresh token endpoint rotation
        const response = await UsersService.refreshToken({ refreshToken });
        
        // Expose credentials wrapper from response structure
        const data = response.data;
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        // Logout user on refresh failure
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Optionally redirect or raise custom logout events
        // window.location.href = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
