import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logos.png"; // Adjust the logo path if necessary
import { useAdminAuth } from "../providers/AdminAuthProvider";
import { useStudentAuth } from "../providers/StudentAuthProvider";

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticatedAdmin } = useAdminAuth();
  const { isAuthenticatedStudent } = useStudentAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleMenuClose = () => setIsOpen(false);

  const isLoggedIn = isAuthenticatedAdmin || isAuthenticatedStudent;

  return (
    <header className="w-full bg-[#ADD8E6] text-white py-6 border-white border-b-[1px]">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-10 h-full">
        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 md:h-24" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4 ml-8 items-center h-full text-black">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/courses" className="hover:underline">
            Courses
          </Link>
          <Link to="/gallery" className="hover:underline">
            Gallery
          </Link>
          <Link to="/reviews" className="hover:underline">
            Reviews
          </Link>
          <Link to="/pricing" className="hover:underline">
            Pricing
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>

          {isLoggedIn ? (
            isAuthenticatedStudent ? (
              <Link to="/student/dashboard" className="hover:underline">
                Account
              </Link>
            ) : (
              <Link to="/admin/dashboard" className="hover:underline">
                Account
              </Link>
            )
          ) : (
            <>
              <Link
                to="/student/login"
                className="border border-white hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
              <Link
                to="/student/register"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex transition-all duration-500 ease-in-out"
          onClick={handleMenuClose} // Closes menu when clicking on the blurred background
        >
          {/* Background Blur */}
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm" />

          {/* Menu */}
          <div
            className={`bg-gray-800 w-64 h-full p-6 pt-10 transition-all duration-500 ease-in-out transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the menu
          >
            <button onClick={handleMenuClose} className="text-white text-3xl">
              X
            </button>
            <nav className="mt-4 flex flex-col space-y-4">
              <Link
                to="/"
                onClick={handleMenuClose}
                className="hover:underline"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={handleMenuClose}
                className="hover:underline"
              >
                About Us
              </Link>
              <Link
                to="/courses"
                onClick={handleMenuClose}
                className="hover:underline"
              >
                Courses
              </Link>
              <Link
                to="/gallery"
                onClick={handleMenuClose}
                className="hover:underline"
              >
                Gallery
              </Link>
              <Link
                to="/reviews"
                onClick={handleMenuClose}
                className="hover:underline"
              >
                Reviews
              </Link>
              <Link
                to="/pricing"
                onClick={handleMenuClose}
                className="hover:underline"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                onClick={handleMenuClose}
                className="hover:underline"
              >
                Contact Us
              </Link>

              {isLoggedIn ? (
                isAuthenticatedStudent ? (
                  <Link
                    to="/student/dashboard"
                    onClick={handleMenuClose}
                    className="hover:underline"
                  >
                    Account
                  </Link>
                ) : (
                  <Link
                    to="/admin/student"
                    onClick={handleMenuClose}
                    className="hover:underline"
                  >
                    Account
                  </Link>
                )
              ) : (
                <>
                  <Link
                    to="/student/login"
                    onClick={handleMenuClose}
                    className="border border-white hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to="/student/register"
                    onClick={handleMenuClose}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Signup
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
