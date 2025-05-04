// src/services/api.js
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://sulpak1-production.up.railway.app',
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

// Authentication API calls with correct endpoints based on the error logs
export const authAPI = {
  // Register restaurant - строго поля из требуемого формата
  registerRestaurant: async (restaurantData) => {
    try {
      // Отправляем только необходимые поля согласно требуемому формату
      const dataToSend = {
        password: restaurantData.password,
        email: restaurantData.email,
        username: restaurantData.username,
        role: 'restaurant'
      };
      
      console.log('Отправляемые данные:', dataToSend);
      
      // Отправляем запрос
      const response = await api.post('/api/register/', dataToSend);
      return response.data;
    } catch (error) {
      console.error('Ошибка регистрации ресторана:', error);
      throw error;
    }
  },

  // Register user - строго поля из требуемого формата
  registerUser: async (userData) => {
    try {
      // Отправляем только необходимые поля
      const dataToSend = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: 'customer'
      };
      
      // Используем URL из логов ошибок
      const response = await api.post('/api/register/', dataToSend);
      return response.data;
    } catch (error) {
      console.error('User Registration Error:', error);
      throw error;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/api/login/', credentials);
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }
};

// Export default API instance for other services
export default api;