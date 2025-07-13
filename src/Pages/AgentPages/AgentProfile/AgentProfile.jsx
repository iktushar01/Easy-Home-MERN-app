import React from "react";
import useAuth from "../../../hooks/useAuth";

const AgentProfile = () => {
  const { user } = useAuth();
  console.log(user)
  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <p>Role: agent</p>
      <img src={user.photoURL} alt="Profile" width={100} />
    </div>
  );
};

export default AgentProfile;
