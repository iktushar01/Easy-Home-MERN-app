import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBuilding, FaChartBar, FaSignInAlt, FaInfoCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logo from "../Logo/Logo";
import LogOutBtn from "../../Componens/Buttons/LogOutBtn";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Style for active NavLink
  const activeStyle = {
    color: "#60a5fa", // blue-400
  };

  return (
    <nav className="w-full bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className="flex items-center hover:text-blue-400"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <FaHome className="mr-2" /> Home
            </NavLink>
            <NavLink 
              to="/about" 
              className="flex items-center hover:text-blue-400"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <FaInfoCircle className="mr-2" /> About
            </NavLink>
            <NavLink 
              to="/properties" 
              className="flex items-center hover:text-blue-400"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <FaBuilding className="mr-2" /> All Properties
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className="flex items-center hover:text-blue-400"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              <FaChartBar className="mr-2" /> Dashboard
            </NavLink>

            {user ? (
              <LogOutBtn />
            ) : (
              <NavLink 
                to="/login" 
                className="flex items-center hover:text-blue-400 btn btn-primary"
                style={({ isActive }) => isActive ? activeStyle : undefined}
              >
                <FaSignInAlt className="mr-2" /> Login
              </NavLink>
            )}

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
              <NavLink 
                to="/" 
                className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md"
                style={({ isActive }) => isActive ? activeStyle : undefined}
                onClick={toggleMenu}
              >
                <FaHome className="mr-2" /> Home
              </NavLink>
              <NavLink 
                to="/about" 
                className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md"
                style={({ isActive }) => isActive ? activeStyle : undefined}
                onClick={toggleMenu}
              >
                <FaInfoCircle className="mr-2" /> About
              </NavLink>
              <NavLink 
                to="/properties" 
                className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md"
                style={({ isActive }) => isActive ? activeStyle : undefined}
                onClick={toggleMenu}
              >
                <FaBuilding className="mr-2" /> All Properties
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className="flex items-center hover:text-blue-400 px-3 py-2 rounded-md"
                style={({ isActive }) => isActive ? activeStyle : undefined}
                onClick={toggleMenu}
              >
                <FaChartBar className="mr-2" /> Dashboard
              </NavLink>

              {user ? (
                <div className="px-3 py-2">
                  <LogOutBtn />
                </div>
              ) : (
                <NavLink 
                  to="/login" 
                  className="flex items-center hover:text-blue-400 px-3 py-2 btn btn-primary rounded-md"
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                  onClick={toggleMenu}
                >
                  <FaSignInAlt className="mr-2" /> Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
