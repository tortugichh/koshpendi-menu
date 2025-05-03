import PropTypes from 'prop-types';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const QRCodeModal = ({ isOpen, onClose, restaurant }) => {
  // Create the URL for the restaurant menu
  const menuUrl = `${window.location.origin}/menu/${restaurant.id}`;
  
  // Function to generate QR code SVG
  const generateQR = (url, size = 200) => {
    // This is a placeholder for actual QR code generation
    // In a real application, you would use a library like qrcode.react
    return (
      <Box 
        sx={{ 
          width: size, 
          height: size, 
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: 1
        }}
      >
        <RestaurantIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="caption" align="center" sx={{ px: 2 }}>
          This is a placeholder for QR code that would link to:
        </Typography>
        <Typography variant="caption" fontWeight="bold" align="center" sx={{ px: 2 }}>
          {url}
        </Typography>
      </Box>
    );
  };

  if (!restaurant) return null;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
    >
      <DialogTitle>
        Отсканируйте QR-код
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
          {generateQR(menuUrl, 240)}
          
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
            {restaurant.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center">
            Отсканируйте этот QR-код камерой вашего телефона, чтобы открыть меню ресторана
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          variant="contained" 
          onClick={onClose}
          color="primary"
          fullWidth
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

QRCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  restaurant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default QRCodeModal;