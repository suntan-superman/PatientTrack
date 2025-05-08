import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import LoginDialog from './components/LoginDialog'
import PersonalInfo from './components/dashboard/PersonalInfo'
import Demographics from './components/dashboard/Demographics'
import Insurance from './components/dashboard/Insurance'
import MedicalHistory from './components/dashboard/MedicalHistory'
import TreatmentPlan from './components/dashboard/TreatmentPlan'
import ProgressNotes from './components/dashboard/ProgressNotes'
import AppointmentManagement from './components/dashboard/AppointmentManagement'
import AppointmentHistory from './components/dashboard/AppointmentHistory'
import ProviderSchedule from './components/dashboard/ProviderSchedule'
import './App.css'

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (credentials) => {
    console.log('Login attempt:', credentials);
    setIsAuthenticated(true);
    setUserRole(credentials.role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const handleMenuItemSelect = (item) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    if (!selectedItem) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to PatientTrack
          </h1>
          <p className="text-gray-600">
            Please select a menu item from the sidebar to get started.
          </p>
        </div>
      );
    }

    // Map menu items to their corresponding components
    switch (selectedItem.path) {
      // Patient Dashboard
      case '/dashboard/personal-info':
        return <PersonalInfo />;
      case '/dashboard/demographics':
        return <Demographics />;
      case '/dashboard/insurance':
        return <Insurance />;
      case '/dashboard/medical-history':
        return <MedicalHistory />;
      
      // Treatment & Progress
      case '/dashboard/treatment-plan':
        return <TreatmentPlan />;
      case '/dashboard/progress-notes':
        return <ProgressNotes />;
      
      // Appointment Management
      case '/dashboard/appointments':
        return <AppointmentManagement />;
      case '/dashboard/appointment-history':
        return <AppointmentHistory />;
      case '/dashboard/provider-schedule':
        return <ProviderSchedule />;
      
      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedItem.title}
            </h1>
            <p className="text-gray-600">
              Content for {selectedItem.title} will be displayed here.
            </p>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return <LoginDialog onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onMenuItemSelect={handleMenuItemSelect} userRole={userRole} onLogout={handleLogout} />
      <div className="flex-1 ml-64">
        <TopNav />
        <main className="pt-16 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
