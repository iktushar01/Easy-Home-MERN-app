import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Componens/Buttons/LoadingSpinner';

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axiosSecure.get(`/agent-offers/${user.email}`);
        setOffers(res.data);
      } catch (err) {
        console.error("Failed to fetch offers:", err);
        toast.error("Failed to load requested properties");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchOffers();
    }
  }, [user?.email, axiosSecure]);

  const handleAccept = async (offerId) => {
    try {
      const res = await axiosSecure.patch(`/offers/accept/${offerId}`);
      if (res.data.modifiedCount > 0 || res.data.message === "Offer accepted successfully") {
        toast.success("Offer accepted!");
        setOffers((prev) =>
          prev.map((offer) =>
            offer._id === offerId ? { ...offer, status: "accepted" } : offer
          )
        );
      }
    } catch (err) {
      console.error("Failed to accept offer:", err);
      toast.error("Could not accept offer");
    }
  };

  const handleReject = async (offerId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to reject this offer?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, reject it!'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/offers/reject/${offerId}`);
      if (res.data.modifiedCount > 0 || res.data.message === "Offer rejected successfully") {
        toast.success("Offer rejected!");
        setOffers((prev) =>
          prev.map((offer) =>
            offer._id === offerId ? { ...offer, status: "rejected" } : offer
          )
        );
      }
    } catch (err) {
      console.error("Failed to reject offer:", err);
      toast.error("Could not reject offer");
    }
  };

  if (loading) return (
    <LoadingSpinner/>
  );

  if (offers.length === 0) return (
    <div className="text-center py-8 md:py-12 px-4">
      <div className="text-5xl mb-4">🏡</div>
      <h3 className="text-xl font-medium text-gray-600">No offers found</h3>
      <p className="text-gray-500">You don't have any property requests yet</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">Property Requests</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
            <figure className="relative aspect-video">
              <img 
                src={offer.propertyImage} 
                alt="Property" 
                className="w-full h-full object-cover" 
              />
            </figure>
            <div className="card-body p-4 sm:p-6">
              <h2 className="card-title text-base sm:text-lg line-clamp-1">{offer.propertyTitle}</h2>
              
              <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="line-clamp-1">{offer.propertyLocation}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="line-clamp-1">{offer.buyerName}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <span className="text-xs sm:text-sm line-clamp-1">{offer.buyerEmail}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="font-bold">${offer.offerAmount}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>{new Date(offer.buyingDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4">
                <div className={`badge ${offer.status === 'pending' ? 'badge-warning' : 
                                 offer.status === 'accepted' ? 'badge-success' : 
                                 'badge-error'} gap-2 text-xs sm:text-sm`}>
                  {offer.status}
                </div>
              </div>
              
              {offer.status === "pending" && (
                <div className="card-actions justify-end mt-3 sm:mt-4">
                  <button
                    onClick={() => handleAccept(offer._id)}
                    className="btn btn-success btn-xs sm:btn-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(offer._id)}
                    className="btn btn-error btn-xs sm:btn-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestedProperties;