import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryMenu from '../components/CategoryMenu';
import DishCard from '../components/DishCard';
import Cart from '../components/Cart';
import QRInfoModal from '../components/QRInfoModal';
import { restaurants } from '../data/mockData';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [showQR, setShowQR] = useState(true);
  
  // Find restaurant by id
  useEffect(() => {
    const restaurantData = restaurants.find(r => r.id === Number(id));
    if (restaurantData) {
      setRestaurant(restaurantData);
      setActiveCategory(restaurantData.categories[0]?.id || null);
    }
  }, [id]);

  // Close QR info modal
  const closeQR = () => {
    setShowQR(false);
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Restaurant Header */}
        <div className="bg-koshpendi-secondary py-6">
          <div className="container-custom flex items-center">
            <img 
              src={restaurant.logo} 
              alt={restaurant.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white mr-4"
            />
            <div>
              <h1 className="text-koshpendi-text-dark text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-koshpendi-text-light">{restaurant.description}</p>
            </div>
          </div>
        </div>
        
        {/* QR Info Modal */}
        <QRInfoModal 
          isOpen={showQR} 
          onClose={closeQR} 
          restaurantName={restaurant.name} 
        />
        
        {/* Categories Navigation */}
        <CategoryMenu 
          categories={restaurant.categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        {/* Dishes */}
        <div className="container-custom py-8">
          {restaurant.categories
            .filter(category => activeCategory === null || category.id === activeCategory)
            .map(category => (
              <div key={category.id} className="mb-12">
                <h2 className="text-koshpendi-text-dark text-2xl font-semibold mb-6">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.dishes.map(dish => (
                    <DishCard key={dish.id} dish={dish} />
                  ))}
                </div>
              </div>
            ))}
        </div>
        
        {/* Cart Button */}
        <Cart />
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantMenu;