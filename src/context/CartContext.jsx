import { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext(null);

// Cart item type
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add an item to cart
  const addToCart = (dish) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...dish, quantity: 1 }];
      }
    });
  };

  // Remove an item from cart
  const removeFromCart = (dishId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dishId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === dishId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter(item => item.id !== dishId);
      }
    });
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};