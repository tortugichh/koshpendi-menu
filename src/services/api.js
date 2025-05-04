// src/services/api.js
import axios from 'axios';
import { getAccessToken } from '../utils/auth';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://sulpak1-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log all errors for debugging
    console.error('API Error:', error);
    
    // Server returned a response but with an error status code
    if (error.response) {
      console.error('API Error Response:', error.response);
      
      // Return the error data directly if available
      if (error.response.data) {
        return Promise.reject(error.response.data);
      }
      
      // Handle 400 Bad Request specifically
      if (error.response.status === 400) {
        return Promise.reject({
          message: 'Ошибка в запросе. Пожалуйста, проверьте данные формы.',
          status: 400,
          isBadRequestError: true,
        });
      }
      
      // Handle 404 Not Found specifically
      if (error.response.status === 404) {
        console.error('API endpoint not found:', error.config.url);
        return Promise.reject({
          message: 'Запрашиваемый ресурс не найден. Пожалуйста, проверьте URL или свяжитесь с администратором.',
          status: 404,
          isNotFoundError: true,
        });
      }
    } 
    // Request was made but no response received (network error)
    else if (error.request) {
      console.error('API Request Error:', error.request);
      return Promise.reject({
        message: 'Не удалось подключиться к серверу. Проверьте подключение к интернету.',
        isNetworkError: true,
      });
    } 
    // Something else happened while setting up the request
    else {
      console.error('API Error:', error.message);
      return Promise.reject({
        message: 'Произошла ошибка при отправке запроса.',
        error: error.message,
      });
    }

    return Promise.reject(error);
  }
);

// Authentication API calls with fixed endpoints
export const authAPI = {
  // Register restaurant
  registerRestaurant: async (restaurantData) => {
    try {
      // Send only required fields in the correct format
      const dataToSend = {
        username: restaurantData.username,
        email: restaurantData.email,
        password: restaurantData.password,
        role: 'restaurant'
      };
      
      console.log('Sending restaurant registration data:', dataToSend);
      
      const response = await api.post('/api/register/', dataToSend);
      return response.data;
    } catch (error) {
      console.error('Restaurant Registration Error:', error);
      throw error;
    }
  },

  // Register user
  registerUser: async (userData) => {
    try {
      const dataToSend = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: 'customer'
      };
      
      console.log('Sending user registration data:', dataToSend);
      
      const response = await api.post('/api/register/', dataToSend);
      return response.data;
    } catch (error) {
      console.error('User Registration Error:', error);
      throw error;
    }
  },

  // Login - FIXED: Corrected API endpoint and payload structure
  login: async (credentials) => {
    try {
      console.log('Login request with credentials:', credentials.username);
      
      // Using the correct endpoint based on error logs
      const response = await api.post('/api/token/', {
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('Login response received');
      
      // Extract user data from response
      let userData = {
        username: credentials.username,
      };
      
      // If server returns user data, use it
      if (response.data.user) {
        userData = response.data.user;
      } else {
        // Otherwise, determine role from another source if possible
        // In a real app, you would decode the JWT token or make a separate call
        userData.role = response.data.role || 'customer';
      }
      
      return {
        access: response.data.access,
        refresh: response.data.refresh,
        user: userData
      };
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },
  
  // Get current user profile
  getUserProfile: async () => {
    try {
      const response = await api.get('/api/profile/');
      return response.data;
    } catch (error) {
      console.error('Get Profile Error:', error);
      throw error;
    }
  }
};

// Export default API instance for other services
export default api;     