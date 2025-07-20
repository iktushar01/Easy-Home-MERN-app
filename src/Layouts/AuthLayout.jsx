import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import ScrollToTop from "../Shared/ScrollToTop/ScrollToTop";

const AuthLayout = () => {
  return (
    <div>
      <Toaster />
       <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
