import React, { useState } from 'react';
import { FaPaperPlane, FaSearch, FaFilter, FaDownload } from 'react-icons/fa';

const SecureMessaging = ({ showArchive = false }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - replace with actual data from your backend
  const conversations = [
    {
      id: 1,
      provider: 'Dr. Sarah Johnson',
      lastMessage: 'Your test results are ready for review.',
      timestamp: '2024-03-15T10:30:00',
      unread: true,
      status: 'active'
    },
    {
      id: 2,
      provider: 'Dr. Michael Chen',
      lastMessage: 'Please confirm your appointment for next week.',
      timestamp: '2024-03-14T15:45:00',
      unread: false,
      status: 'active'
    },
    {
      id: 3,
      provider: 'Nurse Practitioner Lisa Wong',
      lastMessage: 'Your prescription has been updated.',
      timestamp: '2024-03-13T09:15:00',
      unread: false,
      status: 'archived'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', message);
    setMessage('');
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    const matchesArchive = showArchive ? conv.status === 'archived' : conv.status === 'active';
    return matchesSearch && matchesFilter && matchesArchive;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {showArchive ? 'Message Archive' : 'Secure Messaging'}
        </h2>
        <p className="text-gray-600 mt-1">
          {showArchive 
            ? 'View your archived messages and conversations'
            : 'Communicate securely with your healthcare providers'}
        </p>
      </div>

      <div className="flex h-[calc(100vh-16rem)]">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 p-4">
          <div className="mb-4 flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedConversation?.id === conv.id
                    ? 'bg-indigo-50 border-indigo-500'
                    : 'hover:bg-gray-50'
                } ${conv.unread ? 'font-semibold' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-gray-800">{conv.provider}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(conv.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1 truncate">
                  {conv.lastMessage}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedConversation.provider}
                </h3>
                <p className="text-sm text-gray-500">
                  Last message: {new Date(selectedConversation.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {/* Messages will be displayed here */}
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-indigo-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
                      <p>Hello, I have a question about my recent test results.</p>
                      <span className="text-xs text-indigo-200 mt-1 block">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-[70%]">
                      <p>I'd be happy to help you with that. Which test results are you referring to?</p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {!showArchive && (
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 transition-colors"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to view messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecureMessaging; 