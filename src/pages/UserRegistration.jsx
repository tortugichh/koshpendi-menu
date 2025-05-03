import { useState } from "react";
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
  Alert,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
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

    if (!formData.username.trim()) {
      newErrors.username = "Имя пользователя обязательно";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Неверный формат email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль должен содержать минимум 8 символов";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Вы должны согласиться с условиями";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // In a real app, this would send the data to the server
      console.log("Form submitted:", formData);

      setSuccessMessage(
        "Регистрация успешно завершена! Теперь вы можете войти в свой аккаунт."
      );

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
    }
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
            Регистрация пользователя
          </Typography>

          {/* Success Message */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 4 }}>
              {successMessage}
            </Alert>
          )}

          {/* Registration Form */}
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
              Создайте аккаунт
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
                    id="username"
                    name="username"
                    label="Имя пользователя"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{ width: "100%" }}
                    inputProps={{ style: { width: "100%" } }}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sx={{ p: 0, pt: 3, width: "100%" }}>
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
                    sx={{ width: "100%" }}
                    inputProps={{ style: { width: "100%" } }}
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
                    inputProps={{ style: { width: "100%" } }}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12} sx={{ p: 0, pt: 3, width: "100%" }}>
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
                    sx={{ width: "100%" }}
                    inputProps={{ style: { width: "100%" } }}
                  />
                </Grid>

                {/* Terms Agreement */}
                <Grid item xs={12} sx={{ p: 0, pt: 3, width: "100%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        Я согласен с{" "}
                        <Link href="#" color="primary">
                          условиями использования
                        </Link>{" "}
                        и{" "}
                        <Link href="#" color="primary">
                          политикой конфиденциальности
                        </Link>
                        *
                      </Typography>
                    }
                  />
                  {errors.agreeTerms && (
                    <Typography variant="caption" color="error">
                      {errors.agreeTerms}
                    </Typography>
                  )}
                </Grid>

                {/* Submit Button and Login Link */}
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
                  >
                    Зарегистрироваться
                  </Button>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ width: "48%", textAlign: "right" }}
                  >
                    Уже есть аккаунт?{" "}
                    <Link href="#" color="primary">
                      Войти
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserRegistration;
