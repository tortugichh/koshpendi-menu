import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-10 border-t border-koshpendi-border mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-koshpendi-primary mr-2"></div>
              <span className="font-semibold text-koshpendi-text-dark">
                Kóshpendi Menu
              </span>
            </Link>
            <p className="text-koshpendi-text-light">
              Быстрые QR-меню и удобная доставка для любого ресторана
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-koshpendi-text-dark mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-koshpendi-text-light hover:text-koshpendi-primary">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-koshpendi-text-light hover:text-koshpendi-primary">
                  Рестораны
                </Link>
              </li>
              <li>
                <Link to="/registration" className="text-koshpendi-text-light hover:text-koshpendi-primary">
                  Регистрация для ресторанов
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-koshpendi-text-dark mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-koshpendi-text-light">
                Email: info@koshpendi.kz
              </li>
              <li className="text-koshpendi-text-light">
                Телефон: +7 (777) 777-77-77
              </li>
              <li className="text-koshpendi-text-light">
                Адрес: г. Астана, ул. Примерная, 123
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-koshpendi-border mt-8 pt-4 text-center">
          <p className="text-koshpendi-text-light">
            © {currentYear} Kóshpendi Menu. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;