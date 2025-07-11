import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DashBoardBtn = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();


  useEffect(() => {
    if (!user || loading) return;

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(
          `/users/${user.email}`
        );
        setRole(res.data.role);
      } catch (error) {
        console.error("❌ Failed to fetch user role", error);
      }
    };

    fetchRole();
  }, [user, loading]);

  const handleGoToDashboard = () => {
    if (role === "admin") {
      navigate("/dashboard/admin");
    } else if (role === "user") {
      navigate("/dashboard/user");
    } else {
      navigate("/unauthorized");
    }
  };

  if (!user) return null;

  return (
    <div className="text-center my-4">
      <button
        onClick={handleGoToDashboard}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default DashBoardBtn;
