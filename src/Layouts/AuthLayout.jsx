import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
                  <Toaster />

            <Outlet/>
        </div>
    );
};

export default AuthLayout;