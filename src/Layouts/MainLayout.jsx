import React from "react";
import Navbar from "../Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
