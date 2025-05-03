import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/mockData';

const RestaurantSelection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16 pb-16">
        <div className="container-custom">
          <h1 className="text-center text-koshpendi-text-dark my-10">Выберите ресторан</h1>
          
          {/* Search */}
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            placeholder="Поиск ресторана или кухни..."
          />
          
          {/* QR instruction box */}
          <div className="bg-koshpendi-secondary p-kosh-lg rounded-kosh-md mb-10 text-center">
            <h3 className="text-koshpendi-text-dark mb-2">Как использовать QR-код в ресторане</h3>
            <p className="text-koshpendi-text-light">
              Отсканируйте QR-код на столике ресторана с помощью камеры телефона, 
              чтобы получить доступ к меню напрямую
            </p>
          </div>
          
          {/* Restaurant List */}
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-koshpendi-text-dark mb-2">Рестораны не найдены</h3>
              <p className="text-koshpendi-text-light">Попробуйте изменить поисковый запрос</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantSelection;