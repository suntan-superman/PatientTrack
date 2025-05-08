import { useState } from 'react';
import { 
  HomeIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  CogIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    id: 1,
    title: 'Dashboard',
    icon: HomeIcon,
    path: '/dashboard',
  },
  {
    id: 2,
    title: 'Users',
    icon: UserGroupIcon,
    path: '/users',
    submenu: [
      { id: 21, title: 'User List', path: '/users/list' },
      { id: 22, title: 'User Groups', path: '/users/groups' },
    ],
  },
  {
    id: 3,
    title: 'Analytics',
    icon: ChartBarIcon,
    path: '/analytics',
    submenu: [
      { id: 31, title: 'Reports', path: '/analytics/reports' },
      { id: 32, title: 'Statistics', path: '/analytics/statistics' },
    ],
  },
  {
    id: 4,
    title: 'Settings',
    icon: CogIcon,
    path: '/settings',
  },
];

const Sidebar = ({ onMenuItemSelect }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSubmenu = (itemId) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleMenuItemClick = (item) => {
    onMenuItemSelect(item);
  };

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
        <button
          type="button"
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 text-white bg-transparent border-none focus:outline-none"
        >
          {isSidebarExpanded ? (
            <ChevronLeftIcon className="h-6 w-6" />
          ) : (
            <ChevronRightIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <nav className="mt-4">
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