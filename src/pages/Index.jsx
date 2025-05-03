import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16"> {/* pt-16 to account for fixed header */}
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-koshpendi-secondary to-white py-16 md:py-28">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <h1 className="animate-fade-in text-koshpendi-text-dark mb-4">
                  Быстрые QR-меню и удобная доставка
                </h1>
                <p className="text-koshpendi-text-light text-lg mb-8">
                  Kóshpendi Menu — современная платформа для цифровизации вашего ресторана
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/restaurants" className="btn-primary flex items-center">
                    <span>Найти ресторан</span>
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <Link to="/registration" className="btn-secondary flex items-center">
                    <span>Зарегистрировать ресторан</span>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400"
                  alt="QR меню на смартфоне" 
                  className="rounded-kosh-md shadow-lg w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Customers */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-center text-koshpendi-text-dark mb-12">Преимущества для клиентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center p-kosh-xl">
                <div className="bg-koshpendi-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-koshpendi-primary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-koshpendi-text-dark mb-2">Быстрый доступ к меню</h3>
                <p className="text-koshpendi-text-light">
                  Отсканируйте QR-код и получите доступ к актуальному меню ресторана
                </p>
              </div>
              <div className="card text-center p-kosh-xl">
                <div className="bg-koshpendi-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-koshpendi-primary">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <h3 className="text-koshpendi-text-dark mb-2">Удобный заказ</h3>
                <p className="text-koshpendi-text-light">
                  Заказывайте еду прямо через мобильное устройство без ожидания официанта
                </p>
              </div>
              <div className="card text-center p-kosh-xl">
                <div className="bg-koshpendi-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-koshpendi-primary">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-koshpendi-text-dark mb-2">Удобная доставка</h3>
                <p className="text-koshpendi-text-light">
                  Закажите доставку еды из любимого ресторана с отслеживанием заказа
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Restaurants */}
        <section className="py-16 bg-koshpendi-secondary">
          <div className="container-custom">
            <h2 className="text-center text-koshpendi-text-dark mb-12">Преимущества для ресторанов</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center p-kosh-xl bg-white">
                <div className="bg-white border border-koshpendi-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-koshpendi-primary">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
                <h3 className="text-koshpendi-text-dark mb-2">Легкое обновление меню</h3>
                <p className="text-koshpendi-text-light">
                  Обновляйте меню в реальном времени через простой интерфейс
                </p>
              </div>
              <div className="card text-center p-kosh-xl bg-white">
                <div className="bg-white border border-koshpendi-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-koshpendi-primary">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-koshpendi-text-dark mb-2">Аналитика заказов</h3>
                <p className="text-koshpendi-text-light">
                  Получайте подробную статистику по заказам и предпочтениям клиентов
                </p>
              </div>
              <div className="card text-center p-kosh-xl bg-white">
                <div className="bg-white border border-koshpendi-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-koshpendi-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m16 10-4 4-4-4"></path>
                  </svg>
                </div>
                <h3 className="text-koshpendi-text-dark mb-2">Расширение аудитории</h3>
                <p className="text-koshpendi-text-light">
                  Привлекайте новых клиентов через платформу доставки
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container-custom text-center">
            <h2 className="text-koshpendi-text-dark mb-4">Готовы начать?</h2>
            <p className="text-koshpendi-text-light text-lg mb-8 max-w-xl mx-auto">
              Присоединяйтесь к Kóshpendi Menu сегодня и переведите свой ресторан на новый уровень обслуживания
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/registration" className="btn-primary flex items-center">
                <span>Зарегистрировать ресторан</span>
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/restaurants" className="btn-secondary flex items-center">
                <span>Найти ресторан</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;