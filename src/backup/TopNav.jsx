import { useState } from 'react';
import { 
  Chat as ChatIcon,
  Help as HelpIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';

const TopNav = () => {
  const [openModal, setOpenModal] = useState(null);

  const handleOpenModal = (modalType) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const renderModalContent = () => {
    switch (openModal) {
      case 'chat':
        return (
          <>
            <DialogTitle>Chat with Team Members</DialogTitle>
            <DialogContent>
              <p>Chat functionality will be implemented here.</p>
            </DialogContent>
          </>
        );
      case 'help':
        return (
          <>
            <DialogTitle>Help & Support</DialogTitle>
            <DialogContent>
              <p>Help and support content will be displayed here.</p>
            </DialogContent>
          </>
        );
      case 'profile':
        return (
          <>
            <DialogTitle>User Profile</DialogTitle>
            <DialogContent>
              <p>User profile information will be displayed here.</p>
            </DialogContent>
          </>
        );
      case 'logout':
        return (
          <>
            <DialogTitle>Logout</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to logout?</p>
            </DialogContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-20 h-16 bg-black border-b border-gray-800 z-0">
        <div className="h-full px-4 flex items-center justify-end space-x-6">
          <IconButton 
            onClick={() => handleOpenModal('chat')}
            className="relative group flex items-center justify-center w-12 h-12 text-white hover:bg-gray-800 hover:text-green-400 transition-colors bg-transparent border-none focus:outline-none rounded-lg"
            title="Chat with team members"
          >
            <ChatIcon sx={{ fontSize: 26, color: 'white' }} />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with team members
            </span>
          </IconButton>
          
          <IconButton 
            onClick={() => handleOpenModal('help')}
            className="relative group flex items-center justify-center w-12 h-12 text-white hover:bg-gray-800 hover:text-green-400 transition-colors bg-transparent border-none focus:outline-none rounded-lg"
            title="Get help and support"
          >
            <HelpIcon sx={{ fontSize: 26, color: 'white' }} />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Get help and support
            </span>
          </IconButton>
          
          <IconButton 
            onClick={() => handleOpenModal('profile')}
            className="relative group flex items-center justify-center w-12 h-12 text-green-400 hover:bg-gray-800 transition-colors bg-transparent border-none focus:outline-none rounded-lg"
            title="View and edit your profile"
          >
            <AccountCircleIcon sx={{ fontSize: 26, color: '#4ade80' }} />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              View and edit your profile
            </span>
          </IconButton>
          
          <IconButton 
            onClick={() => handleOpenModal('logout')}
            className="relative group flex items-center justify-center w-12 h-12 text-white hover:bg-gray-800 hover:text-green-400 transition-colors bg-transparent border-none focus:outline-none rounded-lg"
            title="Log out of your account"
          >
            <LogoutIcon sx={{ fontSize: 26, color: 'white' }} />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Log out of your account
            </span>
          </IconButton>
        </div>
      </div>

      <Dialog 
        open={openModal !== null} 
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        {renderModalContent()}
        <DialogActions>
          {openModal === 'logout' ? (
            <>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseModal} color="error">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopNav; 