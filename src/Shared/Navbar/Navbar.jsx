import React, { useState } from "react";
import { FaHome, FaBuilding, FaChartBar, FaSignInAlt, FaInfoCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
            <Logo/>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="flex items-center hover:text-blue-400 ">
              <FaHome className="mr-2" /> Home
            </a>
            <a href="/about" className="flex items-center hover:text-blue-400 ">
              <FaInfoCircle className="mr-2" /> About
            </a>
            <a href="/properties" className="flex items-center hover:text-blue-400 ">
              <FaBuilding className="mr-2" /> All Properties
            </a>
            <a href="/dashboard" className="flex items-center  hover:text-blue-400">
              <FaChartBar className="mr-2" /> Dashboard
            </a>
            <a href="/login" className="flex items-center  hover:text-blue-400 ">
              <FaSignInAlt className="mr-2" /> Login
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="focus:outline-none ml-4"
            >
              {isMenuOpen ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <GiHamburgerMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 z-50 relative">
            <div className="flex flex-col space-y-3">
              <a href="/" className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md">
                <FaHome className="mr-2" /> Home
              </a>
              <a href="/about" className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md">
                <FaInfoCircle className="mr-2" /> About
              </a>
              <a href="/properties" className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md">
                <FaBuilding className="mr-2" /> All Properties
              </a>
              <a href="/dashboard" className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md">
                <FaChartBar className="mr-2" /> Dashboard
              </a>
              <a href="/login" className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md">
                <FaSignInAlt className="mr-2" /> Login
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;