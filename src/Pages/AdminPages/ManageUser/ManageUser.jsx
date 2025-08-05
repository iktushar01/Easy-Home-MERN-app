import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const showConfirmation = async (title, text, confirmText) => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: confirmText || 'Confirm',
    });
    return result.isConfirmed;
  };

  const updateRole = async (id, newRole) => {
    const confirmed = await showConfirmation(
      "Change User Role",
      `Are you sure you want to make this user ${newRole}?`,
      `Make ${newRole}`
    );
    if (!confirmed) return;

    try {
      await toast.promise(
        axiosSecure.patch(`/users/${id}/role`, { role: newRole }),
        {
          loading: 'Updating role...',
          success: `Role updated to ${newRole}`,
          error: 'Failed to update role'
        }
      );
      setUsers(prev => prev.map(user => 
        user._id === id ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      console.error("Error updating role", err);
    }
  };

  const markAsFraud = async (id) => {
    const confirmed = await showConfirmation(
      "Mark as Fraud",
      "This will revoke agent privileges and remove all their properties. Continue?",
      "Mark as Fraud"
    );
    if (!confirmed) return;

    try {
      await toast.promise(
        Promise.all([
          axiosSecure.patch(`/users/${id}/fraud`),
          axiosSecure.delete(`/properties/agent/${id}`)
        ]),
        {
          loading: 'Marking as fraud...',
          success: 'User marked as fraud',
          error: 'Failed to mark as fraud'
        }
      );
      setUsers(prev => prev.map(user => 
        user._id === id ? { ...user, role: "fraud" } : user
      ));
    } catch (err) {
      console.error("Failed to mark as fraud", err);
    }
  };

  const deleteUser = async (id) => {
    const confirmed = await showConfirmation(
      "Delete User",
      "This will permanently delete the user account. Continue?",
      "Delete User"
    );
    if (!confirmed) return;

    try {
      await toast.promise(
        axiosSecure.delete(`/users/${id}`),
        {
          loading: 'Deleting user...',
          success: 'User deleted successfully',
          error: 'Failed to delete user'
        }
      );
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Users</h2>
        <div className="badge badge-lg badge-primary">
          {users.length} {users.length === 1 ? 'User' : 'Users'}
        </div>
      </div>

      <div className="bg-base-100 rounded-box shadow overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-base-200">
              <th className="text-base">User</th>
              <th className="text-base">Email</th>
              <th className="text-base">Role</th>
              <th className="text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-base-300">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-10 h-10">
                        <img 
                          src={user.photoURL || '/default-avatar.png'} 
                          alt={user.name} 
                          onError={(e) => {
                            e.target.src = '/default-avatar.png';
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name || "N/A"}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${
                    user.role === 'admin' ? 'badge-primary' :
                    user.role === 'agent' ? 'badge-secondary' :
                    user.role === 'fraud' ? 'badge-error' : 'badge-neutral'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {user.role === "fraud" ? (
                      <button className="btn btn-disabled btn-xs sm:btn-sm">
                        Fraud Account
                      </button>
                    ) : (
                      <>
                        {user.role !== "admin" && (
                          <button
                            className="btn btn-primary btn-xs sm:btn-sm"
                            onClick={() => updateRole(user._id, "admin")}
                          >
                            Make Admin
                          </button>
                        )}
                        {user.role !== "agent" && (
                          <button
                            className="btn btn-secondary btn-xs sm:btn-sm"
                            onClick={() => updateRole(user._id, "agent")}
                          >
                            Make Agent
                          </button>
                        )}
                        {user.role === "agent" && (
                          <button
                            className="btn btn-warning btn-xs sm:btn-sm"
                            onClick={() => markAsFraud(user._id)}
                          >
                            Mark Fraud
                          </button>
                        )}
                      </>
                    )}
                    <button
                      className="btn btn-error btn-xs sm:btn-sm"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center p-8">
            <div className="flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-lg font-medium">No users found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;