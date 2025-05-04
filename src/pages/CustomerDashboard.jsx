import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCurrentUser, logout } from "../utils/auth";
import { formatCurrency } from "../utils/formatCurrency";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = getCurrentUser();
    
    if (!currentUser || currentUser.role !== 'customer') {
      // Redirect to login if not logged in or not a customer
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    
    // Simulate loading orders and favorites
    setTimeout(() => {
      // Mock data for orders
      setOrders([
        {
          id: 1,
          restaurant: "Ресторан \"Астана\"",
          date: "03.05.2025",
          status: "Доставлен",
          total: 7500,
          items: [
            { name: "Бешбармак", quantity: 2, price: 3500 },
            { name: "Кумыс", quantity: 1, price: 500 }
          ]
        },
        {
          id: 2,
          restaurant: "Пиццерия \"Маргарита\"",
          date: "28.04.2025",
          status: "Доставлен",
          total: 4200,
          items: [
            { name: "Пицца Маргарита", quantity: 1, price: 2500 },
            { name: "Тирамису", quantity: 1, price: 1700 }
          ]
        }
      ]);
      
      // Mock data for favorite restaurants
      setFavorites([
        {
          id: 1,
          name: "Ресторан \"Астана\"",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&h=250",
          rating: 4.8
        },
        {
          id: 4,
          name: "Суши-бар \"Токио\"",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&h=250",
          rating: 4.9
        }
      ]);
      
      setIsLoading(false);
    }, 1000); // Simulate API call delay
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = () => {
    logout();
    setLogoutDialogOpen(false);
    navigate('/');
  };

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 8,
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 8 }}>
        <Container>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 4, color: "text.primary" }}
          >
            Личный кабинет
          </Typography>

          <Grid container spacing={4}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "primary.main",
                      mb: 2,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user?.username || "Пользователь"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email || "email@example.com"}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List disablePadding>
                  <ListItem
                    button
                    selected={activeTab === 0}
                    onClick={() => setActiveTab(0)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemIcon>
                      <PersonIcon color={activeTab === 0 ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Профиль" />
                  </ListItem>
                  <ListItem
                    button
                    selected={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemIcon>
                      <ReceiptLongIcon color={activeTab === 1 ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Мои заказы" />
                  </ListItem>
                  <ListItem
                    button
                    selected={activeTab === 2}
                    onClick={() => setActiveTab(2)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemIcon>
                      <FavoriteIcon color={activeTab === 2 ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Избранное" />
                  </ListItem>
                  <ListItem
                    button
                    selected={activeTab === 3}
                    onClick={() => setActiveTab(3)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemIcon>
                      <RateReviewIcon color={activeTab === 3 ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Отзывы" />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={handleOpenLogoutDialog}
                  sx={{ mt: 1 }}
                >
                  Выйти
                </Button>
              </Paper>

              {/* Quick Links */}
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Быстрые ссылки
                </Typography>
                <List disablePadding>
                  <ListItem
                    button
                    component={RouterLink}
                    to="/restaurants"
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemIcon>
                      <RestaurantIcon />
                    </ListItemIcon>
                    <ListItemText primary="Найти ресторан" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={9}>
              {/* Profile Tab */}
              {activeTab === 0 && (
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Информация о профиле
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Имя пользователя
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {user?.username || "Не указано"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {user?.email || "Не указано"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Телефон
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {user?.phone || "Не указано"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Адрес
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {user?.address || "Не указано"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained">Редактировать профиль</Button>
                  </Box>
                </Paper>
              )}

              {/* Orders Tab */}
              {activeTab === 1 && (
                <>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Мои заказы
                  </Typography>

                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <Paper
                        key={order.id}
                        sx={{ p: 3, borderRadius: 2, mb: 3 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Заказ #{order.id}
                          </Typography>
                          <Box
                            sx={{
                              bgcolor:
                                order.status === "Доставлен"
                                  ? "success.main"
                                  : "warning.main",
                              color: "white",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            {order.status}
                          </Box>
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {order.restaurant} • {order.date}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <List disablePadding>
                          {order.items.map((item, index) => (
                            <ListItem
                              key={index}
                              disablePadding
                              sx={{ py: 1 }}
                            >
                              <ListItemText
                                primary={item.name}
                                secondary={`${item.quantity} x ${formatCurrency(item.price)}`}
                              />
                              <Typography>
                                {formatCurrency(item.quantity * item.price)}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Итого:
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, color: "primary.main" }}
                          >
                            {formatCurrency(order.total)}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            component={RouterLink}
                            to={`/orders/${order.id}`}
                          >
                            Подробнее
                          </Button>
                        </Box>
                      </Paper>
                    ))
                  ) : (
                    <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        У вас пока нет заказов
                      </Typography>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/restaurants"
                        sx={{ mt: 2 }}
                      >
                        Найти ресторан
                      </Button>
                    </Paper>
                  )}
                </>
              )}

              {/* Favorites Tab */}
              {activeTab === 2 && (
                <>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Избранное
                  </Typography>

                  {favorites.length > 0 ? (
                    <Grid container spacing={3}>
                      {favorites.map((restaurant) => (
                        <Grid item xs={12} sm={6} key={restaurant.id}>
                          <Card
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                height: 160,
                                backgroundImage: `url(${restaurant.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="subtitle1"
                                component="h3"
                                sx={{ fontWeight: 600 }}
                              >
                                {restaurant.name}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mt: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    bgcolor: "warning.main",
                                    color: "white",
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    mr: 1,
                                  }}
                                >
                                  {restaurant.rating}
                                </Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Рейтинг
                                </Typography>
                              </Box>
                            </CardContent>
                            <CardActions sx={{ px: 2, pb: 2 }}>
                              <Button
                                size="small"
                                component={RouterLink}
                                to={`/restaurant/${restaurant.id}`}
                              >
                                Посмотреть
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                startIcon={<FavoriteIcon />}
                              >
                                Убрать из избранного
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        У вас пока нет избранных ресторанов
                      </Typography>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/restaurants"
                        sx={{ mt: 2 }}
                      >
                        Найти ресторан
                      </Button>
                    </Paper>
                  )}
                </>
              )}

              {/* Reviews Tab */}
              {activeTab === 3 && (
                <>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Мои отзывы
                  </Typography>
                  
                  <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      У вас пока нет отзывов
                    </Typography>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/restaurants"
                      sx={{ mt: 2 }}
                    >
                      Найти ресторан
                    </Button>
                  </Paper>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleCloseLogoutDialog}
      >
        <DialogTitle>Выйти из аккаунта?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите выйти из своего аккаунта?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog}>Отмена</Button>
          <Button onClick={handleLogout} color="error" autoFocus>
            Выйти
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerDashboard;