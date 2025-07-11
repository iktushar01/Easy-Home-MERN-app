import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Shared/Logo/Logo';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const DashBoardLayout = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => {
          const userRole = res.data.role;
          setRole(userRole);

          const currentPath = location.pathname;

          // Navigate only if not already on the correct path
          if (userRole === 'admin' && !currentPath.includes('/dashboard/admin')) {
            navigate('/dashboard/admin');
          } else if (userRole === 'user' && !currentPath.includes('/dashboard/user')) {
            navigate('/dashboard/user');
          }
        })
        .catch(err => {
          console.error('❌ Failed to fetch role:', err);
        });
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading || !role) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div>
      <Logo />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
