import { Button, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return null;
  }

  // Helper function to get the correct word form for the number of items
  const getWordForm = (count) => {
    if (count === 1) return "блюдо";
    if (count > 1 && count < 5) return "блюда";
    return "блюд";
  };

  const handleCartClick = () => {
    // Более прямой способ перехода на страницу корзины
    window.location.href = "#/cart";
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 20,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ShoppingCartIcon />}
        onClick={handleCartClick}
        sx={{
          px: 3,
          py: 1.5,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {totalItems} {getWordForm(totalItems)} на {formatCurrency(totalPrice)}
      </Button>
    </Box>
  );
};

export default Cart;
