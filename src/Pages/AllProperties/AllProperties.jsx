import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

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
        {properties.map((property) => {
          const {
            _id,
            image,
            title,
            location,
            agentImage,
            agentName,
            status,
            priceRange,
          } = property;

          return (
            <div
              key={_id}
              className="bg-base-100 shadow-md rounded-box overflow-hidden"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 text-base-content">
                <h3 className="text-xl font-semibold mb-1">{title}</h3>

                <p className="flex items-center gap-1 text-sm mb-2">
                  <FaMapMarkerAlt className="text-primary" />
                  {location}
                </p>

                <div className="flex items-center gap-3 my-3">
                  <img
                    src={agentImage}
                    alt={agentName}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium">{agentName}</p>
                    <p className="text-sm flex items-center gap-1">
                      {status === "verified" ? (
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
                  {priceRange}
                </p>

                <Link to={`/properties/${_id}`}>
                  <button className="btn btn-primary w-full">Details</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProperties;
