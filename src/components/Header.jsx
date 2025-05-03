import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const menuItems = [
    { text: 'Меню', path: '/restaurants' },
    { text: 'Регистрация для ресторанов', path: '/registration' }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-koshpendi-border z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-koshpendi-primary mr-2"></div>
            <span className="font-semibold text-koshpendi-text-dark">
              Kóshpendi Menu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-koshpendi-text-dark hover:text-koshpendi-primary px-3 py-2"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleDrawer}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
            drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleDrawer}
        >
          <div 
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
              drawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-koshpendi-border">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-koshpendi-primary mr-2"></div>
                <span className="font-semibold text-koshpendi-text-dark">
                  Kóshpendi Menu
                </span>
              </div>
            </div>
            <nav className="p-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block py-2 text-koshpendi-text-dark hover:text-koshpendi-primary"
                  onClick={toggleDrawer}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;