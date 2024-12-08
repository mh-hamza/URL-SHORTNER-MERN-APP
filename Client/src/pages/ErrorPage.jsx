import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Navigates to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-6 animate__animated animate__fadeInDown">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-4 animate__animated animate__fadeInUp">
          Page Not Found
        </h2>
        <p className="text-lg mb-8 animate__animated animate__fadeInUp opacity-80">
          Sorry, the page you're looking for doesn't exist.
        </p>
        
        {/* Container for the button */}
        <div className="flex justify-center">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2 text-2xl" />
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
