import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import Swal from "sweetalert2"; // ✅ import SweetAlert2
import useAuth from "../../hooks/useAuth";

const LogOutBtn = () => {
  const { logOutUser } = useAuth();

  const handleSignOut = () => {
    Swal.fire({
      title: "Do you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      buttonsStyling: false,
      customClass: {
        confirmButton: "mx-2 px-4 py-2 bg-blue-500 text-white rounded-lg",
        cancelButton: "mx-2 px-4 py-2 bg-gray-300 text-black rounded-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser().catch((error) => console.error("Logout failed:", error));
      }
    });
  };

  return (
    <div onClick={handleSignOut}>
      <button className="flex items-center hover:text-blue-400 btn btn-warning">
        <FaSignInAlt className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default LogOutBtn;
