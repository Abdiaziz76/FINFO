import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


import { axiosPublic } from "../../lib/axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";

const Signin = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
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
    let payload = {
        email: formData.email.toLowerCase(),
        password: formData.password,
        };

    // console.log('payload',payload);
    

    
    axiosPublic
        .post('/api/sign-in/', payload)
        .then((res) => {
            // console.log('res', res);
            if (res.request.status === 201 || res.request.status === 200) {
                var decoded = jwt_decode(res.data.access);
                // console.log('decoded',decoded)
                var refresh_decoded = jwt_decode(res.data.refresh);
                // console.log('refresh_decoded',refresh_decoded)
        
                localStorage.setItem("refresh", res.data.refresh);
                setAuth({
                  user_id: decoded.user_id,
                  user: decoded.email,
                  roles: decoded.user_group,
                  username: decoded.first_name,
                  accessToken: res.data.access,
                });
        
                let cat = ['100'];
                // cat.push(decoded.user_group);
        
                //  console.log("category",cat)
                localStorage.setItem("cat", cat);
        
                setAuth((prevAuth) => ({
                  ...prevAuth,
                  roles: cat,
                }));

                // console.log('auth',auth)
                
        
            navigate('/recommendations')
  }})
        .catch((err) => {
            console.log('err', err);
        });

    


   
    // Handle form submission (e.g., send data to a server for user authentication)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white shadow-md rounded-lg">
        <h2 className='text-2xl font-semibold text-blue-500'><Link to='/' >FININFO</Link></h2>
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
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
            Sign In
          </button>
          <p className="mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
