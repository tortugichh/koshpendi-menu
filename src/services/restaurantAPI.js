import api from './api';

export const restaurantAPI = {
  getAllRestaurants: async () => {
    try {
      const response = await api.get('/api/restaurant/all/');
      console.log('Fetched restaurants data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  },

  getRestaurantById: async (id) => {
    try {
      const response = await api.get(`/api/restaurant/${id}/`);
      console.log(`Fetched restaurant data for ID ${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching restaurant with ID ${id}:`, error);
      throw error;
    }
  },

  getRestaurantMenu: async (restaurantId) => {
    try {
      const response = await api.get(`/api/restaurant/${restaurantId}/menu/`);
      console.log(`Fetched menu for restaurant ID ${restaurantId}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching menu for restaurant ID ${restaurantId}:`, error);
      throw error;
    }
  },

  getRestaurantReviews: async (restaurantId) => {
    try {
      const response = await api.get(`/api/restaurant/${restaurantId}/reviews/`);
      console.log(`Fetched reviews for restaurant ID ${restaurantId}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for restaurant ID ${restaurantId}:`, error);
      throw error;
    }
  },

  submitReview: async (restaurantId, reviewData) => {
    try {
      const response = await api.post(`/api/restaurant/${restaurantId}/reviews/`, reviewData);
      console.log(`Submitted review for restaurant ID ${restaurantId}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error submitting review for restaurant ID ${restaurantId}:`, error);
      throw error;
    }
  }
};

export default restaurantAPI;