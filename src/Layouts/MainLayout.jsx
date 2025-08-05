import React from "react";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../Componens/Buttons/LoadingSpinner";
import ScrollToTop from "../Shared/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      <Toaster />
      <ScrollToTop />
      {isLoading && <LoadingSpinner />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
