import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 p-4 border-r">
                <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
                <nav className="flex flex-col space-y-4">
                    <NavLink to="profile" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        Admin Profile
                    </NavLink>
                    <NavLink to="manage-properties" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        Manage Properties
                    </NavLink>
                    <NavLink to="manage-users" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        Manage Users
                    </NavLink>
                    <NavLink to="manage-reviews" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        Manage Reviews
                    </NavLink>
                </nav>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
