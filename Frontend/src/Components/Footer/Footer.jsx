import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1b4883] text-white py-4 px-8 flex items-center justify-between sticky bottom-0 mt-20 opacity-95">
      <div className="text-sm">
        &copy; 2024 Pawfect Match. All rights reserved.
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300 transition-colors duration-300">
          Privacy Policy
        </Link>
        <Link to="/contact" className="hover:text-gray-300 transition-colors duration-300">
          Contact Us
        </Link>
        <Link to="/donate" className="hover:text-gray-300 transition-colors duration-300">
          Donate for Pets
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
