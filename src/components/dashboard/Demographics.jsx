import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Demographics = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    race: 'White',
    ethnicity: 'Not Hispanic or Latino',
    primaryLanguage: 'English',
    maritalStatus: 'Married',
    occupation: 'Software Engineer',
    education: 'Bachelor\'s Degree',
    householdIncome: '75000-100000',
    householdSize: '2',
    livingSituation: 'Own Home',
    transportation: 'Personal Vehicle',
    employmentStatus: 'Employed Full-time',
    workSchedule: 'Regular Day Shift'
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
    // Here you would typically make an API call to update the demographics
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Demographics</h2>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <label htmlFor="race" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Race
            </label>
            <div className="w-2/3">
              <select
                id="race"
                name="race"
                value={formData.race}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Race</option>
                <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                <option value="Asian">Asian</option>
                <option value="Black or African American">Black or African American</option>
                <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                <option value="White">White</option>
                <option value="Two or More Races">Two or More Races</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="ethnicity" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Ethnicity
            </label>
            <div className="w-2/3">
              <select
                id="ethnicity"
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Ethnicity</option>
                <option value="Hispanic or Latino">Hispanic or Latino</option>
                <option value="Not Hispanic or Latino">Not Hispanic or Latino</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="primaryLanguage" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Primary Language
            </label>
            <div className="w-2/3">
              <input
                id="primaryLanguage"
                type="text"
                name="primaryLanguage"
                value={formData.primaryLanguage}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="maritalStatus" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Marital Status
            </label>
            <div className="w-2/3">
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
                <option value="Domestic Partnership">Domestic Partnership</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="occupation" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Occupation
            </label>
            <div className="w-2/3">
              <input
                id="occupation"
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="education" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Education
            </label>
            <div className="w-2/3">
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Education Level</option>
                <option value="Less than High School">Less than High School</option>
                <option value="High School/GED">High School/GED</option>
                <option value="Some College">Some College</option>
                <option value="Associate's Degree">Associate's Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="householdIncome" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Household Income
            </label>
            <div className="w-2/3">
              <select
                id="householdIncome"
                name="householdIncome"
                value={formData.householdIncome}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Income Range</option>
                <option value="Less than $25,000">Less than $25,000</option>
                <option value="$25,000 - $49,999">$25,000 - $49,999</option>
                <option value="$50,000 - $74,999">$50,000 - $74,999</option>
                <option value="$75,000 - $99,999">$75,000 - $99,999</option>
                <option value="$100,000 - $149,999">$100,000 - $149,999</option>
                <option value="$150,000 or more">$150,000 or more</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="householdSize" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Household Size
            </label>
            <div className="w-2/3">
              <input
                id="householdSize"
                type="number"
                name="householdSize"
                value={formData.householdSize}
                onChange={handleInputChange}
                disabled={!isEditing}
                min="1"
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="livingSituation" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Living Situation
            </label>
            <div className="w-2/3">
              <select
                id="livingSituation"
                name="livingSituation"
                value={formData.livingSituation}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Living Situation</option>
                <option value="Own Home">Own Home</option>
                <option value="Rent">Rent</option>
                <option value="Live with Family">Live with Family</option>
                <option value="Assisted Living">Assisted Living</option>
                <option value="Nursing Home">Nursing Home</option>
                <option value="Homeless">Homeless</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="transportation" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Transportation
            </label>
            <div className="w-2/3">
              <select
                id="transportation"
                name="transportation"
                value={formData.transportation}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Transportation</option>
                <option value="Personal Vehicle">Personal Vehicle</option>
                <option value="Public Transportation">Public Transportation</option>
                <option value="Ride Share">Ride Share</option>
                <option value="Family/Friend">Family/Friend</option>
                <option value="Medical Transport">Medical Transport</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="employmentStatus" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Employment Status
            </label>
            <div className="w-2/3">
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Status</option>
                <option value="Employed Full-time">Employed Full-time</option>
                <option value="Employed Part-time">Employed Part-time</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
                <option value="Disabled">Disabled</option>
                <option value="Student">Student</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label htmlFor="workSchedule" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
              Work Schedule
            </label>
            <div className="w-2/3">
              <select
                id="workSchedule"
                name="workSchedule"
                value={formData.workSchedule}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Schedule</option>
                <option value="Day Shift">Day Shift</option>
                <option value="Night Shift">Night Shift</option>
                <option value="Rotating Shift">Rotating Shift</option>
                <option value="Flexible Hours">Flexible Hours</option>
                <option value="Weekends Only">Weekends Only</option>
                <option value="Not Applicable">Not Applicable</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

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

export default Demographics; 