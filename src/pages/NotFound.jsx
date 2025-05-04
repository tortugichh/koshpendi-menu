import { useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper 
} from '@mui/material';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'secondary.main'
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={2}
          sx={{ 
            textAlign: 'center', 
            p: 4, 
            borderRadius: 2 
          }}
        >
          <Box 
            sx={{ 
              width: 96, 
              height: 96, 
              bgcolor: 'primary.light', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: '50%', 
              mx: 'auto', 
              mb: 3 
            }}
          >
            <Typography 
              variant="h3" 
              component="span" 
              color="primary.main" 
              fontWeight="bold"
            >
              404
            </Typography>
          </Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Страница не найдена
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            К сожалению, страница, которую вы ищете, не существует или была перемещена.
          </Typography>
          <Button 
            component={RouterLink} 
            to="/" 
            variant="contained" 
            color="primary"
            size="large"
          >
            Вернуться на главную
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;