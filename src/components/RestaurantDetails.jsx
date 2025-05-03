import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Rating, 
  Button, 
  Chip, 
  Grid, 
  Divider,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import StarIcon from '@mui/icons-material/Star';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QRCodeModal from './QRCodeModal';
import { useState } from 'react';

const RestaurantDetails = ({ restaurant }) => {
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const handleOpenQrModal = () => {
    setQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setQrModalOpen(false);
  };

  // Placeholder for reviews - in a real app, these would come from the backend
  const reviews = [
    {
      id: 1,
      author: 'Алексей М.',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      date: '25 апреля 2025',
      comment: 'Отличное обслуживание и вкусная еда. Особенно понравились фирменные блюда. Буду рекомендовать друзьям!'
    },
    {
      id: 2,
      author: 'Елена К.',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4,
      date: '20 апреля 2025',
      comment: 'Приятная атмосфера, хорошее обслуживание. Еда вкусная, но ждали немного дольше, чем ожидали.'
    },
    {
      id: 3,
      author: 'Марат Д.',
      avatar: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      date: '15 апреля 2025',
      comment: 'Всё на высшем уровне! Особенно понравился интерьер и внимательный персонал.'
    }
  ];

  // Placeholder for features - in a real app, these would come from the backend
  const features = [
    'Бесплатный Wi-Fi',
    'Парковка',
    'Принимаем карты',
    'Детское меню',
    'Веранда',
    'Доставка'
  ];

  return (
    <Box>
      {/* Restaurant Header */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' } }}>
        <Box 
          component="img"
          src={restaurant.logo || restaurant.image}
          alt={restaurant.name}
          sx={{ 
            width: { xs: '100%', md: 300 },
            height: { xs: 200, md: 200 },
            objectFit: 'cover',
            borderRadius: 2,
            mb: { xs: 2, md: 0 },
            mr: { md: 4 }
          }}
        />
        
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mr: 2 }}>
              {restaurant.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                value={restaurant.rating}
                readOnly
                precision={0.1}
                icon={<StarIcon fontSize="small" />}
                emptyIcon={<StarIcon fontSize="small" />}
                sx={{ color: 'warning.main', mr: 0.5 }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                {restaurant.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({restaurant.reviews} отзывов)
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {restaurant.description}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {restaurant.cuisines && restaurant.cuisines.map((cuisine, index) => (
              <Chip key={index} label={cuisine} size="small" color="secondary" />
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon color="action" sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {restaurant.address || 'г. Астана, ул. Примерная, 123'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon color="action" sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {restaurant.hours || 'Пн-Вс: 10:00 - 22:00'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalPhoneIcon color="action" sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {restaurant.phone || '+7 (777) 123-45-67'}
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            color="primary"
            startIcon={<QrCodeIcon />}
            onClick={handleOpenQrModal}
            sx={{ mt: 2 }}
          >
            Показать QR-код меню
          </Button>
        </Box>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Features and Additional Info */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Особенности ресторана
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {features.map((feature, index) => (
              <Chip key={index} label={feature} />
            ))}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Дополнительная информация
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            В нашем ресторане вы можете наслаждаться изысканными блюдами в уютной атмосфере. 
            Мы предлагаем широкий выбор блюд, приготовленных из свежих местных продуктов.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Для больших групп и особых случаев рекомендуем бронировать столики заранее.
          </Typography>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Reviews */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Отзывы посетителей
        </Typography>
        
        {reviews.map((review) => (
          <Paper key={review.id} elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'secondary.main' }}>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Avatar src={review.avatar} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {review.author}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating
                    value={review.rating}
                    readOnly
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {review.date}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {review.comment}
            </Typography>
          </Paper>
        ))}
      </Box>
      
      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={qrModalOpen} 
        onClose={handleCloseQrModal} 
        restaurant={restaurant} 
      />
    </Box>
  );
};

RestaurantDetails.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    logo: PropTypes.string,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    cuisines: PropTypes.arrayOf(PropTypes.string),
    address: PropTypes.string,
    hours: PropTypes.string,
    phone: PropTypes.string
  }).isRequired,
};

export default RestaurantDetails;