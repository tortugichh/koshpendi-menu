import api from '../services/api';

export const storeTokens = (accessToken, refreshToken, user) => {
  try {
    if (!accessToken || !refreshToken) {
      console.error('Invalid tokens provided:', { accessToken, refreshToken });
      throw new Error('Invalid tokens');
    }
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    const userObj = user || { 
      username: 'user', 
      role: 'customer' 
    };
    
    localStorage.setItem('user', JSON.stringify(userObj));
    
    console.log('Tokens and user data stored successfully');
    return true;
  } catch (error) {
    console.error('Failed to store auth data:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return false;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

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
      localStorage.setItem('accessToken', response.data.access);
      return response.data.access;
    } else {
      throw new Error('Invalid token refresh response');
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    logout();
    throw error;
  }
};