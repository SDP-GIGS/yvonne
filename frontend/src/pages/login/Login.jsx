import React, { useState } from 'react';
import { GraduationCap, AlertCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const location = useLocation();
  const justRegistered = location.state?.registered;

  //const handleSubmit = async (e) => {
    //e.preventDefault();
    //setError('');
    //setLoading(true);
    //const result = await loginUser(email, password);
    //setLoading(false);
    //if (!result.success) {
    //  setError(result.message);
    //}
  //};
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // Send 'email' as the key to match what your backend is asking for
    await loginUser({ email: email, password: password }); 
    
  } catch (err) {
    // Check if the backend sent a specific error message
    const serverMessage = err.response?.data?.detail || 
                         err.response?.data?.non_field_errors?.[0] || 
                         "Invalid email or password.";
    setError(serverMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-100 shadow-sm p-8">

        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#1e3a8a] p-3 rounded-xl mb-4 shadow-md">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 style={{ color: '#1e3a8a', fontWeight: '900', fontSize: '2rem' }}
            className="uppercase tracking-tight"
          >
            INSYNC-ILES
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Internship Logging & Evaluation System
          </p>
        </div>

        {/* Success banner after registration */}
        {justRegistered && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            Account created! Please log in.
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@cit.ac.ug"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-black rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            {/* FIX: was type="text" which exposed passwords in plaintext */}
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-black rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a8a] hover:bg-[#172e6d] text-white font-semibold py-3 rounded-lg transition-colors shadow-sm active:transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

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
