import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-100 shadow-sm p-8">

        {/* Header Section */}

        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#1e3a8a] p-3 rounded-xl mb-4 shadow-md">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 style={{ color: '#1e3a8a', fontWeight: '900', fontsize: '2rem' }}
            className="uppercase tracking-light"
          >
            INSYNC-ILES
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Internship Logging & Evaluation System
          </p>
        </div>

        {/* Form Section */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@cit.ac.ug"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="text"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-[#1e3a8a] hover:bg-[#172e6d] text-white font-semibold py-3 rounded-lg transition-colors shadow-sm active:transform active:scale-[0.98]"
          >
            Sign In
          </button>

        </form>

        {/* Footer Section */}

        <div className="mt-8 text-center">

          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#1e3a8a] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};
export default LoginPage;