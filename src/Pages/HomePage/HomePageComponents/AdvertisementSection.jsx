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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Featured <span className="text-secondary">Properties</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
        <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
          Discover our exclusive collection of premium properties curated just for you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-200/50 hover:border-primary/20 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Featured
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-bold shadow">
                ${property.minPrice} - ${property.maxPrice}
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold line-clamp-1">{property.title}</h3>
                <div className="flex items-center bg-warning/10 px-2 py-1 rounded-full">
                  <FaStar className="text-warning mr-1 text-sm" />
                  <span className="text-sm font-medium">5.0</span>
                </div>
              </div>

              <p className="flex items-center gap-2 text-base-content/70 mb-4 text-sm">
                <FaMapMarkerAlt className="text-primary" />
                <span className="line-clamp-1">{property.location}</span>
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-base-200/50">
                <div className="avatar">
                  <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1">
                    <img src={property.agentImage} alt={property.agentName} />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">{property.agentName}</p>
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

              <Link to={`/properties/${property._id}`}>
                <button className="btn btn-primary btn-block mt-5 hover:btn-secondary transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link to="properties">
          <button className="btn btn-outline btn-primary px-10 hover:btn-primary transition-all">
            Browse All Properties
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdvertisementSection;