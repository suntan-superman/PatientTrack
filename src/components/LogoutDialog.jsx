import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

const LogoutDialog = ({ open, onClose, onLogout }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to logout?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onLogout} color="error">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog; 