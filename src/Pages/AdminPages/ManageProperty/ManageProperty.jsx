import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import axios from "axios";

const ManageProperty = () => {
  const [properties, setProperties] = useState([]);
  const axiosSecure = useAxiosSecure();


  useEffect(() => {
    axiosSecure.get("/properties")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/properties/${id}/status`, { status });
      // Update UI locally
      setProperties((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status } : p
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Properties</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Agent Name</th>
              <th className="p-2 border">Agent Email</th>
              <th className="p-2 border">Price Range</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="border-b">
                <td className="p-2 border">{property.title}</td>
                <td className="p-2 border">{property.location}</td>
                <td className="p-2 border">{property.agentName}</td>
                <td className="p-2 border">{property.agentEmail}</td>
                <td className="p-2 border">{property.priceRange}</td>
                <td className="p-2 border">
                  {property.status === "verified" ? (
                    <span className="text-green-600 font-semibold">Verified</span>
                  ) : property.status === "rejected" ? (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => updateStatus(property._id, "verified")}
                      >
                        Verify
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => updateStatus(property._id, "rejected")}
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
                <td colSpan="6" className="text-center p-4">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperty;
