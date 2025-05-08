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
import SecureMessaging from './components/dashboard/SecureMessaging'
import DocumentManagement from './components/dashboard/DocumentManagement'
import { registerLicense } from "@syncfusion/ej2-base";
import './App.css'

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  registerLicense(
			"ORg4AjUWIQA/Gnt2XFhhQlJHfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTH5WdkJhW39WdHZSQ2BUWkZ/",
		);

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

      // Secure Messaging
      case '/dashboard/messaging':
        return <SecureMessaging showArchive={false} />;
      case '/dashboard/message-archive':
        return <SecureMessaging showArchive={true} />;

      // Document & Form Management
      case '/dashboard/documents':
        return <DocumentManagement showSignatures={false} />;
      case '/dashboard/signatures':
        return <DocumentManagement showSignatures={true} />;
      
      // Billing & Payments
      case '/dashboard/billing':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Billing & Payments</h1>
            <p className="text-gray-600">Billing and payment management coming soon.</p>
          </div>
        );
      case '/dashboard/payments':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Secure Payments</h1>
            <p className="text-gray-600">Secure payment processing coming soon.</p>
          </div>
        );

      // Telehealth Integration
      case '/dashboard/telehealth':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Telehealth</h1>
            <p className="text-gray-600">Video visit integration coming soon.</p>
          </div>
        );
      case '/dashboard/telehealth-settings':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">HIPAA Settings</h1>
            <p className="text-gray-600">Telehealth security settings coming soon.</p>
          </div>
        );
      
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
