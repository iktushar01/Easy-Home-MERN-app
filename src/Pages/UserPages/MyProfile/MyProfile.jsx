import React from "react";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  return <div>
        <h2>Welcome, {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="Profile" width={100} />
  </div>;
};

export default MyProfile;
