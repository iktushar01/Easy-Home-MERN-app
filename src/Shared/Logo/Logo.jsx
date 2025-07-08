import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/Logo/buildings.png"; 

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logoImg} alt="RealTerra Logo" className="h-8 w-8 object-contain" />
        <span className="text-2xl font-bold text-blue-400">RealTerra</span>
      </Link>
    </div>
  );
};

export default Logo;
