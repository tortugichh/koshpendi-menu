import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EditIcon from "@mui/icons-material/Edit";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PeopleIcon from "@mui/icons-material/People";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Index = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: alpha(theme.palette.secondary.main, 0.5),
            py: { xs: 8, md: 12 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 4,
              }}
            >
              {/* Text Content */}
              <Box
                sx={{
                  flex: 1,
                  animation: "fadeIn 1s ease-in",
                  textAlign: { xs: "center", md: "left" },
                  maxWidth: { md: "50%" },
                }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  color="text.primary"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Быстрые QR-меню и удобная доставка
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 4 }}
                >
                  Kóshpendi Menu — современная платформа для цифровизации вашего
                  ресторана
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/restaurants"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                  >
                    Найти ресторан
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/registration"
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    Зарегистрировать ресторан
                  </Button>
                </Box>
              </Box>

              {/* Image */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: { md: "50%" },
                }}
              >
                <Box
                  component="img"
                  src="/photo.png"
                  alt="QR меню на смартфоне"
                  sx={{
                    borderRadius: 2,
                    boxShadow: 4,
                    width: "100%",
                    maxWidth: 500,
                    height: "auto",
                  }}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Benefits for Customers */}
        <Box sx={{ py: 8 }}>
          <Container>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Преимущества для клиентов
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  icon: <MenuBookIcon fontSize="large" />,
                  title: "Быстрый доступ к меню",
                  description:
                    "Отсканируйте QR-код и получите доступ к актуальному меню ресторана",
                },
                {
                  icon: <ShoppingBagIcon fontSize="large" />,
                  title: "Удобный заказ",
                  description:
                    "Заказывайте еду прямо через мобильное устройство без ожидания официанта",
                },
                {
                  icon: <LocalShippingIcon fontSize="large" />,
                  title: "Удобная доставка",
                  description:
                    "Закажите доставку еды из любимого ресторана с отслеживанием заказа",
                },
              ].map((benefit, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      textAlign: "center",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: alpha(theme.palette.secondary.main, 0.7),
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                        color: "primary.main",
                      }}
                    >
                      {benefit.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      color="text.primary"
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Benefits for Restaurants */}
        <Box sx={{ py: 8, bgcolor: "secondary.main" }}>
          <Container>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Преимущества для ресторанов
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  icon: <EditIcon fontSize="large" />,
                  title: "Легкое обновление меню",
                  description:
                    "Обновляйте меню в реальном времени через простой интерфейс",
                },
                {
                  icon: <ShowChartIcon fontSize="large" />,
                  title: "Аналитика заказов",
                  description:
                    "Получайте подробную статистику по заказам и предпочтениям клиентов",
                },
                {
                  icon: <PeopleIcon fontSize="large" />,
                  title: "Расширение аудитории",
                  description:
                    "Привлекайте новых клиентов через платформу доставки",
                },
              ].map((benefit, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      textAlign: "center",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "background.paper",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                        color: "primary.main",
                        border: 1,
                        borderColor: "primary.main",
                      }}
                    >
                      {benefit.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      color="text.primary"
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Call to Action */}
        <Box sx={{ py: 8 }}>
          <Container>
            <Box sx={{ textAlign: "center", maxWidth: 700, mx: "auto" }}>
              <Typography
                variant="h4"
                component="h2"
                color="text.primary"
                gutterBottom
              >
                Готовы начать?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                Присоединяйтесь к Kóshpendi Menu сегодня и переведите свой
                ресторан на новый уровень обслуживания
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  component={RouterLink}
                  to="/registration"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Зарегистрировать ресторан
                </Button>
                <Button
                  component={RouterLink}
                  to="/restaurants"
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Найти ресторан
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Index;
