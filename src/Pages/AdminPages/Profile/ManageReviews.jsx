import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get("/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Reviews</h2>
        <div className="badge badge-lg badge-primary">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex flex-col items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-lg font-medium">No reviews found</p>
            <p className="text-sm text-gray-500">There are no reviews to display</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img 
                        src={review.reviewerImage || "https://i.postimg.cc/DwdLBBwZ/Pngtree-user-profile-avatar-13369988.png"} 
                        alt="Reviewer" 
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {review.name || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">{review.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${review._id}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked={i < review.rating}
                        readOnly
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({review.rating}/5)</span>
                </div>

                <p className="mb-4 text-gray-700">{review.review}</p>

                <div className="flex justify-between items-center mt-auto">
                  <div className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-error btn-sm"
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