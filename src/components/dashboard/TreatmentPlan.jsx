import React, { useState } from 'react';
import { FaSave, FaEdit, FaPlus, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const TreatmentPlan = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: 'Major Depressive Disorder',
    goals: [
      {
        id: 1,
        description: 'Reduce depressive symptoms by 50%',
        targetDate: '2024-06-30',
        status: 'In Progress',
        progress: 30,
        notes: 'Showing improvement in mood and energy levels'
      },
      {
        id: 2,
        description: 'Improve sleep quality and duration',
        targetDate: '2024-05-15',
        status: 'Not Started',
        progress: 0,
        notes: 'To be addressed in next session'
      }
    ],
    interventions: [
      {
        id: 1,
        type: 'Individual Therapy',
        frequency: 'Weekly',
        duration: '50 minutes',
        provider: 'Dr. Smith',
        startDate: '2024-03-01',
        endDate: '',
        notes: 'Focus on CBT techniques'
      },
      {
        id: 2,
        type: 'Group Therapy',
        frequency: 'Bi-weekly',
        duration: '90 minutes',
        provider: 'Dr. Johnson',
        startDate: '2024-03-15',
        endDate: '',
        notes: 'Social skills development'
      }
    ],
    medications: [
      {
        id: 1,
        name: 'Sertraline',
        dosage: '50mg',
        frequency: 'Once daily',
        startDate: '2024-01-15',
        endDate: '',
        prescribedBy: 'Dr. Smith',
        notes: 'Take with food'
      }
    ],
    progress: [
      {
        id: 1,
        date: '2024-03-15',
        assessment: 'PHQ-9 Score: 15',
        notes: 'Showing improvement in mood and energy levels'
      }
    ]
  });

  const [newItem, setNewItem] = useState({
    type: 'goals',
    data: {
      id: Date.now(),
      description: '',
      targetDate: '',
      status: 'Not Started',
      progress: 0,
      notes: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value
      }
    }));
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      [newItem.type]: [...prev[newItem.type], newItem.data]
    }));
    setNewItem({
      type: newItem.type,
      data: {
        id: Date.now(),
        description: '',
        targetDate: '',
        status: 'Not Started',
        progress: 0,
        notes: ''
      }
    });
  };

  const handleDeleteItem = (type, id) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const handleUpdateProgress = (type, id, progress) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map(item =>
        item.id === id ? { ...item, progress } : item
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the treatment plan
    setIsEditing(false);
  };

  const renderSection = (title, type, fields) => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-indigo-800">{title}</h3>
          {isEditing && (
            <button
              type="button"
              onClick={() => setNewItem({ ...newItem, type })}
              className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              <span>Add {title.slice(0, -1)}</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {formData[type].map((item) => (
            <div key={item.id} className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  {fields.map((field) => (
                    <div key={field.name} className="flex items-start space-x-4">
                      <label 
                        htmlFor={`${item.id}-${field.name}`}
                        className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                      >
                        {field.label}
                      </label>
                      <div className="w-2/3">
                        {field.type === 'select' ? (
                          <select
                            id={`${item.id}-${field.name}`}
                            value={item[field.name]}
                            onChange={(e) => {
                              const newItems = formData[type].map(i =>
                                i.id === item.id ? { ...i, [field.name]: e.target.value } : i
                              );
                              setFormData(prev => ({ ...prev, [type]: newItems }));
                            }}
                            disabled={!isEditing}
                            className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            {field.options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : field.type === 'progress' ? (
                          <div className="flex items-center space-x-4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={item.progress}
                              onChange={(e) => handleUpdateProgress(type, item.id, Number.parseInt(e.target.value))}
                              disabled={!isEditing}
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-600">{item.progress}%</span>
                          </div>
                        ) : (
                          <input
                            id={`${item.id}-${field.name}`}
                            type={field.type}
                            value={item[field.name]}
                            onChange={(e) => {
                              const newItems = formData[type].map(i =>
                                i.id === item.id ? { ...i, [field.name]: e.target.value } : i
                              );
                              setFormData(prev => ({ ...prev, [type]: newItems }));
                            }}
                            disabled={!isEditing}
                            className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(type, item.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditing && newItem.type === type && (
          <div className="mt-4 bg-indigo-100 p-4 rounded-lg">
            <h4 className="text-base font-medium text-indigo-800 mb-4">Add New {title.slice(0, -1)}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.name} className="flex items-start space-x-4">
                  <label 
                    htmlFor={`new-${field.name}`}
                    className="w-1/3 text-base font-medium text-indigo-900 pt-2"
                  >
                    {field.label}
                  </label>
                  <div className="w-2/3">
                    {field.type === 'select' ? (
                      <select
                        id={`new-${field.name}`}
                        name={field.name}
                        value={newItem.data[field.name]}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {field.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`new-${field.name}`}
                        type={field.type}
                        name={field.name}
                        value={newItem.data[field.name]}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleAddItem}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Treatment Plan</h2>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          {isEditing ? (
            <>
              <FaTimes className="w-4 h-4" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <FaEdit className="w-4 h-4" />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <div className="flex items-start space-x-4">
            <label 
              htmlFor="diagnosis"
              className="w-1/3 text-base font-medium text-indigo-900 pt-2"
            >
              Primary Diagnosis
            </label>
            <div className="w-2/3">
              <input
                id="diagnosis"
                type="text"
                value={formData.diagnosis}
                onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {renderSection('Goals', 'goals', [
          { name: 'description', label: 'Goal Description', type: 'text' },
          { name: 'targetDate', label: 'Target Date', type: 'date' },
          { name: 'status', label: 'Status', type: 'select', options: ['Not Started', 'In Progress', 'Completed', 'On Hold'] },
          { name: 'progress', label: 'Progress', type: 'progress' },
          { name: 'notes', label: 'Notes', type: 'text' }
        ])}

        {renderSection('Interventions', 'interventions', [
          { name: 'type', label: 'Intervention Type', type: 'text' },
          { name: 'frequency', label: 'Frequency', type: 'text' },
          { name: 'duration', label: 'Duration', type: 'text' },
          { name: 'provider', label: 'Provider', type: 'text' },
          { name: 'startDate', label: 'Start Date', type: 'date' },
          { name: 'endDate', label: 'End Date', type: 'date' },
          { name: 'notes', label: 'Notes', type: 'text' }
        ])}

        {renderSection('Medications', 'medications', [
          { name: 'name', label: 'Medication Name', type: 'text' },
          { name: 'dosage', label: 'Dosage', type: 'text' },
          { name: 'frequency', label: 'Frequency', type: 'text' },
          { name: 'startDate', label: 'Start Date', type: 'date' },
          { name: 'endDate', label: 'End Date', type: 'date' },
          { name: 'prescribedBy', label: 'Prescribed By', type: 'text' },
          { name: 'notes', label: 'Notes', type: 'text' }
        ])}

        {renderSection('Progress', 'progress', [
          { name: 'date', label: 'Date', type: 'date' },
          { name: 'assessment', label: 'Assessment', type: 'text' },
          { name: 'notes', label: 'Notes', type: 'text' }
        ])}

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaSave className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TreatmentPlan; 