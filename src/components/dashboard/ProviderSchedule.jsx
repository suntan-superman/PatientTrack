import React, { useState } from 'react';
import { FaUserMd, FaCalendarAlt, FaClock, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ProviderSchedule = () => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [availabilityData, setAvailabilityData] = useState({
    startTime: '',
    endTime: '',
    breakStart: '',
    breakEnd: '',
    isRecurring: false,
    daysOfWeek: []
  });

  // Sample data - In production, this would come from your API
  const providers = [
    {
      id: 1,
      name: 'Dr. Smith',
      specialty: 'General Medicine',
      schedule: {
        monday: { start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } },
        tuesday: { start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } },
        wednesday: { start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } },
        thursday: { start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } },
        friday: { start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } }
      }
    },
    {
      id: 2,
      name: 'Dr. Johnson',
      specialty: 'Pediatrics',
      schedule: {
        monday: { start: '10:00', end: '18:00', break: { start: '13:00', end: '14:00' } },
        wednesday: { start: '10:00', end: '18:00', break: { start: '13:00', end: '14:00' } },
        friday: { start: '10:00', end: '18:00', break: { start: '13:00', end: '14:00' } }
      }
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAvailabilityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDayToggle = (day) => {
    setAvailabilityData(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would implement the save functionality
    setShowAvailabilityForm(false);
  };

  const renderAvailabilityForm = () => {
    if (!showAvailabilityForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-indigo-900">
              Set Provider Availability
            </h3>
            <button
              type="button"
              onClick={() => setShowAvailabilityForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <label className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Start Time
                </label>
                <div className="w-2/3">
                  <input
                    type="time"
                    name="startTime"
                    value={availabilityData.startTime}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  End Time
                </label>
                <div className="w-2/3">
                  <input
                    type="time"
                    name="endTime"
                    value={availabilityData.endTime}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Break Start
                </label>
                <div className="w-2/3">
                  <input
                    type="time"
                    name="breakStart"
                    value={availabilityData.breakStart}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Break End
                </label>
                <div className="w-2/3">
                  <input
                    type="time"
                    name="breakEnd"
                    value={availabilityData.breakEnd}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="isRecurring"
                checked={availabilityData.isRecurring}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="text-base font-medium text-indigo-900">
                Recurring Schedule
              </label>
            </div>

            {availabilityData.isRecurring && (
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day.toLowerCase())}
                    className={`p-2 text-center rounded-lg ${
                      availabilityData.daysOfWeek.includes(day.toLowerCase())
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowAvailabilityForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FaSave className="w-4 h-4" />
                <span>Save Schedule</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderProviderSchedule = (provider) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-900">{provider.name}</h3>
            <p className="text-sm text-gray-500">{provider.specialty}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAvailabilityForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaEdit className="w-4 h-4" />
            <span>Edit Schedule</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day) => {
            const schedule = provider.schedule[day];
            return (
              <div
                key={day}
                className={`p-4 rounded-lg ${
                  schedule ? 'bg-white border border-indigo-200' : 'bg-gray-50'
                }`}
              >
                <h4 className="text-sm font-medium text-indigo-900 capitalize mb-2">{day}</h4>
                {schedule ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <FaClock className="inline-block mr-1" />
                      {schedule.start} - {schedule.end}
                    </div>
                    {schedule.break && (
                      <div className="text-sm text-gray-500">
                        Break: {schedule.break.start} - {schedule.break.end}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Not Available</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Provider Schedule</h2>
        <div className="flex space-x-4">
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Providers</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {providers
        .filter(provider => !selectedProvider || provider.id === parseInt(selectedProvider))
        .map(provider => renderProviderSchedule(provider))}

      {renderAvailabilityForm()}
    </div>
  );
};

export default ProviderSchedule; 