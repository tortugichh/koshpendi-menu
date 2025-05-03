import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Pages
import Index from './pages/Index';
import RestaurantSelection from './pages/RestaurantSelection';
import RestaurantMenu from './pages/RestaurantMenu';
import RestaurantRegistration from './pages/RestaurantRegistration';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/restaurants" element={<RestaurantSelection />} />
          <Route path="/menu/:id" element={<RestaurantMenu />} />
          <Route path="/registration" element={<RestaurantRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;