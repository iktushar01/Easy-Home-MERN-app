import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className=" pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="mb-6">
            <Logo/>
            <p className=" mb-4">
              Your trusted partner in finding the perfect property. We connect buyers with the best real estate opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className=" transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className=" transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className=" transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className=" transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className=" transition">Home</a></li>
              <li><a href="#" className=" transition">Properties</a></li>
              <li><a href="#" className=" transition">Agents</a></li>
              <li><a href="#" className=" transition">About Us</a></li>
              <li><a href="#" className=" transition">Contact</a></li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Property Types</h4>
            <ul className="space-y-2">
              <li><a href="#" className=" transition">Apartments</a></li>
              <li><a href="#" className=" transition">Villas</a></li>
              <li><a href="#" className=" transition">Commercial</a></li>
              <li><a href="#" className=" transition">Land</a></li>
              <li><a href="#" className=" transition">Luxury Homes</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3" />
                <span className="">123 Real Estate Ave, Property City</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 " />
                <span className="">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 " />
                <span className="">info@dreamhomerealty.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className=" mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DreamHome Realty. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="transition text-sm">Privacy Policy</a>
            <a href="#" className=" transition text-sm">Terms of Service</a>
            <a href="#" className=" transition text-sm">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;