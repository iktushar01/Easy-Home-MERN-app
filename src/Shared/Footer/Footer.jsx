import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-6 py-8 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <Logo />
          <p className="text-sm mt-2">
            Your trusted platform for buying, selling, and managing real estate properties online.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/properties" className="link link-hover">Browse Properties</Link></li>
            <li><Link to="/about" className="link link-hover">About</Link></li>
            <li><Link to="/dashboard" className="link link-hover">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@easyhome.com</p>
          <p className="text-sm">Phone: +880-123-456789</p>
          <div className="flex gap-4 mt-3 text-xl">
            <a
              href="https://youtube.com/iktushar01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com/iktushar01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/iktushar01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-8 border-t pt-4 border-base-300 text-base-content/60">
        &copy; {new Date().getFullYear()} EstateHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
