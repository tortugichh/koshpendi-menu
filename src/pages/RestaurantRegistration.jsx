import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RestaurantRegistration = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    contactName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Название ресторана обязательно';
    }
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Имя контактного лица обязательно';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Неверный формат телефона';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Вы должны согласиться с условиями';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // In a real app, this would send the data to the server
      console.log('Form submitted:', formData);
      
      setSuccessMessage('Регистрация успешно завершена! Мы свяжемся с вами в ближайшее время.');
      
      // Reset form
      setFormData({
        restaurantName: '',
        contactName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16 pb-16">
        <div className="container-custom">
          <h1 className="text-center text-koshpendi-text-dark my-10">Регистрация ресторана</h1>
          
          <div className="max-w-3xl mx-auto">
            {/* Benefits for restaurants */}
            <div className="bg-koshpendi-secondary rounded-kosh-md p-kosh-lg mb-8">
              <h2 className="text-koshpendi-text-dark text-xl font-semibold mb-4">Преимущества для вашего ресторана</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-koshpendi-primary mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-koshpendi-text-light">Привлекайте новых клиентов через платформу Kóshpendi Menu</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-koshpendi-primary mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-koshpendi-text-light">QR-меню — удобный способ цифровизации вашего ресторана</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-koshpendi-primary mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-koshpendi-text-light">Аналитика заказов и предпочтений для улучшения сервиса</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-koshpendi-primary mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-koshpendi-text-light">Удобная панель управления для обновления меню в реальном времени</span>
                </li>
              </ul>
            </div>
            
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-kosh-md mb-8 text-center">
                {successMessage}
              </div>
            )}
            
            {/* Registration Form */}
            <div className="bg-white p-kosh-lg rounded-kosh-md border border-koshpendi-border">
              <h2 className="text-koshpendi-text-dark text-xl font-semibold mb-6">Заполните форму для регистрации</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Restaurant Name */}
                  <div>
                    <label htmlFor="restaurantName" className="block text-koshpendi-text-dark font-medium mb-1">
                      Название ресторана*
                    </label>
                    <input
                      type="text"
                      id="restaurantName"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      className={`input-field ${errors.restaurantName ? 'border-koshpendi-error' : ''}`}
                    />
                    {errors.restaurantName && (
                      <p className="text-koshpendi-error text-sm mt-1">{errors.restaurantName}</p>
                    )}
                  </div>
                  
                  {/* Contact Person Name */}
                  <div>
                    <label htmlFor="contactName" className="block text-koshpendi-text-dark font-medium mb-1">
                      Контактное лицо*
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={`input-field ${errors.contactName ? 'border-koshpendi-error' : ''}`}
                    />
                    {errors.contactName && (
                      <p className="text-koshpendi-error text-sm mt-1">{errors.contactName}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-koshpendi-text-dark font-medium mb-1">
                      Телефон*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (XXX) XXX-XX-XX"
                      className={`input-field ${errors.phone ? 'border-koshpendi-error' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-koshpendi-error text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-koshpendi-text-dark font-medium mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-koshpendi-error' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-koshpendi-error text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-koshpendi-text-dark font-medium mb-1">
                      Пароль*
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`input-field ${errors.password ? 'border-koshpendi-error' : ''}`}
                    />
                    {errors.password && (
                      <p className="text-koshpendi-error text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                  
                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-koshpendi-text-dark font-medium mb-1">
                      Подтвердите пароль*
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`input-field ${errors.confirmPassword ? 'border-koshpendi-error' : ''}`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-koshpendi-error text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  {/* Terms Agreement */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <label htmlFor="agreeTerms" className="ml-2 text-koshpendi-text-light text-sm">
                      Я согласен с <a href="#" className="text-koshpendi-primary hover:underline">условиями использования</a> и <a href="#" className="text-koshpendi-primary hover:underline">политикой конфиденциальности</a>*
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-koshpendi-error text-sm mt-1">{errors.agreeTerms}</p>
                  )}
                  
                  {/* Submit Button */}
                  <div className="mt-6">
                    <button type="submit" className="btn-primary w-full">
                      Зарегистрироваться
                    </button>
                  </div>
                  
                  <p className="text-center text-koshpendi-text-light text-sm mt-4">
                    После регистрации наш менеджер свяжется с вами для уточнения деталей
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantRegistration;