import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 sm:mb-3 md:mb-4">
          Featured Properties
        </h2>
        <div className="divider w-16 mx-auto h-0.5 bg-primary opacity-20 mb-3 sm:mb-4"></div>
        <p className="text-base sm:text-lg md:text-xl text-base-content/70 max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">
          Discover our handpicked selection of premium properties
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-base-100 text-base-content rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-base-200"
          >
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-lg text-xs font-bold">
                Featured
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{property.title}</h3>
                <div className="flex items-center text-warning">
                  <FaStar className="mr-1" />
                  <span>5.0</span>
                </div>
              </div>

              <p className="flex items-center gap-2 text-base-content/70 mb-3">
                <FaMapMarkerAlt className="text-primary" />
                {property.location}
              </p>

              <div className="flex justify-between items-center mb-4">
                <p className="flex items-center gap-2 font-bold">
                  <FaMoneyBillWave className="text-primary" />$
                  {property.minPrice} - ${property.maxPrice}
                </p>
                <span className="badge badge-ghost">
                  {property.propertyType}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-base-200">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-medium">{property.agentName}</p>
                  <p className="text-sm flex items-center gap-1">
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

              <Link to={`/properties/${property._id}`}>
                <button className="btn btn-primary w-full mt-5">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link to="properties">
          <button className="btn btn-primary btn-outline px-8">
            Browse All Properties
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdvertisementSection;
