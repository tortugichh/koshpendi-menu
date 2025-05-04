// src/utils/errorUtils.js

/**
 * Parses API error responses into a standardized format
 * @param {Object} error - The error object from API catch block
 * @returns {Object} Standardized error object with message and field errors
 */
export const parseApiError = (error) => {
    // If the error is already in our format
    if (error.message) {
      return error;
    }
    
    // If the server returned HTML instead of JSON
    if (error.toString().includes('SyntaxError: Unexpected token')) {
      return {
        message: 'Ошибка на сервере. Пожалуйста, попробуйте позже.',
        isServerError: true
      };
    }
    
    // Default error message
    return {
      message: 'Произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз.',
      originalError: error
    };
  };
  
  /**
   * Maps backend field names to frontend form field names
   * @param {string} fieldName - The backend field name
   * @param {string} formType - The form type (e.g., 'restaurant', 'user')
   * @returns {string} The corresponding frontend field name
   */
  export const mapFieldName = (fieldName, formType = 'user') => {
    const fieldMappings = {
      restaurant: {
        name: 'restaurantName',
        contactPerson: 'contactName',
        phoneNumber: 'phone',
        emailAddress: 'email',
      },
      user: {
        name: 'username',
        phoneNumber: 'phone',
        emailAddress: 'email',
      }
    };
    
    return (fieldMappings[formType] && fieldMappings[formType][fieldName]) || fieldName;
  };
  
  /**
   * Applies field errors from API to the form errors state
   * @param {Object} apiErrors - Errors object from API response
   * @param {string} formType - The form type to use for field mapping
   * @returns {Object} Mapped form errors object
   */
  export const applyFieldErrors = (apiErrors, formType = 'user') => {
    if (!apiErrors || typeof apiErrors !== 'object') {
      return {};
    }
    
    const formErrors = {};
    
    Object.entries(apiErrors).forEach(([field, message]) => {
      const formField = mapFieldName(field, formType);
      formErrors[formField] = Array.isArray(message) ? message[0] : message;
    });
    
    return formErrors;
  };