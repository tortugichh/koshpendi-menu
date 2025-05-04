import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const DishCard = ({ dish }) => {
  const { cart, addToCart, updateItemQuantity, removeFromCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Check if the dish is already in the cart
  const cartItem = cart.find((item) => item.id === dish.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(dish);
    setSnackbarOpen(true);
  };

  const handleIncreaseQuantity = () => {
    updateItemQuantity(dish.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      removeFromCart(dish.id);
    } else {
      updateItemQuantity(dish.id, quantity - 1);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          height: "100%",
          borderRadius: 2,
          boxShadow: "none",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", p: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {dish.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {dish.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "primary.main" }}
                >
                  {formatCurrency(dish.price)}
                </Typography>
                {dish.weight && (
                  <Typography variant="caption" color="text.secondary">
                    {dish.weight} г
                  </Typography>
                )}
              </Box>

              {quantity > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <IconButton size="small" onClick={handleDecreaseQuantity}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ px: 2 }}>{quantity}</Typography>
                  <IconButton size="small" onClick={handleIncreaseQuantity}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleAddToCart}
                >
                  В корзину
                </Button>
              )}
            </Box>
          </CardContent>
        </Box>

        {dish.image && (
          <CardMedia
            component="img"
            sx={{
              width: 120,
              height: 120,
              objectFit: "cover",
              p: 1,
              borderRadius: 2,
            }}
            image={dish.image}
            alt={dish.name}
          />
        )}
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`${dish.name} добавлен в корзину`}
      />
    </>
  );
};

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    weight: PropTypes.number,
  }).isRequired,
};

export default DishCard;
