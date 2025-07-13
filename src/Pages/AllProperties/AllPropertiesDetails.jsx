import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllPropertiesDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/properties/${id}`)
      .then((res) => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching property details:", err);
        setLoading(false);
      });
  }, [axiosSecure, id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!property) return <div className="text-center py-10">Property not found.</div>;

  const { image, title, description, location, priceRange } = property;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="mt-3 text-primary font-semibold">Location: {location}</p>
      <p className="text-primary font-semibold">Price: {priceRange}</p>
    </div>
  );
};

export default AllPropertiesDetails;
