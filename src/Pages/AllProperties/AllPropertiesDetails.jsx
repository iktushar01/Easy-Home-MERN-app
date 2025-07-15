import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
  FaEnvelope,
  FaHeart,
  FaStar,
  FaTimes,
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
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

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

  const handleSubmitReview = async () => {
    try {
      const res = await axiosSecure.post("/reviews", {
        propertyId: id,
        email: user?.email,
        review: reviewText,
        rating: Number(rating),
      });
      toast.success("Review submitted successfully!");
      setIsReviewModalOpen(false);
      setReviewText("");
      setRating(5);
      // Refresh reviews after submission
      fetchReviews();
    } catch (error) {
      toast.error("Failed to submit review");
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyRes = await axiosSecure.get(`/properties/${id}`);
        setProperty(propertyRes.data);
        await fetchReviews();
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load property details.");
        setLoading(false);
      }
    };

    fetchData();
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

        <button 
          onClick={() => setIsReviewModalOpen(true)}
          className="btn btn-outline btn-accent flex items-center gap-2"
        >
          <FaStar className="text-yellow-500" />
          Write a Review
        </button>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-base-content/20 pt-4 mb-6">
        <h3 className="text-xl font-semibold text-secondary mb-3">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-base-content/70">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-base-content/70">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-base-content">{review.review}</p>
                <p className="text-sm text-base-content/70 mt-2">
                  - {review.email}
                </p>
              </div>
            ))}
          </div>
        )}
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
          <p className="text-primary hover:text-secondary transition-colors">
            {agentEmail}
          </p>
        </p>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Write a Review</h3>
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="btn btn-ghost btn-sm"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="textarea textarea-bordered w-full h-32"
                placeholder="Share your experience..."
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitReview}
                className="btn btn-primary"
                disabled={!reviewText.trim()}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPropertiesDetails;