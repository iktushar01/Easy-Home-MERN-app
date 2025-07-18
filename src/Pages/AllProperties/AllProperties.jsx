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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-3">Explore Properties</h2>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => {
          const {
            _id,
            image,
            title,
            location,
            agentImage,
            agentName,
            status,
            minPrice,
            maxPrice,
          } = property;

          return (
            <div
              key={_id}
              className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 badge badge-primary badge-lg">
                  ${minPrice} - ${maxPrice}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="text-sm">{location}</span>
                </div>

                <div className="flex items-center gap-4 my-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={agentImage} alt={agentName} />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{agentName}</p>
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

                <Link to={`/properties/${_id}`}>
                  <button className="btn btn-primary btn-block mt-4 hover:btn-secondary transition-colors">
                    View Details
                  </button>
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