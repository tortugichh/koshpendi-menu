import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Button, 
  Rating 
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card 
      component={Link} 
      to={`/menu/${restaurant.id}`} 
      sx={{ 
        textDecoration: 'none',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="192"
          image={restaurant.image}
          alt={restaurant.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" component="h3" color="text.primary">
            {restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {restaurant.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                value={restaurant.rating}
                readOnly
                precision={0.1}
                icon={<StarIcon fontSize="small" />}
                emptyIcon={<StarIcon fontSize="small" />}
                sx={{ color: 'warning.main', mr: 0.5 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                {restaurant.rating}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>•</Typography>
            <Typography variant="body2" color="text.secondary">
              {restaurant.reviews} отзывов
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
            Посмотреть меню
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
  }).isRequired,
};

export default RestaurantCard;