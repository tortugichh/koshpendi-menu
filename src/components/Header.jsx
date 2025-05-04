import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { getCurrentUser, isAuthenticated, logout } from "../utils/auth";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setUser(getCurrentUser());
  }, []);

  const menuItems = [
    { text: "Рестораны", path: "/restaurants" },
    { text: "Регистрация", path: "/registration-choice", hideWhenAuth: true },
    { text: "Вход", path: "/login", hideWhenAuth: true },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  const handleProfileClick = () => {
    handleUserMenuClose();
    
    if (user && user.role === 'restaurant') {
      navigate('/restaurant-dashboard');
    } else {
      navigate('/customer-dashboard');
    }
  };
  
  const handleLogout = () => {
    logout();
    setUser(null);
    setAuthenticated(false);
    handleUserMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="fixed"
    sx={{
      bgcolor: "rgb(255, 251, 249)",
      boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.1)",
    }}>
      <Container>
        <Toolbar disableGutters sx={{ height: 64 }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src="/logologo.jpg"
              alt="Kóshpendi Menu Logo"
              style={{
                width: 150, 
                height: "150",
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                component={RouterLink}
                to="/restaurants"
                sx={{
                  color: "text.primary",
                  mx: 1,
                  "&:hover": { color: "primary.main" },
                }}
              >
                Рестораны
              </Button>

              {/* Show these buttons only when not authenticated */}
              {!authenticated && (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: "text.primary",
                      mx: 1,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    Вход
                  </Button>
                  
                  {/* Registration Button with highlight */}
                  <Button
                    component={RouterLink}
                    to="/registration-choice"
                    variant="contained"
                    color="primary"
                    sx={{ ml: 1 }}
                  >
                    Регистрация
                  </Button>
                </>
              )}
              
              {/* User Avatar and Menu when authenticated */}
              {authenticated && (
                <>
                  <IconButton 
                    onClick={handleUserMenuOpen}
                    sx={{ ml: 1 }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontSize: '0.875rem'
                      }}
                    >
                      {user && user.username ? user.username.charAt(0).toUpperCase() : <PersonIcon />}
                    </Avatar>
                  </IconButton>
                  
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleProfileClick}>
                      Личный кабинет
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      Выйти
                    </MenuItem>
                  </Menu>
                </>
              )}
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
      {/* Mobile Drawer Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "primary.main",
                mr: 1,
              }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Kóshpendi Menu
            </Typography>
          </Box>
          
          {/* Show user info when authenticated */}
          {authenticated && (
            <Box 
              sx={{ 
                p: 2, 
                borderBottom: "1px solid", 
                borderColor: "divider",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  bgcolor: 'primary.main',
                  color: 'white',
                  mr: 2
                }}
              >
                {user && user.username ? user.username.charAt(0).toUpperCase() : <PersonIcon />}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">
                  {user?.username || "Пользователь"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.role === 'restaurant' ? 'Ресторан' : 'Покупатель'}
                </Typography>
              </Box>
            </Box>
          )}
          
          <List>
            {menuItems.map((item, index) => (
              (!authenticated || !item.hideWhenAuth) && (
                <ListItem
                  key={index}
                  button
                  component={RouterLink}
                  to={item.path}
                  onClick={toggleDrawer}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ color: "text.primary" }}
                  />
                </ListItem>
              )
            ))}
            
            {/* Add these items when authenticated */}
            {authenticated && (
              <>
                <ListItem
                  button
                  onClick={() => {
                    toggleDrawer();
                    handleProfileClick();
                  }}
                >
                  <ListItemText
                    primary="Личный кабинет"
                    primaryTypographyProps={{ color: "text.primary" }}
                  />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  onClick={() => {
                    toggleDrawer();
                    handleLogout();
                  }}
                >
                  <ListItemText
                    primary="Выйти"
                    primaryTypographyProps={{ color: "error" }}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
