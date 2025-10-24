// src/components/SiteHeader.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userType } = useAuth(); // Connected auth context

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleMenuClose = () => setIsOpen(false);

  const isLoggedIn = !!user;

  // Define navigation links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/courses", label: "Courses" },
    { to: "/gallery", label: "Gallery" },
    { to: "/reviews", label: "Reviews" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="fixed top-0 left-0 h-20 w-full z-50 shadow-md bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
         
          <span className="text-2xl font-bold hidden md:inline tracking-wide">
            Vertex for BCS
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6 items-center font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleMenuClose}
              className="relative hover:text-yellow-300 transition duration-300 group"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {isLoggedIn ? (
            <Link
              to={
                userType === "admin" ? "/admin/student" : "/student/dashboard"
              }
              onClick={handleMenuClose}
              className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300 shadow-md"
            >
              Account
            </Link>
          ) : (
            <>
              <Link
                to="/student/login"
                onClick={handleMenuClose}
                className="border border-white py-2 px-4 rounded hover:bg-white hover:text-indigo-600 transition-all duration-300 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/student/register"
                onClick={handleMenuClose}
                className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Signup
              </Link>
            </>
          )}
        </nav>

        {/* Hamburger Menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none transition-all"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m0 6H4"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-md z-50 md:hidden"
          onClick={handleMenuClose}
        >
          <div
            className={`absolute left-0 top-0 w-64 h-full bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600 p-6 space-y-6 transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleMenuClose}
                className="block text-lg text-white font-medium hover:text-yellow-300 transition duration-300"
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <Link
                to={
                  userType === "admin" ? "/admin/student" : "/student/dashboard"
                }
                className="block text-lg text-yellow-400 font-bold mt-4"
                onClick={handleMenuClose}
              >
                Account
              </Link>
            ) : (
              <>
                <Link
                  to="/student/login"
                  onClick={handleMenuClose}
                  className="block text-lg bg-white text-indigo-700 font-semibold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/student/register"
                  onClick={handleMenuClose}
                  className="block text-lg bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
