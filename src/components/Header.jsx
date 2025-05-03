import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Container, 
  useMediaQuery,
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Рестораны', path: '/restaurants' },
    { text: 'Регистрация для ресторанов', path: '/registration' }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="fixed" color="background">
      <Container>
        <Toolbar disableGutters sx={{ height: 64 }}>
          {/* Logo */}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                bgcolor: 'primary.main', 
                mr: 1 
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Kóshpendi Menu
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    color: 'text.primary',
                    mx: 1,
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton 
              color="inherit" 
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 250 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                bgcolor: 'primary.main', 
                mr: 1 
              }} 
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Kóshpendi Menu
            </Typography>
          </Box>
          <List>
            {menuItems.map((item, index) => (
              <ListItem 
                key={index} 
                button 
                component={RouterLink} 
                to={item.path}
                onClick={toggleDrawer}
              >
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ color: 'text.primary' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;