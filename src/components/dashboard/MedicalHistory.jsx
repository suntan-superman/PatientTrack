import React, { useState } from 'react';
import { FaSave, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const MedicalHistory = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    conditions: [
      {
        id: 1,
        name: 'Hypertension',
        diagnosisDate: '2020-01-15',
        status: 'Active',
        notes: 'Well controlled with medication'
      }
    ],
    allergies: [
      {
        id: 1,
        allergen: 'Penicillin',
        reaction: 'Rash',
        severity: 'Moderate',
        notes: 'Avoid all penicillin-based antibiotics'
      }
    ],
    medications: [
      {
        id: 1,
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2020-01-15',
        endDate: '',
        prescribedBy: 'Dr. Smith',
        notes: 'For blood pressure control'
      }
    ],
    surgeries: [
      {
        id: 1,
        procedure: 'Appendectomy',
        date: '2015-06-20',
        surgeon: 'Dr. Johnson',
        hospital: 'City General Hospital',
        notes: 'Laparoscopic procedure, no complications'
      }
    ],
    familyHistory: [
      {
        id: 1,
        condition: 'Type 2 Diabetes',
        relation: 'Father',
        ageOfOnset: '45',
        notes: 'Controlled with diet and exercise'
      }
    ]
  });

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [name]: value } : item
      )
    }));
  };

  const handleAddItem = (section) => {
    const newItem = {
      id: Date.now(),
      ...getEmptyItem(section)
    };
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const handleDeleteItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const getEmptyItem = (section) => {
    switch (section) {
      case 'conditions':
        return { name: '', diagnosisDate: '', status: '', notes: '' };
      case 'allergies':
        return { allergen: '', reaction: '', severity: '', notes: '' };
      case 'medications':
        return { name: '', dosage: '', frequency: '', startDate: '', endDate: '', prescribedBy: '', notes: '' };
      case 'surgeries':
        return { procedure: '', date: '', surgeon: '', hospital: '', notes: '' };
      case 'familyHistory':
        return { condition: '', relation: '', ageOfOnset: '', notes: '' };
      default:
        return {};
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const renderSection = (title, section, fields) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-indigo-800">{title}</h3>
        {isEditing && (
          <button
            type="button"
            onClick={() => handleAddItem(section)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add {title.slice(0, -1)}</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {formData[section].map((item, index) => (
          <div key={item.id} className="p-4 border border-indigo-200 rounded-lg bg-white">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-medium text-indigo-900">
                {item.name || item.allergen || item.procedure || item.condition}
              </h4>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleDeleteItem(section, index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(field => (
                <div key={field.name} className="flex items-start space-x-4">
                  <label htmlFor={`${section}-${index}-${field.name}`} className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                    {field.label}
                  </label>
                  <div className="w-2/3">
                    {field.type === 'select' ? (
                      <select
                        id={`${section}-${index}-${field.name}`}
                        name={field.name}
                        value={item[field.name]}
                        onChange={(e) => handleInputChange(e, section, index)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`${section}-${index}-${field.name}`}
                        type={field.type}
                        name={field.name}
                        value={item[field.name]}
                        onChange={(e) => handleInputChange(e, section, index)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">Medical History</h2>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isEditing ? (
            <>
              <FaSave className="w-4 h-4" />
              <span>Save</span>
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
        {renderSection('Conditions', 'conditions', [
          { name: 'name', label: 'Condition', type: 'text' },
          { name: 'diagnosisDate', label: 'Diagnosis Date', type: 'date' },
          { name: 'status', label: 'Status', type: 'select', options: [
            { value: 'Active', label: 'Active' },
            { value: 'Resolved', label: 'Resolved' },
            { value: 'Chronic', label: 'Chronic' }
          ]},
          { name: 'notes', label: 'Notes', type: 'text' }
        ])}

        {renderSection('Allergies', 'allergies', [
          { name: 'allergen', label: 'Allergen', type: 'text' },
          { name: 'reaction', label: 'Reaction', type: 'text' },
          { name: 'severity', label: 'Severity', type: 'select', options: [
            { value: 'Mild', label: 'Mild' },
            { value: 'Moderate', label: 'Moderate' },
            { value: 'Severe', label: 'Severe' }
          ]},
          { name: 'notes', label: 'Notes', type: 'text' }
        ])}

        {renderSection('Medications', 'medications', [
          { name: 'name', label: 'Medication', type: 'text' },
          { name: 'dosage', label: 'Dosage', type: 'text' },
          { name: 'frequency', label: 'Frequency', type: 'text' },
          { name: 'startDate', label: 'Start Date', type: 'date' },
          { name: 'endDate', label: 'End Date', type: 'date' },
          { name: 'prescribedBy', label: 'Prescribed By', type: 'text' },
          { name: 'notes', label: 'Notes', type: 'text' }
        ])}

        {renderSection('Surgeries', 'surgeries', [
          { name: 'procedure', label: 'Procedure', type: 'text' },
          { name: 'date', label: 'Date', type: 'date' },
          { name: 'surgeon', label: 'Surgeon', type: 'text' },
          { name: 'hospital', label: 'Hospital', type: 'text' },
          { name: 'notes', label: 'Notes', type: 'text' }
        ])}

        {renderSection('Family History', 'familyHistory', [
          { name: 'condition', label: 'Condition', type: 'text' },
          { name: 'relation', label: 'Relation', type: 'select', options: [
            { value: 'Father', label: 'Father' },
            { value: 'Mother', label: 'Mother' },
            { value: 'Sibling', label: 'Sibling' },
            { value: 'Grandparent', label: 'Grandparent' },
            { value: 'Other', label: 'Other' }
          ]},
          { name: 'ageOfOnset', label: 'Age of Onset', type: 'text' },
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

export default MedicalHistory; 