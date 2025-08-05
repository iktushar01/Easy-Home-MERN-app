import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Componens/Buttons/LoadingSpinner';
import { FaMapMarkerAlt, FaUser, FaEnvelope, FaDollarSign, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosSecure.get(`/offers`);
        if (res.data) {
          setOffers(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch offers:", err);
        setError("Failed to load requested properties. Please try again later.");
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
      const { data } = await axiosSecure.patch(`/offers/accept/${offerId}`);
      if (data.modifiedCount > 0 || data.message === "Offer accepted successfully") {
        toast.success("Offer accepted!");
        setOffers(prev =>
          prev.map(offer =>
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
      title: 'Reject Offer?',
      text: "Are you sure you want to reject this offer? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reject it',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axiosSecure.patch(`/offers/reject/${offerId}`);
      if (data.modifiedCount > 0 || data.message === "Offer rejected successfully") {
        toast.success("Offer rejected!");
        setOffers(prev =>
          prev.map(offer =>
            offer._id === offerId ? { ...offer, status: "rejected" } : offer
          )
        );
      }
    } catch (err) {
      console.error("Failed to reject offer:", err);
      toast.error("Could not reject offer");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { 
        class: 'bg-amber-100 text-amber-800',
        icon: null
      },
      accepted: { 
        class: 'bg-green-100 text-green-800',
        icon: <FaCheck className="mr-1" />
      },
      rejected: { 
        class: 'bg-red-100 text-red-800',
        icon: <FaTimes className="mr-1" />
      },
      bought: { 
        class: 'bg-blue-100 text-blue-800',
        icon: null
      }
    };
    
    const config = statusConfig[status] || { class: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="alert alert-error bg-red-50 text-red-800 shadow-lg">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-2">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 text-gray-300">🏡</div>
          <h3 className="text-xl font-medium text-gray-700">No property requests yet</h3>
          <p className="text-gray-500 mt-2">You haven't received any offers on your properties.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Property Requests</h1>
        <p className="mt-2 text-gray-100">
          Manage offers made on your listed properties
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="relative h-48">
              <img
                src={offer.propertyImg || 'https://via.placeholder.com/400x300?text=Property'}
                alt={offer.propertyTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Property';
                }}
              />
              <div className="absolute top-3 right-3">
                {getStatusBadge(offer.status)}
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                {offer.propertyTitle}
              </h2>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{offer.propertyLocation}</span>
                </div>

                <div className="flex items-start gap-3">
                  <FaUser className="mt-1 flex-shrink-0 text-gray-400" />
                  <span>{offer.buyerName}</span>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{offer.buyerEmail}</span>
                </div>

                <div className="flex items-start gap-3">
                  <FaDollarSign className="mt-1 flex-shrink-0 text-gray-400" />
                  <span className="font-medium text-gray-800">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(offer.offerAmount)}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="mt-1 flex-shrink-0 text-gray-400" />
                  <span>
                    {new Date(offer.buyingDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {offer.status === "pending" && (
                <div className="flex justify-end space-x-3 mt-5">
                  <button
                    onClick={() => handleAccept(offer._id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(offer._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
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