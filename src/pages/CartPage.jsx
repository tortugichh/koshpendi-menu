import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateItemQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleOpenOrderDialog = () => {
    setIsOrderDialogOpen(true);
  };

  const handleCloseOrderDialog = () => {
    setIsOrderDialogOpen(false);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData({
      ...orderFormData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!orderFormData.name.trim()) {
      errors.name = "Обязательное поле";
    }

    if (!orderFormData.phone.trim()) {
      errors.phone = "Обязательное поле";
    } else if (
      !/^(\+7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(
        orderFormData.phone
      )
    ) {
      errors.phone = "Некорректный номер телефона";
    }

    if (!orderFormData.address.trim()) {
      errors.address = "Обязательное поле";
    }

    return errors;
  };

  const handleSubmitOrder = () => {
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      console.log("Order submitted:", {
        ...orderFormData,
        items: cart,
        totalPrice,
      });
      setOrderSuccess(true);
      clearCart();

      setOrderFormData({
        name: "",
        phone: "",
        address: "",
        comment: "",
      });

      setTimeout(() => {
        setIsOrderDialogOpen(false);
        setOrderSuccess(false);
        navigate("/");
      }, 2000);
    } else {
      setFormErrors(errors);
    }
  };

  if (cart.length === 0) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
          <Container sx={{ py: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" component="h1">
                Корзина
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 8,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ваша корзина пуста
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/restaurants")}
              >
                Перейти к выбору ресторана
              </Button>
            </Box>
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        <Container sx={{ py: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Корзина
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, mb: 3 }}>
                {cart.map((item) => (
                  <Box key={item.id}>
                    <Grid container spacing={2} sx={{ py: 2 }}>
                      <Grid item xs={3} sm={2}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: "100%",
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                      </Grid>
                      <Grid item xs={9} sm={6}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {item.weight && `${item.weight} г`}
                        </Typography>
                        <Typography variant="body2" color="primary.main">
                          {formatCurrency(item.price)}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        sm={3}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ px: 2 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sm={1}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: "sticky", top: 84 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Ваш заказ
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">
                    Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    шт.):
                  </Typography>
                  <Typography variant="body1">
                    {formatCurrency(totalPrice)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Доставка:</Typography>
                  <Typography variant="body1">{formatCurrency(199)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6">Итого:</Typography>
                  <Typography variant="h6">
                    {formatCurrency(totalPrice + 199)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleOpenOrderDialog}
                >
                  Оформить заказ
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />

      {/* Order Dialog */}
      <Dialog
        open={isOrderDialogOpen}
        onClose={handleCloseOrderDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {orderSuccess ? "Заказ оформлен" : "Оформление заказа"}
        </DialogTitle>
        <DialogContent>
          {orderSuccess ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Ваш заказ успешно оформлен! Ожидайте звонка оператора.
            </Alert>
          ) : (
            <Box sx={{ pt: 1 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel required>Имя</FormLabel>
                <TextField
                  name="name"
                  value={orderFormData.name}
                  onChange={handleInputChange}
                  placeholder="Введите ваше имя"
                  fullWidth
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel required>Телефон</FormLabel>
                <TextField
                  name="phone"
                  value={orderFormData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (999) 123-45-67"
                  fullWidth
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel required>Адрес доставки</FormLabel>
                <TextField
                  name="address"
                  value={orderFormData.address}
                  onChange={handleInputChange}
                  placeholder="Город, улица, дом, квартира"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 1 }}>
                <FormLabel>Комментарий к заказу</FormLabel>
                <TextField
                  name="comment"
                  value={orderFormData.comment}
                  onChange={handleInputChange}
                  placeholder="Комментарий к заказу или пожелания"
                  fullWidth
                  multiline
                  rows={2}
                />
              </FormControl>
            </Box>
          )}
        </DialogContent>
        {!orderSuccess && (
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseOrderDialog}>Отмена</Button>
            <Button
              variant="contained"
              onClick={handleSubmitOrder}
              disabled={cart.length === 0}
            >
              Подтвердить заказ
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default CartPage;
