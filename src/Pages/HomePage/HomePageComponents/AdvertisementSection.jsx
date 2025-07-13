import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axiosSecure.get("/properties")
      .then(res => {
        setProperties(res.data.slice(0, 4)); // Only take first 4
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map(property => (
          <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={property.image} alt={property.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-600">📍 {property.location}</p>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <div>
                  <p className="text-sm">{property.agentName}</p>
                  <p className="text-xs text-gray-500">
                    {property.verificationStatus === "verified" ? "✅ Verified" : "❌ Not Verified"}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium mt-2">💰 {property.priceRange}</p>
              <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div className="text-center mt-8">
        <Link to="properties">
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded">
            See All Properties
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdvertisementSection;
