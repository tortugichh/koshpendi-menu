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
import QRCode from 'react-qr-code';          

const QRCodeModal = ({ isOpen, onClose, restaurant }) => {
  if (!restaurant) return null;

  const menuUrl = `${window.location.origin}/#\/menu\/${restaurant.id}`


  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm">
      <DialogTitle>
        Отсканируйте QR-код для доступа к меню
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
          {/* сам QR-код */}
          <QRCode value={menuUrl} size={240} level="H" />

          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
            {restaurant.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center">
            Отсканируйте код камерой телефона, чтобы открыть меню
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="contained" onClick={onClose} fullWidth>
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
