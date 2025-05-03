import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Alert
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/mockData';

const RestaurantSelection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 8 }}>
        <Container>
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            sx={{ my: 5, color: 'text.primary' }}
          >
            Выберите ресторан
          </Typography>
          
          {/* Search */}
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            placeholder="Поиск ресторана или кухни..."
          />
          
          {/* QR instruction box */}
          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: 'secondary.main', 
              p: 3, 
              borderRadius: 2, 
              mb: 5, 
              textAlign: 'center' 
            }}
          >
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ mb: 1, color: 'text.primary' }}
            >
              Как использовать QR-код в ресторане
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Отсканируйте QR-код на столике ресторана с помощью камеры телефона, 
              чтобы получить доступ к меню напрямую
            </Typography>
          </Paper>
          
          {/* Restaurant List */}
          {filteredRestaurants.length > 0 ? (
            <Grid container spacing={3}>
              {filteredRestaurants.map(restaurant => (
                <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                  <RestaurantCard restaurant={restaurant} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" component="h3" sx={{ mb: 1, color: 'text.primary' }}>
                Рестораны не найдены
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Попробуйте изменить поисковый запрос
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default RestaurantSelection;