import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const Cart = () => {
  const { cart, totalItems, totalPrice } = useCart();
  
  if (cart.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-20">
      <button className="btn-primary shadow-lg flex items-center px-6 py-3">
        <ShoppingCart size={20} />
        <span className="ml-2">
          {totalItems} {totalItems === 1 ? 'блюдо' : totalItems > 1 && totalItems < 5 ? 'блюда' : 'блюд'} на {formatCurrency(totalPrice)}
        </span>
      </button>
    </div>
  );
};

export default Cart;