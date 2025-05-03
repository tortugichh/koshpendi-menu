import PropTypes from 'prop-types';
import { Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

const DishCard = ({ dish }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartItem = cart.find(item => item.id === dish.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  return (
    <div className="card flex">
      <img 
        src={dish.image} 
        alt={dish.name} 
        className="w-24 h-24 object-cover rounded-kosh-sm"
      />
      <div className="ml-4 flex-grow">
        <h3 className="text-koshpendi-text-dark font-medium">{dish.name}</h3>
        <p className="text-koshpendi-text-light text-sm line-clamp-2">{dish.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-koshpendi-text-dark font-medium">
            {formatCurrency(dish.price)}
          </span>
          <div className="flex items-center">
            {quantity > 0 ? (
              <>
                <button 
                  onClick={() => removeFromCart(dish.id)}
                  className="p-1 text-koshpendi-primary hover:bg-koshpendi-secondary rounded-full"
                  aria-label="Уменьшить количество"
                >
                  <Minus size={18} />
                </button>
                <span className="mx-2 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => addToCart(dish)}
                  className="p-1 text-koshpendi-primary hover:bg-koshpendi-secondary rounded-full"
                  aria-label="Увеличить количество"
                >
                  <Plus size={18} />
                </button>
              </>
            ) : (
              <button 
                onClick={() => addToCart(dish)}
                className="btn-primary py-1 px-3 text-sm"
              >
                Добавить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default DishCard;