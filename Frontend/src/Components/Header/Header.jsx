import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Header = ({ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsAdmin(false)
    try {
      await axios.post("http://127.0.0.1:5008/api/auth/logout", { withCredentials: true });
    } catch (error) {
      console.log(error)
    }

    navigate('/');
  };

  return (
    <header className={`bg-[#1b4883] text-white py-4 px-8 flex items-center justify-between shadow-lg relative ${isMenuOpen ? "": ""}`}>
      {/* Left side */}
      <div className="text-2xl font-bold hover:scale-110 transition-transform duration-300">
        <Link to="/" className="hover:text-gray-200 transition-colors duration-300">
          Pawfect Match
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="block lg:hidden text-white focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Center navigation */}
      <nav
        className={`lg:flex lg:space-x-8 ${isMenuOpen ? 'block' : 'hidden'} absolute lg:relative lg:top-0 lg:left-0 lg:mt-0 top-full left-0 w-full lg:w-auto lg:bg-transparent bg-[#1b4883] lg:shadow-none shadow-lg`}
      >
        <div className="lg:flex lg:space-x-8 flex-col lg:flex-row space-y-4 lg:space-y-0 px-4 py-4 lg:p-0">
          <Link
            to="/"
            className="text-lg hover:text-gray-200 hover:scale-110 hover:bg-[#1b4c93] p-2 rounded-md transition-transform transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/adopt-us"
            className="text-lg hover:text-gray-200 hover:scale-110 hover:bg-[#1b4c93] p-2 rounded-md transition-transform transition-colors duration-300"
          >
            Adopt Us
          </Link>
          {isAdmin && (
            <Link
              to="/shelter"
              className="text-lg hover:text-gray-200 hover:scale-110 hover:bg-[#1b4c93] p-2 rounded-md transition-transform transition-colors duration-300"
            >
              Shelter
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/dashboard"
              className="text-lg hover:text-gray-200 hover:scale-110 hover:bg-[#1b4c93] p-2 rounded-md transition-transform transition-colors duration-300"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/events"
            className="text-lg hover:text-gray-200 hover:scale-110 hover:bg-[#1b4c93] p-2 rounded-md transition-transform transition-colors duration-300"
          >
            Events
          </Link>

          {/* Right side - Mobile */}
          <div className="lg:hidden mt-4 space-y-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="bg-[#45b962] text-[white] font-semibold text-lg px-6 py-3 rounded-md hover:bg-[#e4b993] hover:scale-110 hover:text-[#001d4d] transition-transform transition-colors duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#bf3b00] text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-[#e0562f] hover:scale-110 hover:text-[#ffefe0] transition-transform transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-[#45b962] text-[white] font-semibold text-lg px-6 py-3 rounded-md hover:bg-[#e4b993] hover:scale-110 hover:text-[#001d4d] transition-transform transition-colors duration-300"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-[#bf3b00] text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-[#e0562f] hover:scale-110 hover:text-[#ffefe0] transition-transform transition-colors duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Right side - Desktop */}
      <div className="space-x-4 hidden lg:flex">
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className="bg-[#45b962] text-[white] font-semibold text-lg px-6 py-3 rounded-md hover:bg-[#e4b993] hover:scale-110 hover:text-[#001d4d] transition-transform transition-colors duration-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-[#bf3b00] text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-[#e0562f] hover:scale-110 hover:text-[#ffefe0] transition-transform transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-[#45b962] text-[white] font-semibold text-lg px-6 py-3 rounded-md hover:bg-[#e4b993] hover:scale-110 hover:text-[#001d4d] transition-transform transition-colors duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-[#bf3b00] text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-[#e0562f] hover:scale-110 hover:text-[#ffefe0] transition-transform transition-colors duration-300"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;