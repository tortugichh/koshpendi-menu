import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  CircularProgress 
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryMenu from '../components/CategoryMenu';
import DishCard from '../components/DishCard';
import Cart from '../components/Cart';
import QRInfoModal from '../components/QRInfoModal';
import { restaurants } from '../data/mockData';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [showQR, setShowQR] = useState(true);
  
  // Find restaurant by id
  useEffect(() => {
    const restaurantData = restaurants.find(r => r.id === Number(id));
    if (restaurantData) {
      setRestaurant(restaurantData);
      setActiveCategory(restaurantData.categories[0]?.id || null);
    }
  }, [id]);

  // Close QR info modal
  const closeQR = () => {
    setShowQR(false);
  };

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
                src={restaurant.logo}
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
                  {restaurant.description}
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
        
        {/* QR Info Modal */}
        <QRInfoModal 
          isOpen={showQR} 
          onClose={closeQR} 
          restaurantName={restaurant.name} 
        />
        
        {/* Categories Navigation */}
        <CategoryMenu 
          categories={restaurant.categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        {/* Dishes */}
        <Container sx={{ py: 4 }}>
          {restaurant.categories
            .filter(category => activeCategory === null || category.id === activeCategory)
            .map(category => (
              <Box key={category.id} sx={{ mb: 6 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 600, 
                    color: 'text.primary',
                    mb: 3 
                  }}
                >
                  {category.name}
                </Typography>
                <Grid container spacing={3}>
                  {category.dishes.map(dish => (
                    <Grid item xs={12} md={6} key={dish.id}>
                      <DishCard dish={dish} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
        </Container>
        
        {/* Cart Button */}
        <Cart />
      </Box>

      <Footer />
    </Box>
  );
};

export default RestaurantMenu;