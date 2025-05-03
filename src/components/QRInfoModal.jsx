import PropTypes from 'prop-types';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Divider 
} from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const QRInfoModal = ({ isOpen, onClose, restaurantName }) => {
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>QR-меню ресторана</DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Вы отсканировали QR-код и открыли меню ресторана "{restaurantName}". Теперь вы можете:
        </Typography>

        <List sx={{ mb: 2 }}>
          {['Просматривать меню', 'Добавлять блюда в корзину', 'Сделать заказ'].map((item, index) => (
            <ListItem key={index} dense>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <FiberManualRecordIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item} primaryTypographyProps={{ color: 'text.secondary' }} />
            </ListItem>
          ))}
        </List>

        <Divider />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TableRestaurantIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body1" color="text.primary">
            Стол #12
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={onClose}
          color="primary"
        >
          Понятно
        </Button>
      </DialogActions>
    </Dialog>
  );
};

QRInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  restaurantName: PropTypes.string.isRequired,
};

export default QRInfoModal;