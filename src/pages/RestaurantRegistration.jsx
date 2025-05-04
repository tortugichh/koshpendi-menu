import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Grid, 
  Link, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { authAPI } from '../services/api';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState({
    open: false,
    message: ''
  });
  
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      
      try {
        // Prepare data for API - роль будет добавлена в authAPI.registerRestaurant
        const apiData = {
          name: formData.restaurantName,
          contactPerson: formData.contactName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
          // Роль 'restaurant' будет добавлена автоматически в API сервисе
        };
        
        // Call the API service
        const response = await authAPI.registerRestaurant(apiData);
        console.log('Registration response:', response);
        
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
      } catch (error) {
        console.error('Registration error:', error);
        
        // Handle API validation errors (field-specific errors)
        if (error.errors) {
          const fieldErrors = {};
          Object.entries(error.errors).forEach(([field, message]) => {
            // Map backend field names to frontend field names if needed
            const fieldMap = {
              name: 'restaurantName',
              contactPerson: 'contactName',
              // Add more mappings if needed
            };
            const formField = fieldMap[field] || field;
            fieldErrors[formField] = Array.isArray(message) ? message[0] : message;
          });
          setErrors(fieldErrors);
        } else {
          // Show general error message
          setErrorSnackbar({
            open: true,
            message: error.message || 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.'
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleCloseSnackbar = () => {
    setErrorSnackbar({
      ...errorSnackbar,
      open: false
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 8 }}>
        <Container>
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            sx={{ my: 5, color: 'text.primary' }}
          >
            Регистрация ресторана
          </Typography>
          
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {/* Benefits for restaurants */}
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: 'secondary.main', 
                p: 3, 
                borderRadius: 2, 
                mb: 4
              }}
            >
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}
              >
                Преимущества для вашего ресторана
              </Typography>
              <List disablePadding>
                {[
                  'Привлекайте новых клиентов через платформу Kóshpendi Menu',
                  'QR-меню — удобный способ цифровизации вашего ресторана',
                  'Аналитика заказов и предпочтений для улучшения сервиса',
                  'Удобная панель управления для обновления меню в реальном времени'
                ].map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ color: 'text.secondary' }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
            
            {/* Success Message */}
            {successMessage && (
              <Alert 
                severity="success" 
                sx={{ mb: 4 }}
              >
                {successMessage}
              </Alert>
            )}
            
            {/* Registration Form */}
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}
              >
                Заполните форму для регистрации
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  {/* Restaurant Name */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="restaurantName"
                      name="restaurantName"
                      label="Название ресторана"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      error={!!errors.restaurantName}
                      helperText={errors.restaurantName}
                      disabled={isLoading}
                    />
                  </Grid>
                  
                  {/* Contact Person Name */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="contactName"
                      name="contactName"
                      label="Контактное лицо"
                      value={formData.contactName}
                      onChange={handleChange}
                      error={!!errors.contactName}
                      helperText={errors.contactName}
                      disabled={isLoading}
                    />
                  </Grid>
                  
                  {/* Phone */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Телефон"
                      placeholder="+7 (XXX) XXX-XX-XX"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      disabled={isLoading}
                    />
                  </Grid>
                  
                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={isLoading}
                    />
                  </Grid>
                  
                  {/* Password */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      name="password"
                      label="Пароль"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      disabled={isLoading}
                    />
                  </Grid>
                  
                  {/* Confirm Password */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Подтвердите пароль"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      disabled={isLoading}
                    />
                  </Grid>
                  
                  {/* Terms Agreement */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          color="primary"
                          disabled={isLoading}
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          Я согласен с <Link href="#" color="primary">условиями использования</Link> и <Link href="#" color="primary">политикой конфиденциальности</Link>*
                        </Typography>
                      }
                    />
                    {errors.agreeTerms && (
                      <Typography variant="caption" color="error">
                        {errors.agreeTerms}
                      </Typography>
                    )}
                  </Grid>
                  
                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isLoading}
                      sx={{ mt: 2 }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Зарегистрироваться'
                      )}
                    </Button>
                    
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                      После регистрации наш менеджер свяжется с вами для уточнения деталей
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      <Footer />
      
      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorSnackbar.message}
      />
    </Box>
  );
};

export default RestaurantRegistration;