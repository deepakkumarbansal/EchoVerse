import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../Context/UserContext';

const Login = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setUser(data.data.user);
        navigate("/home");
      }

      setFormData({ email: "", password: "" });
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 402) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center p-10">
      <img
        src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=1000&q=80"
        alt="Login Visual"
        className="rounded-xl shadow-2xl max-w-full h-auto animate-fade-in"
        />

      </div>

      {/* Right side form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-16 py-10 bg-white">
        <div className="max-w-md w-full mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">Welcome Back</h1>
          <p className="text-sm text-gray-500 text-center">Please log in to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 transition rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
