import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaMoneyBillWave, FaUser, FaEnvelope } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllPropertiesDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/properties/${id}`)
      .then((res) => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details.");
        setLoading(false);
      });
  }, [axiosSecure, id]);

  if (loading)
    return (
      <div className="text-center py-20 text-base-content/70 dark:text-base-content/50">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-error font-semibold">{error}</div>
    );
  if (!property)
    return (
      <div className="text-center py-20 text-warning font-semibold">
        Property not found.
      </div>
    );

  const { image, title, description, location, priceRange, agentName, agentEmail } =
    property;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      {/* Image */}
      <div className="rounded-lg overflow-hidden shadow-md mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-72 md:h-96 object-cover"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-primary mb-4">{title}</h2>

      {/* Description */}
      <p className="text-base-content/80 mb-6 leading-relaxed">{description}</p>

      {/* Details */}
      <div className="space-y-4 mb-6">
        <p className="flex items-center gap-3 text-secondary font-semibold">
          <FaMapMarkerAlt className="text-primary" />
          Location: <span className="font-normal text-base-content ml-1">{location}</span>
        </p>

        <p className="flex items-center gap-3 text-secondary font-semibold">
          <FaMoneyBillWave className="text-primary" />
          Price:{" "}
          <span className="font-bold text-primary text-lg ml-1">৳{priceRange}</span>
        </p>
      </div>

      {/* Agent Info */}
      <div className="border-t border-base-content/20 pt-4">
        <h3 className="text-xl font-semibold text-secondary mb-3">Agent Info</h3>

        <p className="flex items-center gap-3 mb-2">
          <FaUser className="text-primary" />
          <span className="font-medium">Name:</span> {agentName}
        </p>

        <p className="flex items-center gap-3">
          <FaEnvelope className="text-primary" />
          <span className="font-medium">Email:</span>{" "}
          <a
            href={`mailto:${agentEmail}`}
            className="text-primary underline hover:text-secondary transition-colors"
          >
            {agentEmail}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AllPropertiesDetails;
