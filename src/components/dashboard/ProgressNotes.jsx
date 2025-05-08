import React, { useState } from 'react';
import { FaSave, FaEdit, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const ProgressNotes = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [formData, setFormData] = useState({
    notes: [
      {
        id: 1,
        date: '2024-03-15',
        provider: 'Dr. Smith',
        visitType: 'Follow-up',
        subjective: 'Patient reports improved sleep quality and reduced anxiety symptoms.',
        objective: 'Patient appears well-groomed and alert. Mood appears stable.',
        assessment: 'Anxiety symptoms showing improvement. Sleep quality has improved.',
        plan: 'Continue current medication. Schedule follow-up in 2 weeks.',
        followUpDate: '2024-03-29'
      }
    ]
  });

  const [newNote, setNewNote] = useState({
    date: new Date().toISOString().split('T')[0],
    provider: '',
    visitType: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    followUpDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNote = () => {
    setFormData(prev => ({
      ...prev,
      notes: [{
        id: Date.now(),
        ...newNote
      }, ...prev.notes]
    }));
    setNewNote({
      date: new Date().toISOString().split('T')[0],
      provider: '',
      visitType: '',
      subjective: '',
      objective: '',
      assessment: '',
      plan: '',
      followUpDate: ''
    });
    setIsEditing(false);
  };

  const filteredNotes = formData.notes.filter(note => {
    const matchesSearch = 
      note.subjective.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.assessment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.plan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = filterDate ? note.date === filterDate : true;
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Progress Notes</h2>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="w-full md:w-48">
          <div className="relative">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full p-2 pl-10 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mb-8 p-6 border border-indigo-200 rounded-lg bg-white">
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">New Progress Note</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <label htmlFor="date" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                Date
              </label>
              <div className="w-2/3">
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={newNote.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <label htmlFor="provider" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                Provider
              </label>
              <div className="w-2/3">
                <input
                  id="provider"
                  type="text"
                  name="provider"
                  value={newNote.provider}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <label htmlFor="visitType" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                Visit Type
              </label>
              <div className="w-2/3">
                <select
                  id="visitType"
                  name="visitType"
                  value={newNote.visitType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Visit Type</option>
                  <option value="Initial">Initial Visit</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <label htmlFor="followUpDate" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                Follow-up Date
              </label>
              <div className="w-2/3">
                <input
                  id="followUpDate"
                  type="date"
                  name="followUpDate"
                  value={newNote.followUpDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="subjective" className="block text-base font-medium text-indigo-900 mb-2">
                Subjective
              </label>
              <textarea
                id="subjective"
                name="subjective"
                value={newNote.subjective}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Patient's reported symptoms and concerns..."
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="objective" className="block text-base font-medium text-indigo-900 mb-2">
                Objective
              </label>
              <textarea
                id="objective"
                name="objective"
                value={newNote.objective}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Clinical observations and findings..."
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="assessment" className="block text-base font-medium text-indigo-900 mb-2">
                Assessment
              </label>
              <textarea
                id="assessment"
                name="assessment"
                value={newNote.assessment}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Clinical assessment and diagnosis..."
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="plan" className="block text-base font-medium text-indigo-900 mb-2">
                Plan
              </label>
              <textarea
                id="plan"
                name="plan"
                value={newNote.plan}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Treatment plan and recommendations..."
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddNote}
              className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaSave className="w-4 h-4" />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filteredNotes.map(note => (
          <div key={note.id} className="p-6 border border-indigo-200 rounded-lg bg-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-indigo-900">
                  {note.visitType} Visit - {new Date(note.date).toLocaleDateString()}
                </h3>
                <p className="text-sm text-gray-600">Provider: {note.provider}</p>
              </div>
              {note.followUpDate && (
                <div className="text-sm text-indigo-600">
                  Follow-up: {new Date(note.followUpDate).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-medium text-indigo-800 mb-2">Subjective</h4>
                <p className="text-gray-700">{note.subjective}</p>
              </div>

              <div>
                <h4 className="text-base font-medium text-indigo-800 mb-2">Objective</h4>
                <p className="text-gray-700">{note.objective}</p>
              </div>

              <div>
                <h4 className="text-base font-medium text-indigo-800 mb-2">Assessment</h4>
                <p className="text-gray-700">{note.assessment}</p>
              </div>

              <div>
                <h4 className="text-base font-medium text-indigo-800 mb-2">Plan</h4>
                <p className="text-gray-700">{note.plan}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressNotes; 