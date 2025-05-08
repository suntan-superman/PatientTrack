import React, { useState } from 'react';
import { FaUpload, FaDownload, FaSearch, FaFilter, FaFileAlt, FaFilePdf, FaFileImage, FaFileWord, FaSignature } from 'react-icons/fa';

const DocumentManagement = ({ showSignatures = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Sample data - replace with actual data from your backend
  const documents = [
    {
      id: 1,
      name: 'Lab Results - Blood Work',
      type: 'pdf',
      category: 'lab-results',
      uploadDate: '2024-03-15',
      size: '2.4 MB',
      status: 'completed',
      requiresSignature: false
    },
    {
      id: 2,
      name: 'Intake Form',
      type: 'doc',
      category: 'forms',
      uploadDate: '2024-03-14',
      size: '1.2 MB',
      status: 'pending',
      requiresSignature: true
    },
    {
      id: 3,
      name: 'X-Ray Results',
      type: 'image',
      category: 'imaging',
      uploadDate: '2024-03-13',
      size: '4.8 MB',
      status: 'completed',
      requiresSignature: false
    },
    {
      id: 4,
      name: 'Consent Form',
      type: 'pdf',
      category: 'forms',
      uploadDate: '2024-03-12',
      size: '1.5 MB',
      status: 'pending',
      requiresSignature: true
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'doc':
        return <FaFileWord className="text-blue-500" />;
      case 'image':
        return <FaFileImage className="text-green-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.category === filterType;
    const matchesSignature = showSignatures ? doc.requiresSignature : true;
    return matchesSearch && matchesFilter && matchesSignature;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Here you would typically upload the file to your backend
      console.log('Uploading file:', file.name);
    }
  };

  const handleSignature = (doc) => {
    // Here you would typically open a signature pad or redirect to a signature page
    console.log('Opening signature pad for:', doc.name);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {showSignatures ? 'Digital Signatures' : 'Document & Form Management'}
        </h2>
        <p className="text-gray-600 mt-1">
          {showSignatures 
            ? 'Review and sign documents requiring your signature'
            : 'Upload, view, and manage your medical documents and forms'}
        </p>
      </div>

      <div className="p-6">
        {/* Search and Filter Bar */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="lab-results">Lab Results</option>
            <option value="forms">Forms</option>
            <option value="imaging">Imaging</option>
          </select>
          {!showSignatures && (
            <label className="bg-indigo-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-indigo-600 transition-colors">
              <FaUpload className="inline-block mr-2" />
              Upload
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </label>
          )}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedDocument(doc)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    <p>Uploaded: {doc.uploadDate}</p>
                    <p>Size: {doc.size}</p>
                    {doc.requiresSignature && (
                      <p className="text-indigo-500 mt-1">
                        <FaSignature className="inline-block mr-1" />
                        Requires Signature
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-indigo-500 hover:text-indigo-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Here you would typically trigger the download
                      console.log('Downloading:', doc.name);
                    }}
                  >
                    <FaDownload />
                  </button>
                  {showSignatures && doc.requiresSignature && (
                    <button
                      type="button"
                      className="text-green-500 hover:text-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSignature(doc);
                      }}
                    >
                      <FaSignature />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Document Preview Modal */}
        {selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedDocument.name}
                </h3>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedDocument(null)}
                >
                  ×
                </button>
              </div>
              <div className="p-4">
                {/* Document preview would go here */}
                <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Document Preview</p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setSelectedDocument(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                  onClick={() => {
                    // Here you would typically trigger the download
                    console.log('Downloading:', selectedDocument.name);
                  }}
                >
                  Download
                </button>
                {showSignatures && selectedDocument.requiresSignature && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => handleSignature(selectedDocument)}
                  >
                    Sign Document
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentManagement; 