import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet";
const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    city: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Yo‘naltirish uchun

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError(""); // Avvalgi xatolarni tozalash
    setLoading(true);

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // console.log("Sending data:", JSON.stringify(formData));

      const response = await fetch("https://backendclm.uz/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.first_name,
          lastname: formData.last_name,
          username: formData.username,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      // console.log("Response data:", data);
      // console.log("Response status:", response.status);

      if (!response.ok) {
        console.log("Server error:", data);
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // alert("Registration successful!");
      navigate("/login"); // Login sahifasiga yo‘naltirish
    } catch (error) {
      // console.error("Network or server error:", error);
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
        <title>Register - CLM</title>
        <meta
          name="description"
          content="Register as a new user and start using the CLM platform."
        />
      </Helmet>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center relative p-4"
        style={{ backgroundImage: "url('/logistika.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-[350px] w-full p-6 backdrop-blur-lg border border-gray-300 rounded-lg shadow-md text-white flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {[
            {
              name: "first_name",
              placeholder: "First Name",
              icon: <UserIcon className="absolute right-3 w-5 text-gray-300" />,
            },
            {
              name: "last_name",
              placeholder: "Last Name",
              icon: <UserIcon className="absolute right-3 w-5 text-gray-300" />,
            },
            {
              name: "username",
              placeholder: "Username",
              icon: (
                <IdentificationIcon className="absolute right-3 w-5 text-gray-300" />
              ),
            },
            {
              name: "city",
              placeholder: "City",
              icon: (
                <MapPinIcon className="absolute right-3 w-5 text-gray-300" />
              ),
            },
            {
              name: "phone",
              placeholder: "Phone",
              icon: (
                <DevicePhoneMobileIcon className="absolute right-3 w-5 text-gray-300" />
              ),
              type: "tel",
            },
            {
              name: "email",
              placeholder: "Email",
              icon: (
                <EnvelopeIcon className="absolute right-3 w-5 text-gray-300" />
              ),
              type: "email",
            },
            {
              name: "password",
              placeholder: "Password",
              icon: (
                <LockClosedIcon className="absolute right-3 w-5 text-gray-300" />
              ),
              type: "password",
            },
            {
              name: "confirm_password",
              placeholder: "Confirm Password",
              icon: (
                <LockClosedIcon className="absolute right-3 w-5 text-gray-300" />
              ),
              type: "password",
            },
          ].map(({ name, placeholder, icon, type = "text" }) => (
            <div key={name} className="w-full flex items-center mb-3 relative">
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 bg-transparent border border-gray-400 rounded-md text-white font-medium outline-none placeholder-gray-300 text-base"
              />
              {icon}
            </div>
          ))}

          <button
            onClick={handleRegister}
            className="w-full py-2 text-xl font-bold bg-white text-black rounded-md hover:bg-gray-200 transition"
          >
            Register
          </button>

          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
