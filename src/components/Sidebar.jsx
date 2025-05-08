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
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';

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

const Sidebar = ({ onMenuItemSelect }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isAllExpanded, setIsAllExpanded] = useState(false);
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
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleAllItems = () => {
    if (isAllExpanded) {
      setExpandedItems([]);
    } else {
      setExpandedItems(menuItems.map(item => item.id));
    }
    setIsAllExpanded(!isAllExpanded);
  };

  const handleMenuItemClick = (item) => {
    onMenuItemSelect(item);
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
  }, [expandedItems]);

  return (
    <div
      className={`bg-black h-screen shadow-lg transition-all duration-300 fixed left-0 top-0 z-50 ${
        isSidebarExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 border-b border-gray-800">
        {isSidebarExpanded && (
          <h1 className="text-white text-3xl font-bold mb-4">PatientTrack</h1>
        )}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex-1 flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 text-white bg-transparent border-none focus:outline-none"
          >
            {isSidebarExpanded ? (
              <ChevronLeftIcon className="h-6 w-6" />
            ) : (
              <ChevronRightIcon className="h-6 w-6" />
            )}
          </button>
          {isSidebarExpanded && (
            <button
              type="button"
              onClick={toggleAllItems}
              className="p-2 rounded-lg hover:bg-gray-800 text-white bg-transparent border-none focus:outline-none"
              title={isAllExpanded ? "Collapse All" : "Expand All"}
            >
              <ArrowsUpDownIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      <nav 
        ref={sidebarRef}
        className="mt-4 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
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
              {isSidebarExpanded && (
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

            {item.submenu && isSidebarExpanded && expandedItems.includes(item.id) && (
              <div className="ml-8 mt-1 bg-black">
                {item.submenu.map((subItem) => (
                  <a
                    key={subItem.id}
                    href={subItem.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuItemClick(subItem);
                    }}
                    ref={selectedItemRef}
                    className="block px-4 py-2 text-lg font-bold text-white hover:bg-gray-800 hover:text-green-400 rounded-lg"
                  >
                    {subItem.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 