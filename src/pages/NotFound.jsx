import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the missing route to console for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-koshpendi-secondary">
      <div className="text-center p-8 max-w-md bg-white rounded-kosh-md shadow-lg">
        <div className="w-24 h-24 bg-koshpendi-primary/10 flex items-center justify-center rounded-full mx-auto mb-6">
          <span className="text-koshpendi-primary text-4xl font-bold">404</span>
        </div>
        <h1 className="text-2xl font-bold text-koshpendi-text-dark mb-4">Страница не найдена</h1>
        <p className="text-koshpendi-text-light mb-8">
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-block"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;