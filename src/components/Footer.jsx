import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  Divider 
} from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        py: 5, 
        borderTop: 1, 
        borderColor: 'divider',
        mt: 'auto' 
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box 
              component={RouterLink} 
              to="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                textDecoration: 'none'
              }}
            >
              <Box 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main', 
                  mr: 1 
                }} 
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Kóshpendi Menu
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Быстрые QR-меню и удобная доставка для любого ресторана
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              Навигация
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {[
                { text: 'Главная', path: '/' },
                { text: 'Рестораны', path: '/restaurants' },
                { text: 'Регистрация для ресторанов', path: '/registration' }
              ].map((item, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Link 
                    component={RouterLink} 
                    to={item.path} 
                    color="text.secondary"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' } 
                    }}
                  >
                    {item.text}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              Контакты
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {[
                'Email: info@koshpendi.kz',
                'Телефон: +7 (777) 777-77-77',
                'Адрес: г. Астана, ул. Примерная, 123'
              ].map((item, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} Kóshpendi Menu. Все права защищены.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;