import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton, 
  Button 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

const DishCard = ({ dish }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartItem = cart.find(item => item.id === dish.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  return (
    <Card 
      sx={{ 
        display: 'flex',
        height: '100%',
        p: 2,
        boxShadow: 'none'
      }}
    >
      <CardMedia
        component="img"
        sx={{ 
          width: 96, 
          height: 96, 
          borderRadius: 1,
          objectFit: 'cover' 
        }}
        image={dish.image}
        alt={dish.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 0, pb: 0, '&:last-child': { pb: 0 } }}>
          <Typography variant="subtitle1" component="h3" color="text.primary" sx={{ fontWeight: 500 }}>
            {dish.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {dish.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 500 }}>
              {formatCurrency(dish.price)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {quantity > 0 ? (
                <>
                  <IconButton
                    size="small"
                    onClick={() => removeFromCart(dish.id)}
                    color="primary"
                    aria-label="Уменьшить количество"
                    sx={{ p: 0.5 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 1, minWidth: 20, textAlign: 'center' }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => addToCart(dish)}
                    color="primary"
                    aria-label="Увеличить количество"
                    sx={{ p: 0.5 }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(dish)}
                  sx={{ py: 0.5, px: 1.5 }}
                >
                  Добавить
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default DishCard;