import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReview = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const [reviewRes, userRes] = await Promise.all([
        axiosSecure.get(`/my-reviews/${user.email}`),
        axiosSecure.get(`/users/${user.email}`),
      ]);

      setReviews(reviewRes.data);
      setUserInfo(userRes.data);
    } catch (error) {
      console.error("❌ Error fetching user/reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) fetchData();
  }, [user?.email, authLoading]);

  // ❌ Delete Review
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

  if (loading) return <p className="text-center">Loading your reviews...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Reviews</h2>

      {userInfo && (
        <div className="mb-6 p-4 rounded-lg bg-gray-100">
          <p><strong>Name:</strong> {userInfo.name || "N/A"}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Role:</strong> {userInfo.role || "User"}</p>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t submitted any reviews yet.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <li key={review._id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-2">
                <strong>Property ID:</strong> {review.propertyId}
              </p>
              <p><strong>Review:</strong> {review.review}</p>
              <p><strong>Rating:</strong> {review.rating}⭐</p>
              <p className="text-xs text-gray-400 mt-2">
                <strong>Date:</strong> {new Date(review.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 text-red-600 hover:text-red-800 font-semibold text-sm"
              >
                ❌ Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReview;
