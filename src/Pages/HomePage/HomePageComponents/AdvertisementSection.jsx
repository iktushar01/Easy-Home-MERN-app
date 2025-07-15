import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/properties")
      .then((res) => {
        setProperties(res.data.slice(0, 4)); // Show only first 4
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      });
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        Featured Properties
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-base-100 text-base-content shadow-md rounded-box overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.title}</h3>

              <p className="flex items-center gap-1 text-sm mt-1">
                <FaMapMarkerAlt className="text-primary" />
                {property.location}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <div>
                  <p className="text-sm">{property.agentName}</p>
                  <p className="text-xs flex items-center gap-1">
                    {property.status === "verified" ? (
                      <>
                        <FaCheckCircle className="text-success" />
                        <span className="text-success">Verified</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="text-error" />
                        <span className="text-error">Not Verified</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <p className="flex items-center gap-1 text-sm font-medium mt-3">
                <FaMoneyBillWave className="text-primary" />
                {property.priceRange}
              </p>

              <Link to={`/properties/${property._id}`}>
                <button className="btn btn-primary w-full">Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div className="text-center mt-10">
        <Link to="properties">
          <button className="btn btn-outline btn-primary">
            See All Properties
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdvertisementSection;
