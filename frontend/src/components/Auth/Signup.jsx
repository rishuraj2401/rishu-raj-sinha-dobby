import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../utils/api';
import { AuthContext } from '../usercontext/userContext';

const Signup = () => {
  // const { handleSignUp, prevRoute, setPrevRoute } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    if (!formData.username || !formData.password || !formData.name) {
      alert("enter all field");
    }
    else if (formData.password !== formData.confirmPassword) {
      alert("confirmPassword is not matching")
    }
    else {
      signup(formData).then((res) => {
        if (res?.success) {
          setUser(res?.user._id); navigate("/")
        }
      })
      console.log("Sending data to the backend:", formData);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-b w-full focus:outline-none"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border-b w-full focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-b w-full focus:outline-none"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label className="block text-gray-600">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-b w-full focus:outline-none"
          />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >  Sign Up
        </button>

        {/* Already Signed Up Link */}
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <button type="button" >
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
};
export default Signup;
