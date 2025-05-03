import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link 
      to={`/menu/${restaurant.id}`} 
      className="card hover:scale-[1.02] transition-transform block"
    >
      <img 
        src={restaurant.image} 
        alt={restaurant.name} 
        className="w-full h-48 object-cover rounded-t-kosh-md"
      />
      <div className="p-kosh-md">
        <h3 className="text-koshpendi-text-dark font-medium">{restaurant.name}</h3>
        <p className="text-koshpendi-text-light text-sm">{restaurant.description}</p>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {/* Star icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-yellow-500" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
              />
            </svg>
            <span className="ml-1 text-sm font-medium text-koshpendi-text-dark">
              {restaurant.rating}
            </span>
          </div>
          <span className="mx-2 text-koshpendi-text-light">•</span>
          <span className="text-sm text-koshpendi-text-light">
            {restaurant.reviews} отзывов
          </span>
        </div>
        
        <button className="btn-primary w-full mt-4">
          Посмотреть меню
        </button>
      </div>
    </Link>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
  }).isRequired,
};

export default RestaurantCard;