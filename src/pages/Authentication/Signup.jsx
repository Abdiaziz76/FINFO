import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../lib/axios/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log('passwords do not match!');
      return;
    }
    const payload = {
      email: formData.email,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
    };
    console.log('payload', payload);
    axiosPublic
      .post('/auth/signup', payload)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
      

    navigate('/signin');
    // Handle form submission (e.g., send data to a server for user registration)
  };

  // Define an array of input objects
  const formInputs = [
    {
      type: 'text',
      name: 'firstname',
      value: formData.firstname,
      placeholder: 'First Name',
    },
    {
      type: 'text',
      name: 'lastname',
      value: formData.lastname,
      placeholder: 'Last Name',
    },
    {
      type: 'email',
      name: 'email',
      value: formData.email,
      placeholder: 'Email',
    },
    {
      type: showPassword ? 'text' : 'password',
      name: 'password',
      value: formData.password,
      placeholder: 'Password',
      icon: showPassword ? <FaEyeSlash /> : <FaEye />,
      toggleVisibility: togglePasswordVisibility,
    },
    {
      type: showConfirmPassword ? 'text' : 'password',
      name: 'confirmPassword',
      value: formData.confirmPassword,
      placeholder: 'Confirm Password',
      icon: showConfirmPassword ? <FaEyeSlash /> : <FaEye />,
      toggleVisibility: toggleConfirmPasswordVisibility,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-blue-500">
          <Link to="/">FININFO</Link>
        </h2>
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

        {/* Map over the formInputs array to render input fields */}
        {formInputs.map((input, index) => (
          <div key={index} className="mb-4 relative">
            <input
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={handleChange}
              placeholder={input.placeholder}
              className="w-full px-4 py-2 border rounded outline-blue-600 pr-10"
              required
            />
            {input.name === 'password' || input.name === 'confirmPassword' ? (
              <button
                type="button"
                onClick={input.toggleVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                {input.icon}
              </button>
            ) : null}
          </div>
        ))}

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Sign Up
          </button>
          <p className="mt-4">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
