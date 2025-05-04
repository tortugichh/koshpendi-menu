import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
  CircularProgress,
  Snackbar
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authAPI } from "../services/api";
import { storeTokens, getCurrentUser } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState({
    open: false,
    message: ""
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      if (user.role === 'restaurant') {
        navigate('/restaurant-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Имя пользователя обязательно";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);

      try {
        const credentials = {
          email: formData.email,
          password: formData.password
        };
        
        console.log('Attempting login with:', credentials.email);
        
        const response = await authAPI.login(credentials);
        console.log('Login successful');
        
        if (storeTokens(response.access, response.refresh, response.user)) {
          const user = response.user;
          if (user.role === 'restaurant') {
            navigate('/restaurant-dashboard');
          } else {
            navigate('/customer-dashboard');
          }
        } else {
          throw new Error('Failed to store authentication data');
        }
      } catch (error) {
        console.error('Login error details:', error);
        
        let errorMessage = 'Неверное имя пользователя или пароль';
        
        if (error) {
          if (typeof error === 'string') {
            errorMessage = error;
          } else if (error.detail) {
            errorMessage = error.detail;
          } else if (error.non_field_errors && error.non_field_errors.length > 0) {
            errorMessage = error.non_field_errors[0];
          } else if (error.message) {
            errorMessage = error.message;
          } else if (error.email) {
            setErrors(prev => ({ ...prev, email: Array.isArray(error.email) ? error.email[0] : error.email }));
          } else if (error.password) {
            setErrors(prev => ({ ...prev, password: Array.isArray(error.password) ? error.password[0] : error.password }));
          }
        }
        
        setErrorSnackbar({
          open: true,
          message: errorMessage
        });
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 8 }}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ my: 5, color: "text.primary" }}
          >
            Вход в аккаунт
          </Typography>

          {/* Login Form */}
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: "text.primary",
                textAlign: "center",
              }}
            >
              Введите данные для входа
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: "100%" }}
            >
              <Grid container spacing={3} sx={{ width: "100%", m: 0 }}>
                {/* Username */}
                <Grid item xs={12} sx={{ p: 0, pt: 3, width: "100%" }}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Почта"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ width: "100%" }}
                    disabled={isLoading}
                  />
                </Grid>

                {/* Password */}
                <Grid item xs={12} sx={{ p: 0, pt: 3, width: "100%" }}>
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
                    sx={{ width: "100%" }}
                    disabled={isLoading}
                  />
                </Grid>

                {/* Submit Button and Register Link */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    p: 0,
                    pt: 3,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ width: "48%" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Войти'
                    )}
                  </Button>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ width: "48%", textAlign: "right" }}
                  >
                    Нет аккаунта?{" "}
                    <Link component={RouterLink} to="/registration-choice" color="primary">
                      Зарегистрироваться
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
      
      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorSnackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;