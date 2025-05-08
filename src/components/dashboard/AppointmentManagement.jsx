import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUserMd, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const AppointmentManagement = () => {
  const [selectedView, setSelectedView] = useState('Week');
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    description: '',
    provider: '',
    patient: '',
    type: 'Regular',
    status: 'Scheduled',
    notes: ''
  });

  // Sample data - In production, this would come from your API
  const dataManager = new DataManager({
    url: 'YOUR_API_ENDPOINT/appointments',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the appointment
    setShowForm(false);
    setSelectedAppointment(null);
  };

  const handleAppointmentSelect = (args) => {
    setSelectedAppointment(args.data);
    setFormData({
      title: args.data.title || '',
      startTime: args.data.startTime || '',
      endTime: args.data.endTime || '',
      description: args.data.description || '',
      provider: args.data.provider || '',
      patient: args.data.patient || '',
      type: args.data.type || 'Regular',
      status: args.data.status || 'Scheduled',
      notes: args.data.notes || ''
    });
    setShowForm(true);
  };

  const renderAppointmentForm = () => {
    if (!showForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-indigo-900">
              {selectedAppointment ? 'Edit Appointment' : 'New Appointment'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setSelectedAppointment(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <label 
                  htmlFor="title"
                  className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                >
                  Title
                </label>
                <div className="w-2/3">
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label 
                  htmlFor="type"
                  className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                >
                  Type
                </label>
                <div className="w-2/3">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Regular">Regular</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label 
                  htmlFor="startTime"
                  className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                >
                  Start Time
                </label>
                <div className="w-2/3">
                  <input
                    id="startTime"
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label 
                  htmlFor="endTime"
                  className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                >
                  End Time
                </label>
                <div className="w-2/3">
                  <input
                    id="endTime"
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label 
                  htmlFor="provider"
                  className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                >
                  Provider
                </label>
                <div className="w-2/3">
                  <select
                    id="provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Provider</option>
                    <option value="Dr. Smith">Dr. Smith</option>
                    <option value="Dr. Johnson">Dr. Johnson</option>
                    <option value="Dr. Williams">Dr. Williams</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label 
                  htmlFor="patient"
                  className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                >
                  Patient
                </label>
                <div className="w-2/3">
                  <select
                    id="patient"
                    name="patient"
                    value={formData.patient}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Patient</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Bob Johnson">Bob Johnson</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label 
                  htmlFor="status"
                  className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                >
                  Status
                </label>
                <div className="w-2/3">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No Show">No Show</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <label 
                htmlFor="description"
                className="w-1/3 text-base font-medium text-indigo-900 pt-2"
              >
                Description
              </label>
              <div className="w-2/3">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <label 
                htmlFor="notes"
                className="w-1/3 text-base font-medium text-indigo-900 pt-2"
              >
                Notes
              </label>
              <div className="w-2/3">
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelectedAppointment(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FaSave className="w-4 h-4" />
                <span>Save Appointment</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Appointment Management</h2>
        <div className="flex space-x-4">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="WorkWeek">Work Week</option>
            <option value="Month">Month</option>
            <option value="Agenda">Agenda</option>
          </select>
          <button
            type="button"
            onClick={() => {
              setSelectedAppointment(null);
              setFormData({
                title: '',
                startTime: '',
                endTime: '',
                description: '',
                provider: '',
                patient: '',
                type: 'Regular',
                status: 'Scheduled',
                notes: ''
              });
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      <div className="h-[600px]">
        <ScheduleComponent
          height="100%"
          selectedDate={new Date()}
          currentView={selectedView}
          dataSource={dataManager}
          eventSettings={{
            dataSource: dataManager,
            fields: {
              id: 'id',
              subject: { name: 'title' },
              startTime: { name: 'startTime' },
              endTime: { name: 'endTime' },
              description: { name: 'description' },
              location: { name: 'provider' }
            }
          }}
          actionComplete={(args) => {
            if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged') {
              // Handle appointment creation/update
            }
          }}
          popupOpen={(args) => {
            if (args.type === 'Editor') {
              handleAppointmentSelect(args);
              args.cancel = true;
            }
          }}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month" />
            <ViewDirective option="Agenda" />
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>

      {renderAppointmentForm()}
    </div>
  );
};

export default AppointmentManagement; 