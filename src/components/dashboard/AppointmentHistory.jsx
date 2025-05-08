import React, { useState } from 'react';
import { FaSearch, FaFilter, FaDownload, FaPrint, FaCalendarAlt, FaUserMd, FaUser } from 'react-icons/fa';

const AppointmentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterProvider, setFilterProvider] = useState('');

  // Sample data - In production, this would come from your API
  const appointments = [
    {
      id: 1,
      date: '2024-03-15',
      time: '10:00 AM',
      type: 'Follow-up',
      provider: 'Dr. Smith',
      patient: 'John Doe',
      status: 'Completed',
      notes: 'Regular check-up, patient reported improvement in symptoms',
      duration: '30 minutes',
      location: 'Main Office'
    },
    {
      id: 2,
      date: '2024-03-10',
      time: '2:30 PM',
      type: 'Initial',
      provider: 'Dr. Johnson',
      patient: 'Jane Smith',
      status: 'Completed',
      notes: 'Initial consultation, treatment plan established',
      duration: '60 minutes',
      location: 'Downtown Office'
    },
    {
      id: 3,
      date: '2024-03-05',
      time: '11:15 AM',
      type: 'Emergency',
      provider: 'Dr. Williams',
      patient: 'Bob Johnson',
      status: 'No Show',
      notes: 'Patient did not arrive for scheduled appointment',
      duration: '45 minutes',
      location: 'Main Office'
    }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = filterDate ? appointment.date === filterDate : true;
    const matchesStatus = filterStatus ? appointment.status === filterStatus : true;
    const matchesProvider = filterProvider ? appointment.provider === filterProvider : true;
    
    return matchesSearch && matchesDate && matchesStatus && matchesProvider;
  });

  const handleExport = (format) => {
    // Here you would implement the export functionality
    console.log(`Exporting to ${format}...`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Appointment History</h2>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleExport('pdf')}
            className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FaPrint className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full p-2 pl-10 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-2 pl-10 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="relative">
          <select
            value={filterProvider}
            onChange={(e) => setFilterProvider(e.target.value)}
            className="w-full p-2 pl-10 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Providers</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Williams">Dr. Williams</option>
          </select>
          <FaUserMd className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.date}</div>
                  <div className="text-sm text-gray-500">{appointment.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${appointment.type === 'Emergency' ? 'bg-red-100 text-red-800' :
                      appointment.type === 'Follow-up' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'}`}>
                    {appointment.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.provider}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.patient}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {appointment.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentHistory; 