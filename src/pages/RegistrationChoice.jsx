import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Typography, Paper, Button, Grid } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RegistrationChoice = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ my: 5, color: "text.primary" }}
          >
            Выберите тип регистрации
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
          >
            {/* User Registration Card */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 40, color: "primary.main" }} />
                </Box>

                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Регистрация для пользователей
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, flexGrow: 1 }}
                >
                  Создайте аккаунт пользователя, чтобы сохранять избранные
                  рестораны, отслеживать заказы и получать персональные
                  рекомендации.
                </Typography>

                <Button
                  component={RouterLink}
                  to="/user-registration"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Зарегистрироваться как пользователь
                </Button>
              </Paper>
            </Grid>

            {/* Restaurant Registration Card */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "secondary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <RestaurantIcon
                    sx={{ fontSize: 40, color: "primary.main" }}
                  />
                </Box>

                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Регистрация для ресторанов
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, flexGrow: 1 }}
                >
                  Зарегистрируйте свой ресторан на нашей платформе, чтобы
                  создать цифровое меню и расширить клиентскую базу.
                </Typography>

                <Button
                  component={RouterLink}
                  to="/registration"
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Зарегистрировать ресторан
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default RegistrationChoice;
