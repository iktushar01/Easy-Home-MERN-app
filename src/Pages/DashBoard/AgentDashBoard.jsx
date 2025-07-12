import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AgentDashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 p-4 border-r">
                <h2 className="text-xl font-bold mb-6">Agent Dashboard</h2>
                <nav className="flex flex-col space-y-4">
                    <NavLink to="profile" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        Agent Profile
                    </NavLink>
                    <NavLink to="add-property" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        Add Property
                    </NavLink>
                    <NavLink to="my-properties" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        My Added Properties
                    </NavLink>
                    <NavLink to="sold-properties" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        My Sold Properties
                    </NavLink>
                    <NavLink to="requested-properties" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
                        Requested Properties
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

export default AgentDashboard;
