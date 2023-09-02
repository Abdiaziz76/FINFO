import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData',formData);
    navigate('/signin')
    // Handle form submission (e.g., send data to a server for user registration)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white shadow-md rounded-lg">
        <h2 className='text-2xl font-semibold text-blue-500'><Link to='/' >FINFO</Link></h2>
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Sign Up
          </button>
          <p className="mt-4">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;