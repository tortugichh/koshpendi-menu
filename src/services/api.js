// src/services/api.js
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://sulpak1-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log all errors for debugging
    console.error('API Error:', error);
    
    // Server returned a response but with an error status code
    if (error.response) {
      console.error('API Error Response:', error.response);
      
      // Handle 404 Not Found specifically - endpoint doesn't exist
      if (error.response.status === 404) {
        console.error('API endpoint not found:', error.config.url);
        return Promise.reject({
          message: 'Запрашиваемый ресурс не найден. Пожалуйста, проверьте URL или свяжитесь с администратором.',
          status: 404,
          isNotFoundError: true,
        });
      }
      
      // Handle HTML responses (like 500 errors that return HTML instead of JSON)
      const contentType = error.response.headers['content-type'];
      if (contentType && contentType.includes('text/html')) {
        return Promise.reject({
          message: 'Ошибка на сервере. Пожалуйста, попробуйте позже.',
          status: error.response.status,
          isServerError: true,
        });
      }
      
      // Handle API error responses with JSON data
      if (error.response.data) {
        return Promise.reject(error.response.data);
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

// Authentication API calls with correct endpoints based on your error logs
export const authAPI = {
  // Register restaurant - с добавлением роли restaurant
  registerRestaurant: async (restaurantData) => {
    try {
      // Добавляем роль restaurant к данным
      const dataWithRole = {
        ...restaurantData,
        role: 'restaurant' // добавляем роль для ресторана
      };
      
      // Используем правильный URL для API
      const response = await api.post('/api/register/', dataWithRole);
      return response.data;
    } catch (error) {
      console.error('Restaurant Registration Error:', error);
      throw error;
    }
  },

  // Register user - с добавлением роли customer
  registerUser: async (userData) => {
    try {
      // Добавляем роль customer к данным
      const dataWithRole = {
        ...userData,
        role: 'customer' // добавляем роль для пользователя
      };
      
      // Используем правильный URL для API
      const response = await api.post('/api/register/', dataWithRole);
      return response.data;
    } catch (error) {
      console.error('User Registration Error:', error);
      throw error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/api/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }
};

// Export default API instance for other services
export default api;