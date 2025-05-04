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
  CardMedia,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCurrentUser, logout } from "../utils/auth";
import { formatCurrency } from "../utils/formatCurrency";
import QRCodeModal from "../components/QRCodeModal";

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser || currentUser.role !== 'restaurant') {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    
    setTimeout(() => {
      setRestaurant({
        id: 1,
        name: 'Ресторан "Астана"',
        logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=100&h=100',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&h=250',
        description: 'Казахская кухня',
        rating: 4.8,
        reviews: 245,
        address: 'г. Астана, ул. Примерная, 123',
        phone: '+7 (777) 123-45-67',
        email: 'info@astana-restaurant.kz',
        workingHours: 'Пн-Вс: 10:00 - 22:00'
      });
      
      setCategories([
        { id: 1, name: 'Закуски' },
        { id: 2, name: 'Основные блюда' },
        { id: 3, name: 'Напитки' }
      ]);
      
      setMenuItems([
        {
          id: 1,
          name: 'Баурсаки',
          description: 'Традиционное казахское блюдо из жареного теста',
          price: 1200,
          categoryId: 1,
          image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&h=200',
          weight: 250,
          available: true
        },
        {
          id: 2,
          name: 'Манты',
          description: 'Традиционное блюдо из тонкого теста с начинкой из мяса',
          price: 1800,
          categoryId: 1,
          image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&h=200',
          weight: 350,
          available: true
        },
        {
          id: 3,
          name: 'Бешбармак',
          description: 'Национальное казахское блюдо из мяса и теста',
          price: 3500,
          categoryId: 2,
          image: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&w=200&h=200',
          weight: 450,
          available: true
        },
        {
          id: 4,
          name: 'Плов',
          description: 'Блюдо из риса с мясом и овощами',
          price: 2800,
          categoryId: 2,
          image: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&w=200&h=200',
          weight: 400,
          available: false
        },
        {
          id: 5,
          name: 'Кумыс',
          description: 'Традиционный кисломолочный напиток из кобыльего молока',
          price: 800,
          categoryId: 3,
          image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=200&h=200',
          weight: 200,
          available: true
        }
      ]);
      
      setOrders([
        {
          id: 1,
          customer: 'Алексей М.',
          date: '03.05.2025',
          status: 'Доставлен',
          total: 7500,
          items: [
            { name: 'Бешбармак', quantity: 2, price: 3500 },
            { name: 'Кумыс', quantity: 1, price: 500 }
          ]
        },
        {
          id: 2,
          customer: 'Елена К.',
          date: '03.05.2025',
          status: 'В процессе',
          total: 3600,
          items: [
            { name: 'Манты', quantity: 2, price: 1800 }
          ]
        },
        {
          id: 3,
          customer: 'Марат Д.',
          date: '02.05.2025',
          status: 'Доставлен',
          total: 4200,
          items: [
            { name: 'Баурсаки', quantity: 1, price: 1200 },
            { name: 'Бешбармак', quantity: 1, price: 3500 }
          ]
        }
      ]);
      
      setStatistics({
        totalOrders: 245,
        totalRevenue: 875000,
        averageOrderValue: 3571,
        topDishes: [
          { name: 'Бешбармак', count: 87 },
          { name: 'Манты', count: 65 },
          { name: 'Баурсаки', count: 54 }
        ]
      });
      
      setIsLoading(false);
    }, 1000);
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

  const handleOpenQrModal = () => {
    setQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setQrModalOpen(false);
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

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Без категории';
  };

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
            Кабинет ресторана
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
                    src={restaurant?.logo}
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {restaurant?.name || "Ресторан"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant?.email || "email@example.com"}
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
                    <ListItemText primary="Информация" />
                  </ListItem>
                  <ListItem
                    button
                    selected={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemIcon>
                      <RestaurantMenuIcon color={activeTab === 1 ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Меню" />
                  </ListItem>
                  <ListItem
                    button
                    selected={activeTab === 2}
                    onClick={() => setActiveTab(2)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemIcon>
                      <ReceiptLongIcon color={activeTab === 2 ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Заказы" />
                  </ListItem>
                  <ListItem
                    button
                    selected={activeTab === 3}
                    onClick={() => setActiveTab(3)}
                    sx={{ borderRadius: 1, mb: 1 }}
                  >
                    <ListItemIcon>
                      <BarChartIcon color={activeTab === 3 ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Статистика" />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<QrCodeIcon />}
                  onClick={handleOpenQrModal}
                  sx={{ mb: 2 }}
                >
                  QR-код меню
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={handleOpenLogoutDialog}
                >
                  Выйти
                </Button>
              </Paper>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={9}>
              {/* Restaurant Info Tab */}
              {activeTab === 0 && (
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Информация о ресторане
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<EditIcon />}
                    >
                      Редактировать
                    </Button>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Card sx={{ height: '100%' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={restaurant?.image}
                          alt={restaurant?.name}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Card sx={{ height: '100%', p: 2 }}>
                        <CardContent>
                          <Typography variant="subtitle2" color="text.secondary">
                            Название
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {restaurant?.name}
                          </Typography>
                          
                          <Typography variant="subtitle2" color="text.secondary">
                            Описание
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {restaurant?.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 1 }}>
                              Рейтинг:
                            </Typography>
                            <Chip 
                              label={restaurant?.rating} 
                              color="warning" 
                              size="small" 
                              sx={{ color: 'white', fontWeight: 'bold' }}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({restaurant?.reviews} отзывов)
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Контактная информация
                          </Typography>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="text.secondary">
                                Адрес
                              </Typography>
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                {restaurant?.address}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="text.secondary">
                                Часы работы
                              </Typography>
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                {restaurant?.workingHours}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="text.secondary">
                                Телефон
                              </Typography>
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                {restaurant?.phone}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="text.secondary">
                                Email
                              </Typography>
                              <Typography variant="body1" sx={{ mb: 2 }}>
                                {restaurant?.email}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Menu Tab */}
              {activeTab === 1 && (
                <>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Меню ресторана
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                    >
                      Добавить блюдо
                    </Button>
                  </Box>
                  
                  <Tabs
                    value={0}
                    sx={{ mb: 3 }}
                  >
                    <Tab label="Все категории" />
                    {categories.map((category) => (
                      <Tab key={category.id} label={category.name} />
                    ))}
                  </Tabs>
                  
                  <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Изображение</TableCell>
                          <TableCell>Название</TableCell>
                          <TableCell>Категория</TableCell>
                          <TableCell>Цена</TableCell>
                          <TableCell>Вес</TableCell>
                          <TableCell>Статус</TableCell>
                          <TableCell>Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {menuItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Box
                                component="img"
                                src={item.image}
                                alt={item.name}
                                sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {item.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.description}
                              </Typography>
                            </TableCell>
                            <TableCell>{getCategoryName(item.categoryId)}</TableCell>
                            <TableCell>{formatCurrency(item.price)}</TableCell>
                            <TableCell>{item.weight} г</TableCell>
                            <TableCell>
                              <Chip
                                label={item.available ? 'Доступно' : 'Недоступно'}
                                color={item.available ? 'success' : 'error'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton size="small" color="primary">
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="error">
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}

              {/* Orders Tab */}
              {activeTab === 2 && (
                <>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Заказы
                  </Typography>
                  
                  <Tabs
                    value={0}
                    sx={{ mb: 3 }}
                  >
                    <Tab label="Все заказы" />
                    <Tab label="В процессе" />
                    <Tab label="Доставлены" />
                  </Tabs>
                  
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
                          Клиент: {order.customer} • {order.date}
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
                            gap: 1
                          }}
                        >
                          {order.status !== "Доставлен" && (
                            <Button
                              variant="contained"
                              size="small"
                            >
                              Изменить статус
                            </Button>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                          >
                            Подробнее
                          </Button>
                        </Box>
                      </Paper>
                    ))
                  ) : (
                    <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        Нет заказов
                      </Typography>
                    </Paper>
                  )}
                </>
              )}

              {/* Statistics Tab */}
              {activeTab === 3 && (
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Статистика ресторана
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, bgcolor: 'secondary.main' }}>
                        <CardContent>
                          <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {statistics?.totalOrders || 0}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            Всего заказов
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, bgcolor: 'secondary.main' }}>
                        <CardContent>
                          <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {formatCurrency(statistics?.totalRevenue || 0)}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            Общая выручка
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, bgcolor: 'secondary.main' }}>
                        <CardContent>
                          <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {formatCurrency(statistics?.averageOrderValue || 0)}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            Средний чек
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, bgcolor: 'secondary.main' }}>
                        <CardContent>
                          <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {restaurant?.rating || 0}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            Рейтинг
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Популярные блюда
                  </Typography>
                  
                  <TableContainer component={Paper} sx={{ mb: 4 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Название блюда</TableCell>
                          <TableCell align="right">Количество заказов</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {statistics?.topDishes.map((dish, index) => (
                          <TableRow key={index}>
                            <TableCell>{dish.name}</TableCell>
                            <TableCell align="right">{dish.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Период аналитики
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="От"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        defaultValue="2025-04-01"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="До"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        defaultValue="2025-05-01"
                      />
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained">
                      Применить
                    </Button>
                  </Box>
                </Paper>
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
      
      {/* QR Code Modal */}
      {restaurant && (
        <QRCodeModal
          isOpen={qrModalOpen}
          onClose={handleCloseQrModal}
          restaurant={restaurant}
        />
      )}
    </Box>
  );
};

export default RestaurantDashboard;