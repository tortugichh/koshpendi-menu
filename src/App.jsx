import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import theme from "./theme";

import Index from "./pages/Index";
import RestaurantSelection from "./pages/RestaurantSelection";
import RestaurantMenu from "./pages/RestaurantMenu";
import RestaurantRegistration from "./pages/RestaurantRegistration";
import RegistrationChoice from "./pages/RegistrationChoice";
import UserRegistration from "./pages/UserRegistration";
import NotFound from "./pages/NotFound";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage from "./pages/CartPage";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <HashRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/restaurants" element={<RestaurantSelection />} />
            <Route path="/menu/:id" element={<RestaurantMenu />} />
            <Route path="/registration" element={<RestaurantRegistration />} />
            <Route
              path="/registration-choice"
              element={<RegistrationChoice />}
            />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
