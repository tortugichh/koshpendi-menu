import axios from 'axios';
import { getAccessToken } from '../utils/auth';

const api = axios.create({
  baseURL: 'https://sulpak1-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      console.error('API Error Response:', error.response);
      
      if (error.response.data) {
        return Promise.reject(error.response.data);
      }
      
      if (error.response.status === 400) {
        return Promise.reject({
          message: 'Ошибка в запросе. Пожалуйста, проверьте данные формы.',
          status: 400,
          isBadRequestError: true,
        });
      }
      
      if (error.response.status === 404) {
        console.error('API endpoint not found:', error.config.url);
        return Promise.reject({
          message: 'Запрашиваемый ресурс не найден. Пожалуйста, проверьте URL или свяжитесь с администратором.',
          status: 404,
          isNotFoundError: true,
        });
      }
    } 
    else if (error.request) {
      console.error('API Request Error:', error.request);
      return Promise.reject({
        message: 'Не удалось подключиться к серверу. Проверьте подключение к интернету.',
        isNetworkError: true,
      });
    } 
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

export const authAPI = {
  registerRestaurant: async (restaurantData) => {
    try {
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

  login: async (credentials) => {
    try {
      console.log('Login request with credentials:', credentials.username);
      
      const response = await api.post('/api/token/', {
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('Login response received');
      
      let userData = {
        username: credentials.username,
      };
      
      if (response.data.user) {
        userData = response.data.user;
      } else {
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

export default api;     