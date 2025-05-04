
const API_BASE = '/api';

// Store tokens in localStorage
export const storeTokens = (accessToken, refreshToken, user) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
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
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
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

// Register a new user
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Store tokens and user data
    storeTokens(data.access, data.refresh, data.user);
    return data;
  } catch (error) {
    throw error;
  }
};

// Login with credentials
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store tokens
    storeTokens(data.access, data.refresh, data.user);
    return data;
  } catch (error) {
    throw error;
  }
};

// Refresh the access token using the refresh token
export const refreshToken = async () => {
  const refresh = getRefreshToken();
  
  if (!refresh) {
    throw new Error('No refresh token available');
  }
  
  try {
    const response = await fetch(`${API_BASE}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    // Update the access token
    localStorage.setItem('accessToken', data.access);
    return data.access;
  } catch (error) {
    // If refresh fails, logout the user
    logout();
    throw error;
  }
};

// Create a request function with token handling
export const authenticatedRequest = async (url, options = {}) => {
  // Get the access token
  let accessToken = getAccessToken();
  
  // Set up headers with the access token
  let headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`,
  };
  
  try {
    // Make the request
    let response = await fetch(url, {
      ...options,
      headers,
    });
    
    // If unauthorized, try to refresh the token and retry
    if (response.status === 401) {
      try {
        // Refresh the token
        accessToken = await refreshToken();
        
        // Update headers with new token
        headers = {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`,
        };
        
        // Retry the request
        response = await fetch(url, {
          ...options,
          headers,
        });
      } catch (refreshError) {
        // If refresh fails, throw the error
        throw refreshError;
      }
    }
    
    // Handle the response
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};