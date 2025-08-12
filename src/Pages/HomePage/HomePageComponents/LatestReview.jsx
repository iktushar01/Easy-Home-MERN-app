import React, { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LatestReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const res = await axiosSecure.get("/reviews");
        const sortedReviews = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
      } catch (error) {
        console.error("Failed to fetch latest reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="text-center py-16 bg-base-200 rounded-xl max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <FaStar className="text-4xl text-primary" />
        </div>
        <h3 className="text-xl font-medium text-base-content">
          No reviews yet
        </h3>
        <p className="text-base-content/70 mt-2">
          Customer reviews will appear here once submitted
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Customers <span className="text-secondary animate-pulse">Reviews</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Hear what our customers say about their experiences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.slice(0, 3).map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1
            }}
          >
            <div className="bg-base-100 rounded-box shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 h-full flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          review.userPhoto ||
                          "https://i.postimg.cc/DwdLBBwZ/Pngtree-user-profile-avatar-13369988.png"
                        }
                        alt={review.reviewerName}
                        className="bg-base-200 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://i.postimg.cc/DwdLBBwZ/Pngtree-user-profile-avatar-13369988.png";
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-base-content">
                      {review.reviewerName}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-base-content/30"
                          } text-sm`}
                        />
                      ))}
                      <span className="text-sm text-base-content/70 ml-1">
                        ({review.rating}.0)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-6 mb-4">
                  <FaQuoteLeft className="absolute left-0 top-0 text-primary/20 text-2xl" />
                  <p className="text-base-content/80 line-clamp-4 hover:line-clamp-none transition-all">
                    {review.review}
                  </p>
                </div>
              </div>

              <div className="border-t border-base-200 p-4 bg-base-200/30 rounded-b-box">
                <h4 className="font-medium text-primary truncate">
                  {review.propertyTitle}
                </h4>
                <p className="text-sm text-base-content/60 mt-1">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestReview;