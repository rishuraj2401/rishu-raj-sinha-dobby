import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../utils/api';
import { AuthContext } from '../usercontext/userContext';

const Login = () => {

  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    strategy: "local"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("enter all field");
    } else {
      login(formData).then((res) => {
        if (res?.success) {
          setUser(res?.user._id); navigate("/"); console.log("this is user", res);
        }
      })

    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2">
              Email
            </label>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border-b w-full py-2 focus:outline-none focus:border-blue-500"
              //   placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-b w-full py-2 focus:outline-none focus:border-blue-500"
              //   placeholder="Your Password"
              required
            />
          </div>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            type="submit" onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Don&apos;t have an account? <button type='button' ><Link to="/signup">Sign Up</Link></button>
        </p>
      </div>
    </div>
  );
};

export default Login;
