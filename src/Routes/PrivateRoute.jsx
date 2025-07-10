import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router";

const PrivateRoute = ({children}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);

  if (loading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  if(!user){
    return <Navigate state={{from: location.pathname}} to='/login'></Navigate>
  }

  return children;
};

export default PrivateRoute;
