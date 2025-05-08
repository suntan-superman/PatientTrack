import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';

const Insurance = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    primary: {
      provider: '',
      policyNumber: '',
      groupNumber: '',
      planType: '',
      effectiveDate: '',
      expirationDate: '',
      subscriberName: '',
      subscriberDOB: '',
      relationship: '',
      copay: '',
      deductible: '',
      coinsurance: '',
      outOfPocketMax: ''
    },
    secondary: {
      provider: '',
      policyNumber: '',
      groupNumber: '',
      planType: '',
      effectiveDate: '',
      expirationDate: '',
      subscriberName: '',
      subscriberDOB: '',
      relationship: '',
      copay: '',
      deductible: '',
      coinsurance: '',
      outOfPocketMax: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const renderInsuranceForm = (type) => {
    const insurance = formData[type];
    const isSecondary = type === 'secondary';

    return (
      <div className={`${isSecondary ? 'mt-8' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {isSecondary ? 'Secondary Insurance' : 'Primary Insurance'}
          </h3>
          {isSecondary && !insurance.provider && (
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                secondary: {
                  ...prev.secondary,
                  provider: 'New Provider'
                }
              }))}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Secondary Insurance</span>
            </button>
          )}
        </div>

        {(!isSecondary || insurance.provider) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor={`${type}.provider`} className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Provider
              </label>
              <input
                id={`${type}.provider`}
                type="text"
                name={`${type}.provider`}
                value={insurance.provider}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.policyNumber`} className="block text-sm font-medium text-gray-700 mb-1">
                Policy Number
              </label>
              <input
                id={`${type}.policyNumber`}
                type="text"
                name={`${type}.policyNumber`}
                value={insurance.policyNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.groupNumber`} className="block text-sm font-medium text-gray-700 mb-1">
                Group Number
              </label>
              <input
                id={`${type}.groupNumber`}
                type="text"
                name={`${type}.groupNumber`}
                value={insurance.groupNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.planType`} className="block text-sm font-medium text-gray-700 mb-1">
                Plan Type
              </label>
              <select
                id={`${type}.planType`}
                name={`${type}.planType`}
                value={insurance.planType}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              >
                <option value="PPO">PPO</option>
                <option value="HMO">HMO</option>
                <option value="EPO">EPO</option>
                <option value="POS">POS</option>
                <option value="HDHP">HDHP</option>
              </select>
            </div>

            <div>
              <label htmlFor={`${type}.effectiveDate`} className="block text-sm font-medium text-gray-700 mb-1">
                Effective Date
              </label>
              <input
                id={`${type}.effectiveDate`}
                type="date"
                name={`${type}.effectiveDate`}
                value={insurance.effectiveDate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.expirationDate`} className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date
              </label>
              <input
                id={`${type}.expirationDate`}
                type="date"
                name={`${type}.expirationDate`}
                value={insurance.expirationDate}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.subscriberName`} className="block text-sm font-medium text-gray-700 mb-1">
                Subscriber Name
              </label>
              <input
                id={`${type}.subscriberName`}
                type="text"
                name={`${type}.subscriberName`}
                value={insurance.subscriberName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.subscriberDOB`} className="block text-sm font-medium text-gray-700 mb-1">
                Subscriber Date of Birth
              </label>
              <input
                id={`${type}.subscriberDOB`}
                type="date"
                name={`${type}.subscriberDOB`}
                value={insurance.subscriberDOB}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.relationship`} className="block text-sm font-medium text-gray-700 mb-1">
                Relationship to Subscriber
              </label>
              <select
                id={`${type}.relationship`}
                name={`${type}.relationship`}
                value={insurance.relationship}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              >
                <option value="Self">Self</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor={`${type}.copay`} className="block text-sm font-medium text-gray-700 mb-1">
                Copay ($)
              </label>
              <input
                id={`${type}.copay`}
                type="number"
                name={`${type}.copay`}
                value={insurance.copay}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.deductible`} className="block text-sm font-medium text-gray-700 mb-1">
                Deductible ($)
              </label>
              <input
                id={`${type}.deductible`}
                type="number"
                name={`${type}.deductible`}
                value={insurance.deductible}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.coinsurance`} className="block text-sm font-medium text-gray-700 mb-1">
                Coinsurance (%)
              </label>
              <input
                id={`${type}.coinsurance`}
                type="number"
                name={`${type}.coinsurance`}
                value={insurance.coinsurance}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor={`${type}.outOfPocketMax`} className="block text-sm font-medium text-gray-700 mb-1">
                Out of Pocket Maximum ($)
              </label>
              <input
                id={`${type}.outOfPocketMax`}
                type="number"
                name={`${type}.outOfPocketMax`}
                value={insurance.outOfPocketMax}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Insurance Information</h2>
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
        <div className="space-y-8">
          {/* Primary Insurance */}
          <div>
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">Primary Insurance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <label htmlFor="primaryProvider" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Provider
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryProvider"
                    type="text"
                    name="primary.provider"
                    value={formData.primary.provider}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryPolicyNumber" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Policy Number
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryPolicyNumber"
                    type="text"
                    name="primary.policyNumber"
                    value={formData.primary.policyNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryGroupNumber" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Group Number
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryGroupNumber"
                    type="text"
                    name="primary.groupNumber"
                    value={formData.primary.groupNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryPlanType" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Plan Type
                </label>
                <div className="w-2/3">
                  <select
                    id="primaryPlanType"
                    name="primary.planType"
                    value={formData.primary.planType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Plan Type</option>
                    <option value="PPO">PPO</option>
                    <option value="HMO">HMO</option>
                    <option value="EPO">EPO</option>
                    <option value="POS">POS</option>
                    <option value="HDHP">HDHP</option>
                    <option value="Medicare">Medicare</option>
                    <option value="Medicaid">Medicaid</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryEffectiveDate" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Effective Date
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryEffectiveDate"
                    type="date"
                    name="primary.effectiveDate"
                    value={formData.primary.effectiveDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryExpirationDate" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Expiration Date
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryExpirationDate"
                    type="date"
                    name="primary.expirationDate"
                    value={formData.primary.expirationDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primarySubscriberName" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Subscriber Name
                </label>
                <div className="w-2/3">
                  <input
                    id="primarySubscriberName"
                    type="text"
                    name="primary.subscriberName"
                    value={formData.primary.subscriberName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primarySubscriberDOB" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Subscriber DOB
                </label>
                <div className="w-2/3">
                  <input
                    id="primarySubscriberDOB"
                    type="date"
                    name="primary.subscriberDOB"
                    value={formData.primary.subscriberDOB}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryRelationship" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Relationship
                </label>
                <div className="w-2/3">
                  <select
                    id="primaryRelationship"
                    name="primary.relationship"
                    value={formData.primary.relationship}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Self">Self</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryCopay" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Copay
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryCopay"
                    type="text"
                    name="primary.copay"
                    value={formData.primary.copay}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryDeductible" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Deductible
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryDeductible"
                    type="text"
                    name="primary.deductible"
                    value={formData.primary.deductible}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryCoinsurance" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Coinsurance
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryCoinsurance"
                    type="text"
                    name="primary.coinsurance"
                    value={formData.primary.coinsurance}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="primaryOutOfPocketMax" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Out of Pocket Max
                </label>
                <div className="w-2/3">
                  <input
                    id="primaryOutOfPocketMax"
                    type="text"
                    name="primary.outOfPocketMax"
                    value={formData.primary.outOfPocketMax}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Insurance */}
          <div>
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">Secondary Insurance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryProvider" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Provider
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryProvider"
                    type="text"
                    name="secondary.provider"
                    value={formData.secondary.provider}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryPolicyNumber" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Policy Number
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryPolicyNumber"
                    type="text"
                    name="secondary.policyNumber"
                    value={formData.secondary.policyNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryGroupNumber" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Group Number
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryGroupNumber"
                    type="text"
                    name="secondary.groupNumber"
                    value={formData.secondary.groupNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryPlanType" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Plan Type
                </label>
                <div className="w-2/3">
                  <select
                    id="secondaryPlanType"
                    name="secondary.planType"
                    value={formData.secondary.planType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Plan Type</option>
                    <option value="PPO">PPO</option>
                    <option value="HMO">HMO</option>
                    <option value="EPO">EPO</option>
                    <option value="POS">POS</option>
                    <option value="HDHP">HDHP</option>
                    <option value="Medicare">Medicare</option>
                    <option value="Medicaid">Medicaid</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryEffectiveDate" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Effective Date
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryEffectiveDate"
                    type="date"
                    name="secondary.effectiveDate"
                    value={formData.secondary.effectiveDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryExpirationDate" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Expiration Date
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryExpirationDate"
                    type="date"
                    name="secondary.expirationDate"
                    value={formData.secondary.expirationDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondarySubscriberName" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Subscriber Name
                </label>
                <div className="w-2/3">
                  <input
                    id="secondarySubscriberName"
                    type="text"
                    name="secondary.subscriberName"
                    value={formData.secondary.subscriberName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondarySubscriberDOB" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Subscriber DOB
                </label>
                <div className="w-2/3">
                  <input
                    id="secondarySubscriberDOB"
                    type="date"
                    name="secondary.subscriberDOB"
                    value={formData.secondary.subscriberDOB}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryRelationship" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Relationship
                </label>
                <div className="w-2/3">
                  <select
                    id="secondaryRelationship"
                    name="secondary.relationship"
                    value={formData.secondary.relationship}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Self">Self</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryCopay" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Copay
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryCopay"
                    type="text"
                    name="secondary.copay"
                    value={formData.secondary.copay}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryDeductible" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Deductible
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryDeductible"
                    type="text"
                    name="secondary.deductible"
                    value={formData.secondary.deductible}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryCoinsurance" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Coinsurance
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryCoinsurance"
                    type="text"
                    name="secondary.coinsurance"
                    value={formData.secondary.coinsurance}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <label htmlFor="secondaryOutOfPocketMax" className="w-1/3 text-base font-medium text-indigo-900 pt-2">
                  Out of Pocket Max
                </label>
                <div className="w-2/3">
                  <input
                    id="secondaryOutOfPocketMax"
                    type="text"
                    name="secondary.outOfPocketMax"
                    value={formData.secondary.outOfPocketMax}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 border border-indigo-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
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

export default Insurance; 