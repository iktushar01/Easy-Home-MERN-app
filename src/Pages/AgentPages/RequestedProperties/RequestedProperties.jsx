import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Componens/Buttons/LoadingSpinner';
import { FaMapMarkerAlt, FaUser, FaEnvelope, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      bought: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
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
          <h3 className="text-lg font-medium text-gray-600">No property requests yet</h3>
          <p className="text-gray-500 mt-2">You haven't received any offers on your properties.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Property Requests</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage offers made on your listed properties
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <img
                src={offer.propertyImage || 'https://via.placeholder.com/400x300?text=Property'}
                alt={offer.propertyTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Property';
                }}
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(offer.status)}
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                {offer.propertyTitle}
              </h2>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  <span className="truncate">{offer.propertyLocation}</span>
                </div>

                <div className="flex items-center">
                  <FaUser className="mr-2 text-gray-400" />
                  <span>{offer.buyerName}</span>
                </div>

                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  <span className="truncate">{offer.buyerEmail}</span>
                </div>

                <div className="flex items-center">
                  <FaDollarSign className="mr-2 text-gray-400" />
                  <span className="font-medium">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(offer.offerAmount)}
                  </span>
                </div>

                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
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
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleAccept(offer._id)}
                    className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(offer._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
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