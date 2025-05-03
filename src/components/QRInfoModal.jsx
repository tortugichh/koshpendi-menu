import PropTypes from 'prop-types';

const QRInfoModal = ({ isOpen, onClose, restaurantName }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-kosh-md p-kosh-xl max-w-md w-full">
        <h2 className="text-koshpendi-text-dark text-xl font-semibold mb-4">QR-меню ресторана</h2>
        <p className="text-koshpendi-text-light mb-4">
          Вы открыли QR-меню ресторана "{restaurantName}". Теперь вы можете:
        </p>
        <ul className="list-disc pl-5 mb-6 text-koshpendi-text-light">
          <li>Просматривать меню</li>
          <li>Добавлять блюда в корзину</li>
          <li>Сделать заказ</li>
        </ul>
        <div className="flex justify-between items-center border-t border-koshpendi-border pt-4">
          <div className="flex items-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-koshpendi-primary"
            >
              <path 
                d="M3 9H21M9 21V9M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2 text-koshpendi-text-dark">Стол #12</span>
          </div>
          <button 
            onClick={onClose}
            className="btn-primary"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

QRInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  restaurantName: PropTypes.string.isRequired,
};

export default QRInfoModal;