import React, { useEffect, useState } from "react";
// import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();


  // Fetch users from backend
  useEffect(() => {
    axiosSecure.get("/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to fetch users:", err));
  }, []);

  const updateRole = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/${id}`, { role: newRole });
      setUsers(prev =>
        prev.map(user => user._id === id ? { ...user, role: newRole } : user)
      );
    } catch (err) {
      console.error("Error updating role", err);
    }
  };

  const markAsFraud = async (id) => {
    try {
      await axiosSecure.patch(`/users/${id}/fraud`);
      await axiosSecure.delete(`/properties/agent/${id}`); // remove all agent properties
      setUsers(prev =>
        prev.map(user => user._id === id ? { ...user, role: "fraud" } : user)
      );
    } catch (err) {
      console.error("Failed to mark as fraud", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axiosSecure.delete(`/users/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <table className="w-full table-auto border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border">
              <td className="p-2">{user.name || "N/A"}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 flex gap-2 flex-wrap">
                {user.role === "fraud" ? (
                  <span className="text-red-500 font-bold">Fraud</span>
                ) : (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => updateRole(user._id, "admin")}
                    >
                      Make Admin
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => updateRole(user._id, "agent")}
                    >
                      Make Agent
                    </button>
                    {user.role === "agent" && (
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => markAsFraud(user._id)}
                      >
                        Mark as Fraud
                      </button>
                    )}
                  </>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
