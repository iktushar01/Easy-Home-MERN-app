import React from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const AuthProvider = ({children}) => {

    const authInfo = {

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;