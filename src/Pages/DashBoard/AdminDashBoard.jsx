import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCog,
  FaHome,
  FaUsers,
  FaStar,
  FaUserShield,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-100">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-base-100 border-b border-base-300">
        <h2 className="text-xl font-bold text-base-content">Admin Dashboard</h2>
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-square"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                           md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-base-100 p-4 border-r border-base-300 
                           z-40 transition-transform duration-300 ease-in-out flex-shrink-0 h-full overflow-y-auto`}
      >
        <div className="hidden md:block">
          <h2 className="text-xl font-bold mb-6 text-base-content flex items-center gap-2">
            <FaUserShield className="text-primary" />
            Admin Dashboard
          </h2>
        </div>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-content font-semibold"
                  : "text-base-content hover:bg-base-200"
              }`
            }
          >
            <FaUserCog className="flex-shrink-0" />
            <span>Admin Profile</span>
          </NavLink>

          <NavLink
            to="manage-properties"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-content font-semibold"
                  : "text-base-content hover:bg-base-200"
              }`
            }
          >
            <FaHome className="flex-shrink-0" />
            <span>Manage Properties</span>
          </NavLink>

          <NavLink
            to="manage-users"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-content font-semibold"
                  : "text-base-content hover:bg-base-200"
              }`
            }
          >
            <FaUsers className="flex-shrink-0" />
            <span>Manage Users</span>
          </NavLink>

          <NavLink
            to="manage-reviews"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-content font-semibold"
                  : "text-base-content hover:bg-base-200"
              }`
            }
          >
            <FaStar className="flex-shrink-0" />
            <span>Manage Reviews</span>
          </NavLink>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 bg-base-200 text-base-content min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
