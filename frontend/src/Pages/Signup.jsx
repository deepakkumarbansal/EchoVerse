import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";



const Signup = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isViewingPassword, setIsViewingPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    else if(formData.password.length < 8){
        setError("Password must be at least 8 characters long");
        setIsLoading(false);
        return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/register`,
        {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        const data = response.data.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }

      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      if (err.response?.status === 401) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Left side: Signup Form */}
      <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Create Account</h2>
          <p className="text-center text-gray-600 mb-6">Join us and explore awesome features!</p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                    type={`${isViewingPassword ? "text" : "password"}`}
                    id="password"
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <span className="absolute top-1/4 right-5 text-2xl" onClick={()=>setIsViewingPassword(!isViewingPassword)}>{isViewingPassword? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-300"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Right side: Image / Illustration */}
        <div className="p-10 w-1/2 hidden lg:flex justify-center items-center bg-blue-500 h-screen">
          <img
            src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=1000&q=80"
            alt="Signup Illustration"
            className="max-w-full shadow-2xl rounded-xl animate-fade-in"
          />
        </div>
    </div>
  );
};

export default Signup;
