import PropTypes from 'prop-types';

const CategoryMenu = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="border-b border-koshpendi-border sticky top-16 bg-white z-10">
      <div className="container-custom overflow-x-auto">
        <div className="flex space-x-6 py-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`whitespace-nowrap font-medium ${
                activeCategory === category.id 
                  ? 'text-koshpendi-primary border-b-2 border-koshpendi-primary' 
                  : 'text-koshpendi-text-light hover:text-koshpendi-text-dark'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

CategoryMenu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeCategory: PropTypes.number,
  setActiveCategory: PropTypes.func.isRequired,
};

export default CategoryMenu;