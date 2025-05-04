/**
 * @param {Object} error 
 * @returns {Object} 
 */
export const parseApiError = (error) => {
    if (error.message) {
      return error;
    }
    
    if (error.toString().includes('SyntaxError: Unexpected token')) {
      return {
        message: 'Ошибка на сервере. Пожалуйста, попробуйте позже.',
        isServerError: true
      };
    }
    
    return {
      message: 'Произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз.',
      originalError: error
    };
  };
  
  /**
   * @param {string} fieldName 
   * @param {string} formType
   * @returns {string} 
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