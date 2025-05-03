import PropTypes from 'prop-types';
import { Box, Container, Button } from '@mui/material';

const CategoryMenu = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <Box 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        position: 'sticky',
        top: 64,
        bgcolor: 'background.paper',
        zIndex: 10
      }}
    >
      <Container sx={{ overflowX: 'auto' }}>
        <Box 
          sx={{ 
            display: 'flex', 
            py: 2, 
            minWidth: 'max-content' 
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              sx={{
                mx: 1.5, 
                px: 1,
                fontWeight: 500,
                color: activeCategory === category.id ? 'primary.main' : 'text.secondary',
                borderBottom: activeCategory === category.id ? 2 : 0,
                borderColor: 'primary.main',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'text.primary'
                }
              }}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
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