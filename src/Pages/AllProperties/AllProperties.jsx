import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axiosSecure.get("/properties")
      .then(res => {
        setProperties(res.data);
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{property.title}</h3>
              <p className="text-gray-600 mb-1">📍 {property.location}</p>
              <div className="flex items-center gap-3 my-2">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <p className="font-medium">{property.agentName}</p>
                  <p className="text-sm text-gray-500">
                    {property.verificationStatus === "verified" ? "✅ Verified" : "❌ Not Verified"}
                  </p>
                </div>
              </div>
              <p className="font-semibold mb-3">💰 {property.priceRange}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
