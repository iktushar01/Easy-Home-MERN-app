import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { FaRegComment, FaRegUserCircle, FaStar } from "react-icons/fa";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosSecure.get("/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setError("Failed to load reviews. Please try again.");
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await toast.promise(
        axiosSecure.delete(`/reviews/${id}`),
        {
          loading: 'Deleting review...',
          success: 'Review deleted successfully',
          error: 'Failed to delete review'
        }
      );
      setReviews((prev) => prev.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${i < rating ? "text-yellow-400" : "text-gray-300"} text-sm`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-4xl mx-auto my-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
        <button className="btn btn-sm btn-ghost ml-4" onClick={fetchReviews}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary">Manage Reviews</h2>
          <p className="text-sm opacity-70 mt-1">View and manage all property reviews</p>
        </div>
        <div className="badge badge-lg badge-primary">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center py-12">
            <div className="flex flex-col items-center justify-center gap-3">
              <FaRegComment className="text-4xl text-gray-400" />
              <h3 className="text-lg font-medium">No reviews found</h3>
              <p className="text-sm text-gray-500">There are no reviews to display</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center">
                      {review.userPhoto ? (
                        <img 
                          src={review.userPhoto} 
                          alt="Reviewer" 
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.target.src = "";
                            e.target.onerror = null;
                            e.target.parentElement.classList.add("bg-base-200");
                          }}
                        />
                      ) : (
                        <FaRegUserCircle className="text-2xl text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{review.email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-xs opacity-70">({review.rating}/5)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-base-content/90 break-words">
                    {review.review || "No review text provided"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto pt-3 border-t border-base-200">
                  <div className="text-xs opacity-70">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-error btn-sm btn-outline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;