import { useState, useRef, useEffect } from 'react';
import { 
  HomeIcon, 
  CalendarIcon, 
  ChatBubbleLeftRightIcon,
  DocumentIcon,
  CreditCardIcon,
  VideoCameraIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowsUpDownIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import LogoutDialog from './LogoutDialog';

const menuItems = [
  {
    id: 1,
    title: 'Patient Dashboard',
    icon: HomeIcon,
    path: '/dashboard',
    submenu: [
      { id: 11, title: 'Personal Info', path: '/dashboard/personal-info' },
      { id: 12, title: 'Demographics', path: '/dashboard/demographics' },
      { id: 13, title: 'Insurance', path: '/dashboard/insurance' },
      { id: 14, title: 'Medical History', path: '/dashboard/medical-history' },
    ],
  },
  {
    id: 2,
    title: 'Appointment Management',
    icon: CalendarIcon,
    path: '/dashboard/appointments',
    submenu: [
      { id: 21, title: 'View Upcoming Visits', path: '/dashboard/appointments' },
      { id: 22, title: 'Request/Cancel Appointments', path: '/dashboard/appointment-history' },
      { id: 23, title: 'Provider Schedule', path: '/dashboard/provider-schedule' },
    ],
  },
  {
    id: 3,
    title: 'Secure Messaging',
    icon: ChatBubbleLeftRightIcon,
    path: '/dashboard/messaging',
    submenu: [
      { id: 31, title: 'Patient-Provider Communication', path: '/dashboard/messaging' },
      { id: 32, title: 'Message Archive', path: '/dashboard/message-archive' },
    ],
  },
  {
    id: 4,
    title: 'Document & Form Management',
    icon: DocumentIcon,
    path: '/dashboard/documents',
    submenu: [
      { id: 41, title: 'Lab Results & Forms', path: '/dashboard/documents' },
      { id: 42, title: 'Digital Signatures', path: '/dashboard/signatures' },
    ],
  },
  {
    id: 5,
    title: 'Billing & Payments',
    icon: CreditCardIcon,
    path: '/dashboard/billing',
    submenu: [
      { id: 51, title: 'Invoices & Claims', path: '/dashboard/billing' },
      { id: 52, title: 'Secure Payments', path: '/dashboard/payments' },
    ],
  },
  {
    id: 6,
    title: 'Telehealth Integration',
    icon: VideoCameraIcon,
    path: '/dashboard/telehealth',
    submenu: [
      { id: 61, title: 'Video Visits', path: '/dashboard/telehealth' },
      { id: 62, title: 'HIPAA Settings', path: '/dashboard/telehealth-settings' },
    ],
  },
];

const Sidebar = ({ onMenuItemSelect, userRole, onLogout }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandAll, setExpandAll] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const sidebarRef = useRef(null);
  const selectedItemRef = useRef(null);

  const toggleSubmenu = (itemId) => {
    setExpandedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        // Collapse other items when expanding a new one
        return [itemId];
      }
    });
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleAllItems = () => {
    if (expandAll) {
      setExpandedItems([]);
    } else {
      setExpandedItems(menuItems.map(item => item.id));
    }
    setExpandAll(!expandAll);
  };

  const handleMenuItemClick = (item) => {
    onMenuItemSelect(item);
    setSelectedItemId(item.id);
    // Find the parent menu item
    const parentItem = menuItems.find(menuItem => 
      menuItem.submenu?.some(subItem => subItem.id === item.id)
    );
    if (parentItem) {
      setExpandedItems([parentItem.id]);
    }
  };

  // Auto-scroll to selected item
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedItemId]);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen bg-black text-white transition-all duration-300 z-10 ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 border-b border-gray-800">
          {isExpanded && (
            <h1 className="text-white text-3xl font-bold mb-4">PatientTrack</h1>
          )}
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={toggleSidebar}
              className="flex-1 flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 text-white bg-transparent border-none focus:outline-none"
            >
              {isExpanded ? (
                <ChevronLeftIcon className="h-6 w-6" />
              ) : (
                <ChevronRightIcon className="h-6 w-6" />
              )}
            </button>
            {isExpanded && (
              <button
                type="button"
                onClick={toggleAllItems}
                className="p-2 rounded-lg hover:bg-gray-800 text-white bg-transparent border-none focus:outline-none"
                title={expandAll ? "Collapse All" : "Expand All"}
              >
                <ArrowsUpDownIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>

        <nav className="mt-4 overflow-y-auto h-[calc(100vh-8rem)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-black">
              <button
                type="button"
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(item.id);
                  } else {
                    handleMenuItemClick(item);
                  }
                }}
                className={`w-full flex items-center px-4 py-3 text-white hover:bg-gray-800 bg-transparent border-none focus:outline-none ${
                  expandedItems.includes(item.id) ? 'bg-gray-800 text-green-400' : ''
                }`}
              >
                <item.icon className={`h-6 w-6 ${expandedItems.includes(item.id) ? 'text-green-400' : ''}`} />
                {isExpanded && (
                  <>
                    <span className="ml-3 text-lg font-bold">{item.title}</span>
                    {item.submenu && (
                      <ChevronDownIcon
                        className={`h-4 w-4 ml-auto transition-transform ${
                          expandedItems.includes(item.id) ? 'rotate-180 text-green-400' : ''
                        }`}
                      />
                    )}
                  </>
                )}
              </button>

              {item.submenu && isExpanded && expandedItems.includes(item.id) && (
                <div className="ml-8 mt-1 bg-black">
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.id}
                      href={subItem.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuItemClick(subItem);
                      }}
                      ref={selectedItemId === subItem.id ? selectedItemRef : null}
                      className={`block px-4 py-2 text-lg font-bold text-white hover:bg-gray-800 hover:text-green-400 rounded-lg ${
                        selectedItemId === subItem.id ? 'bg-gray-800 text-green-400' : ''
                      }`}
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            type="button"
            onClick={handleLogoutClick}
            className="w-full flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-green-400 transition-colors rounded-lg bg-transparent border-none focus:outline-none"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6 mr-3" />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>

      <LogoutDialog 
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onLogout={handleLogoutConfirm}
      />
    </>
  );
};

export default Sidebar; 