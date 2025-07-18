import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const ManageProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosSecure.get("/properties");
        setProperties(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [axiosSecure]);

  const updateStatus = async (id, status) => {
    const action = status === "verified" ? "verify" : "reject";
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${action} this property?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: `Yes, ${action} it!`
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/properties/${id}/status`, { status });
      setProperties(prev => prev.map(p => p._id === id ? { ...p, status } : p));
      toast.success(`Property ${action}ed successfully!`);
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error(`Failed to ${action} property`);
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
        <h2 className="text-2xl font-bold text-primary">Manage Properties</h2>
        <div className="badge badge-lg badge-primary">
          {properties.length} {properties.length === 1 ? 'Property' : 'Properties'}
        </div>
      </div>

      <div className="bg-base-100 rounded-box shadow">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="bg-base-200">
                <th className="text-base">Title</th>
                <th className="text-base">Location</th>
                <th className="text-base">Agent</th>
                <th className="text-base">Price Range</th>
                <th className="text-base">Status</th>
                <th className="text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-base-300">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={property.image} alt={property.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{property.title}</div>
                        <div className="text-sm opacity-50">{property.agentEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {property.location}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="mask mask-circle w-8 h-8">
                          <img src={property.agentImage} alt={property.agentName} />
                        </div>
                      </div>
                      {property.agentName}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      ${property.minPrice} - ${property.maxPrice}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${property.status === "verified" ? "badge-success" : property.status === "rejected" ? "badge-error" : "badge-warning"}`}>
                      {property.status || "pending"}
                    </span>
                  </td>
                  <td>
                    {property.status === "verified" ? (
                      <button className="btn btn-sm btn-disabled">Verified</button>
                    ) : property.status === "rejected" ? (
                      <button className="btn btn-sm btn-disabled">Rejected</button>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => updateStatus(property._id, "verified")}
                          className="btn btn-sm btn-success"
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => updateStatus(property._id, "rejected")}
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-medium">No properties found</p>
                      <p className="text-sm text-gray-500">Add new properties to get started</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProperty;