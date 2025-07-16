import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const defaultAvatar = 'https://i.postimg.cc/Fs0r7YmV/Pngtree-user-profile-avatar-13369988.png';

const LatestReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const res = await axiosSecure.get('/reviews');
        setReviews(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch latest reviews:', error);
        setLoading(false);
      }
    };

    fetchLatestReviews();
  }, [axiosSecure]);

  if (loading) {
    return <div className="text-center py-10">Loading reviews...</div>;
  }

  if (!reviews.length) {
    return <div className="text-center py-10">No reviews yet</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Latest Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.slice(0, 3).map((review) => (
          <div key={review._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={review.photoURL || defaultAvatar}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{review.reviewerName}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{review.review}</p>

              <div className="border-t pt-4">
                <h4 className="font-medium text-indigo-600">{review.propertyTitle}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
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
