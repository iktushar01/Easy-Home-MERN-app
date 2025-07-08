import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/Logo/buildings.png"; 

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <img 
        src={logoImg} 
        alt="RealTerra Logo" 
        className="h-9 w-9 object-contain" 
      />
      <span className="text-xl font-semibold text-blue-600">RealTerra</span>
    </Link>
  );
};

export default Logo;