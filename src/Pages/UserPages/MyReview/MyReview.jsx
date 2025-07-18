import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaStar, FaTrash, FaUser, FaEnvelope, FaShieldAlt, FaHome } from "react-icons/fa";
import Swal from "sweetalert2";

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
      console.error("Error fetching user/reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) fetchData();
  }, [user?.email, authLoading]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937", // Dark background for modern look
      color: "#fff", // White text
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/reviews/${id}`);
          setReviews((prev) => prev.filter((review) => review._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
            background: "#1f2937",
            color: "#fff",
          });
        } catch (error) {
          console.error("Failed to delete review:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete review.",
            icon: "error",
            background: "#1f2937",
            color: "#fff",
          });
        }
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[300px]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">My Reviews</h1>
        <p className="text-base-content/70 text-sm sm:text-base">
          Manage your submitted property reviews
        </p>
      </div>

      {/* User Profile Card */}
      {userInfo && (
        <div className="bg-base-200 rounded-xl p-4 sm:p-6 mb-6 lg:mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="avatar">
              <div className="w-14 sm:w-16 rounded-full bg-primary text-primary-content">
                {userInfo?.photoURL ? (
                  <img src={userInfo.photoURL} alt={userInfo.name} />
                ) : (
                  <span className="text-xl sm:text-2xl">
                    {userInfo.name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
            </div>
            <div className="text-center sm:text-left w-full">
              <h3 className="text-lg sm:text-xl font-semibold">
                {userInfo.name || "User"}
              </h3>
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <FaEnvelope className="text-primary" />
                  <span className="truncate max-w-[180px] sm:max-w-none">
                    {userInfo.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <FaShieldAlt className="text-primary" />
                  <span className="capitalize">
                    {userInfo.role || "user"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-xl">
          <div className="flex justify-center mb-4">
            <FaHome className="text-3xl sm:text-4xl text-primary/30" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-base-content">
            No reviews yet
          </h3>
          <p className="text-base-content/70 mt-2 text-sm sm:text-base">
            Your reviews will appear here once you submit them
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review) => (
            <div 
              key={review._id} 
              className="bg-base-100 rounded-xl shadow-sm border border-base-200 hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg truncate">
                      {review.propertyTitle || `Property ${review.propertyId}`}
                    </h3>
                    <p className="text-xs sm:text-sm text-base-content/70">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm sm:text-base ${i < review.rating ? 'text-yellow-400' : 'text-base-content/30'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-base-content mt-3 mb-4 line-clamp-3">
                  {review.review}
                </p>

                <div className="flex justify-end pt-3 border-t border-base-200">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error btn-outline gap-1"
                  >
                    <FaTrash className="text-xs sm:text-sm" />
                    <span className="text-xs sm:text-sm">Delete</span>
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

export default MyReview;