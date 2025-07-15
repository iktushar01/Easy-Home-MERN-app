import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get("/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((review) => review._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete review:", error);
      alert("Failed to delete review.");
    }
  };

  if (loading) return <p className="text-center">Loading all reviews...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage All Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-600">No reviews found.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review._id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.reviewerImage || "https://i.ibb.co/2NwWf8b/user.png"}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">
                    {review.name || "Anonymous"}
                  </h3>
                  <p className="text-sm text-gray-500">{review.email}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                <strong>Property ID:</strong> {review.propertyId}
              </p>
              <p className="mb-2">
                <strong>Rating:</strong> {review.rating}⭐
              </p>
              <p className="mb-4">{review.review}</p>

              <p className="text-xs text-gray-400 mt-2">
                <strong>Date:</strong>{" "}
                {new Date(review.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageReviews;
