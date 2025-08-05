import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/Logo/buildings.png"; 

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center hover:opacity-80 transition-opacity"
    >
      <img 
        src={logoImg} 
        alt="EasyHome  Logo" 
        className="h-10 w-10 object-contain" 
      />
      <span className="text-xl font-semibold text-primary">EasyHome</span>
    </Link>
  );
};

export default Logo;