import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="flex items-center justify-center min-h-screen pt-14 pb-14">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg mb-4">Your submission was successful. We appreciate your contribution!</p>
          <button
            onClick={handleGoHome}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
