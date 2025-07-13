import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
  FaEnvelope,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const AllPropertiesDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleAddToWishlist = async () => {
  try {
    const res = await axiosSecure.post("/wishlist", {
      email: user?.email,
      propertyId: id,
      
    });
    toast.success(res.data.message || "Added to wishlist!");
  } catch (error) {
    toast.error("Failed to add to wishlist");
    console.error(error);
  }
};


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

  const {
    image,
    title,
    description,
    location,
    priceRange,
    agentName,
    agentEmail,
  } = property;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg dark:shadow-gray-700 transition-colors duration-300">
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

      {/* Wishlist and Review Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
       <button
  onClick={handleAddToWishlist}
  className="btn btn-outline btn-primary flex items-center gap-2"
>
  <FaHeart className="text-error" />
  Add to Wishlist
</button>


        <button className="btn btn-outline btn-accent flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          Write a Review
        </button>
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
          <p
            
            className="text-primary hover:text-secondary transition-colors"
          >
            {agentEmail}
          </p>
        </p>
      </div>
    </div>
  );
};

export default AllPropertiesDetails;
