import React, { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

const LoginDialog = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // Default role
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }
    // Here you would typically make an API call to authenticate
    onLogin({ email, role });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="p-8">
          <div className="text-center text-4xl font-bold mb-8">
            <span className="text-black">Patient</span>
            <span className="text-green-500">Track</span>
          </div>
          <div className="py-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Sign in to Account
            </h2>
            <div className="border-2 w-full border-green-500 inline-block mb-6" />
            
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="bg-gray-100 w-full p-2 flex items-center mb-4 rounded-lg">
                <FaRegEnvelope className="text-gray-500 m-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="bg-gray-100 w-full p-2 flex items-center mb-4 rounded-lg">
                <MdLockOutline className="text-gray-500 m-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="w-full mb-4">
                <select
                  className="w-full p-2 bg-gray-100 rounded-lg outline-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="patient">Patient</option>
                  <option value="provider">Healthcare Provider</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {errorMsg && (
                <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="bg-black text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-gray-800 transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog; 