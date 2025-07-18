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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-error max-w-md mx-auto mt-20 shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  if (!property)
    return (
      <div className="alert alert-warning max-w-md mx-auto mt-20 shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Property not found.</span>
        </div>
      </div>
    );

  const {
    image,
    title,
    description,
    location,
    minPrice,
    maxPrice,
    agentName,
    agentEmail,
  } = property;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Property Header */}
      <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="relative h-80 md:h-96 w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            Featured Property
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">{title}</h2>
          <div className="flex items-center gap-2 text-lg mb-4">
            <FaMapMarkerAlt className="text-secondary" />
            <span className="text-base-content/80">{location}</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-3xl font-bold text-primary">৳{minPrice}</span>
              {maxPrice && <span className="text-lg text-base-content/70"> - ৳{maxPrice}</span>}
            </div>
            <button
              onClick={handleAddToWishlist}
              className="btn btn-error btn-outline hover:btn-error gap-2"
            >
              <FaHeart />
              Add to Wishlist
            </button>
          </div>

          <p className="text-base-content/80 mb-6 leading-relaxed text-lg">{description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-base-100 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-secondary">Customer Reviews</h3>
          <button 
            onClick={() => setIsReviewModalOpen(true)}
            className="btn btn-primary gap-2"
          >
            <FaStar />
            Write a Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-base-content/70 text-lg mb-4">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-base-200 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{review.email}</h4>
                    <div className="text-sm text-base-content/70">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-base-content/30'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-base-content">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agent Info */}
      <div className="bg-base-100 rounded-2xl shadow-xl p-6 md:p-8">
        <h3 className="text-2xl font-bold text-secondary mb-4">Agent Information</h3>
        <div className="flex items-center gap-6">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={property.agentImage || "https://i.ibb.co/5GzXkwq/user.png"} alt={agentName} />
            </div>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-3 text-lg">
              <FaUser className="text-primary" />
              <span className="font-medium">Name:</span> {agentName}
            </p>
            <p className="flex items-center gap-3 text-lg">
              <FaEnvelope className="text-primary" />
              <span className="font-medium">Email:</span>
              <a href={`mailto:${agentEmail}`} className="text-primary hover:text-secondary transition-colors">
                {agentEmail}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Write Your Review</h3>
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="btn btn-ghost btn-circle"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block mb-3 font-medium text-lg">Rating</label>
              <div className="rating rating-lg">
                {[5, 4, 3, 2, 1].map((value) => (
                  <input
                    key={value}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block mb-3 font-medium text-lg">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="textarea textarea-bordered w-full h-40 text-lg"
                placeholder="Share your experience with this property..."
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="btn btn-ghost px-6"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitReview}
                className="btn btn-primary px-6"
                disabled={!reviewText.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPropertiesDetails;