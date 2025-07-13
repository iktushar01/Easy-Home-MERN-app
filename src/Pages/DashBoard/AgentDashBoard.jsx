import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AgentDashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/3 bg-base-100 p-4 border-r border-base-300">
                <h2 className="text-xl font-bold mb-6 text-base-content">Agent Dashboard</h2>
                <nav className="flex flex-col space-y-4">
                    <NavLink
                        to="profile"
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : 'text-base-content'
                        }
                    >
                        Agent Profile
                    </NavLink>
                    <NavLink
                        to="add-property"
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : 'text-base-content'
                        }
                    >
                        Add Property
                    </NavLink>
                    <NavLink
                        to="my-properties"
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : 'text-base-content'
                        }
                    >
                        My Added Properties
                    </NavLink>
                    <NavLink
                        to="sold-properties"
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : 'text-base-content'
                        }
                    >
                        My Sold Properties
                    </NavLink>
                    <NavLink
                        to="requested-properties"
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : 'text-base-content'
                        }
                    >
                        Requested Properties
                    </NavLink>
                </nav>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-6 bg-base-200 text-base-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AgentDashboard;
