import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import { registerLicense } from "@syncfusion/ej2-base";

import './App.css'

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  registerLicense(
    "ORg4AjUWIQA/Gnt2XFhhQlJHfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTH5WdkJhW39WdHZSQ2BUWkZ"
  );

  const handleMenuItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onMenuItemSelect={handleMenuItemSelect} />
      <div className="flex-1 ml-64">
        <TopNav />
        <main className="pt-16 p-8">
          {selectedItem ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedItem.title}
              </h1>
              <p className="text-gray-600">
                You have selected: {selectedItem.title}
                {selectedItem.path && (
                  <span className="block mt-2 text-sm text-gray-500">
                    Path: {selectedItem.path}
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to WORKSIDE
              </h1>
              <p className="text-gray-600">
                Please select a menu item from the sidebar to get started.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
