import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="relative max-w-md mx-auto mb-12">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="text-koshpendi-text-light h-5 w-5" />
      </div>
      <input
        type="text"
        className="input-field pl-10"
        placeholder={placeholder || "Поиск..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;