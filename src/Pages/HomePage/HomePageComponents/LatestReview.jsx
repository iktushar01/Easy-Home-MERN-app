import React, { useEffect, useState } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const LatestReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const res = await axiosSecure.get('/reviews');
        setReviews(res.data);
      } catch (error) {
        console.error('Failed to fetch latest reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="text-center py-16 bg-base-200 rounded-xl max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <FaStar className="text-4xl text-primary/30" />
        </div>
        <h3 className="text-xl font-medium text-base-content">No reviews yet</h3>
        <p className="text-base-content/70 mt-2">
          Customer reviews will appear here once submitted
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
         <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Customers <span className="text-secondary">Reviews</span>
        </h2>
       <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((review) => (
          <div 
            key={review._id} 
            className="bg-base-100 rounded-box shadow-md hover:shadow-lg transition-shadow duration-300 border border-base-200"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="avatar">
                  <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img 
                      src={review.photoURL || 'https://i.postimg.cc/DwdLBBwZ/Pngtree-user-profile-avatar-13369988.png'} 
                      alt={review.reviewerName} 
                      className="bg-base-200"
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-base-content">{review.reviewerName}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${i < review.rating ? 'text-warning' : 'text-base-content/30'}`}
                      />
                    ))}
                    <span className="text-sm text-base-content/70 ml-1">({review.rating}.0)</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-6 mb-4">
                <FaQuoteLeft className="absolute left-0 top-0 text-primary/20 text-2xl" />
                <p className="text-base-content/80">
                  {review.review}
                </p>
              </div>

              <div className="border-t border-base-200 pt-4">
                <h4 className="font-medium text-primary">{review.propertyTitle}</h4>
                <p className="text-sm text-base-content/60 mt-1">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReview;