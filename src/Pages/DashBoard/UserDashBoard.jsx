import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      {/* Sidebar */}
      <div className="w-1/3 bg-base-100 p-4 border-r border-base-300">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "text-base-content"
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="wishlist"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "text-base-content"
            }
          >
            Wishlist
          </NavLink>
          <NavLink
            to="bought"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "text-base-content"
            }
          >
            Property Bought
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "text-base-content"
            }
          >
            My Reviews
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 bg-base-100">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
