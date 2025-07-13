import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/properties")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      });
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        All Properties
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-base-100 shadow-md rounded-box overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 text-base-content">
              <h3 className="text-xl font-semibold mb-1">{property.title}</h3>

              <p className="flex items-center gap-1 text-sm mb-2">
                <FaMapMarkerAlt className="text-primary" />
                {property.location}
              </p>

              <div className="flex items-center gap-3 my-3">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <p className="font-medium">{property.agentName}</p>
                  <p className="text-sm flex items-center gap-1">
                    {property.verificationStatus === "verified" ? (
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

              <p className="flex items-center gap-1 font-semibold mb-3">
                <FaMoneyBillWave className="text-primary" />
                {property.priceRange}
              </p>

              <button className="btn btn-primary w-full">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
