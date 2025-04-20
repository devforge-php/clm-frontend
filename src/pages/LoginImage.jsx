import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { $axios } from "../utils";
import { Helmet } from "react-helmet";

const LoginImage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await $axios.post("login", formData);

      if (response.status === 200) {
        // No role-related redirection
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("role", response?.data?.role);
        navigate("/dashboard"); // Redirect to home after successful login
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      // console.error("Network error:", error);
      setError("Network error, please try again");
      if (error?.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <Helmet>
        <title>Login - CLM</title>
        <meta
          name="description"
          content="Login page to access the CLM platform. Log in to your profile and start collecting subscribers."
        />
      </Helmet>
      <div
        className="flex justify-center items-center h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/logistika.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative w-[400px] p-8 backdrop-blur-xl border border-white rounded-xl shadow-lg text-white flex flex-col items-center">
          <h2 className="text-5xl font-bold mb-8">Login</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="w-full flex items-center mb-6 relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-300 rounded-full text-white font-bold outline-none placeholder-gray-200 text-lg"
            />
            <EnvelopeIcon className="absolute right-4 w-7 text-white" />
          </div>

          <div className="w-full flex items-center mb-6 relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-300 rounded-full text-white font-bold outline-none placeholder-gray-200 text-lg"
            />
            <LockClosedIcon className="absolute right-4 w-7 text-white" />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 text-2xl font-bold bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-lg">
            Don't have an account?
            <Link to="/register" className="font-bold hover:underline ml-2">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginImage;
