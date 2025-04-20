import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); 
    } else {
      navigate('/login'); 
    }
  }, [navigate]);
 

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-white md:bg-transparent">
      {/* Video background: faqat md dan katta ekranlarda ko‘rsatiladi */}
      <video
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
        src="/videoBack.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay: faqat md dan katta ekranlarda qora qatlam ko‘rsatiladi */}
      <div className="hidden md:block absolute inset-0   z-0"></div>

      {/* Modal window */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Welcome to CLM Logistics!</h1>
        <p className="text-gray-600 text-center mb-8">
          This platform empowers you to manage logistics efficiently, earn rewards, and grow your network through referrals.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <Link
            to="/register"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition duration-300 block text-center"
          >
            Register Now
          </Link>
          <Link
            to="/login"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition duration-300 block text-center"
          >
           Access the system 
          </Link>
        </div>

        {/* Extra info */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Need help? Contact us:</p>
          <br />
          <a href="https://clmgo.org" className="text-blue-500 hover:underline">
            https://clmgo.org
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
