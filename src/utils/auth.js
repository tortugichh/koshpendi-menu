// src/utils/auth.js
import api from '../services/api';

// Store tokens in localStorage with proper error handling
export const storeTokens = (accessToken, refreshToken, user) => {
  try {
    if (!accessToken || !refreshToken) {
      console.error('Invalid tokens provided:', { accessToken, refreshToken });
      throw new Error('Invalid tokens');
    }
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    // Ensure we have a valid user object before storing
    const userObj = user || { 
      username: 'user', 
      role: 'customer' 
    };
    
    localStorage.setItem('user', JSON.stringify(userObj));
    
    console.log('Tokens and user data stored successfully');
    return true;
  } catch (error) {
    console.error('Failed to store auth data:', error);
    // Clear any potentially corrupted data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return false;
  }
};

// Get the current access token
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Get the current refresh token
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// Get the current user
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Clear all authentication data
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAccessToken();
};

// Refresh the access token using the refresh token
export const refreshToken = async () => {
  const refresh = getRefreshToken();
  
  if (!refresh) {
    throw new Error('No refresh token available');
  }
  
  try {
    const response = await api.post('/api/token/refresh/', {
      refresh: refresh
    });

    if (response.data && response.data.access) {
      // Update the access token
      localStorage.setItem('accessToken', response.data.access);
      return response.data.access;
    } else {
      throw new Error('Invalid token refresh response');
    }
  } catch (error) {
    // If refresh fails, logout the user
    console.error('Token refresh failed:', error);
    logout();
    throw error;
  }
};