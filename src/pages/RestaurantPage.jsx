import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantDetails from '../components/RestaurantDetails';
import { restaurants } from '../data/mockData';

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  
  // Find restaurant by id
  useEffect(() => {
    const restaurantData = restaurants.find(r => r.id === Number(id));
    if (restaurantData) {
      setRestaurant(restaurantData);
    }
  }, [id]);

  if (!restaurant) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        {/* Restaurant Header */}
        <Box sx={{ bgcolor: 'secondary.main', py: 3 }}>
          <Container>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src={restaurant.logo || restaurant.image}
                alt={restaurant.name}
                sx={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: 2, 
                  borderColor: 'background.paper',
                  mr: 2 
                }}
              />
              <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  {restaurant.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {restaurant.description.split('.')[0] + '.'}
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
        
        {/* Restaurant Details */}
        <Container sx={{ py: 4 }}>
          <RestaurantDetails restaurant={restaurant} />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
  
};

export default RestaurantPage;