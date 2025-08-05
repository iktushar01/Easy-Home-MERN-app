import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaHome, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaCheckCircle, FaClock, FaCreditCard } from "react-icons/fa";
import LoadingSpinner from "../../../Componens/Buttons/LoadingSpinner";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOffers = async () => {
      try {
        const res = await axiosSecure.get(`/offers/by-email/${user.email}`);
        setOffers(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch offers:", error);
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserOffers();
    }
  }, [user?.email, axiosSecure]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      bought: {
        color: "bg-success text-success-content",
        icon: <FaCheckCircle className="mr-1" />,
        text: "Purchased"
      },
      accepted: {
        color: "bg-info text-info-content",
        icon: <FaClock className="mr-1" />,
        text: "Accepted"
      },
      pending: {
        color: "bg-warning text-warning-content",
        icon: <FaClock className="mr-1" />,
        text: "Pending"
      },
      rejected: {
        color: "bg-error text-error-content",
        icon: <FaClock className="mr-1" />,
        text: "Rejected"
      }
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status]?.color || 'bg-base-200 text-base-content'}`}>
        {statusConfig[status]?.icon}
        {statusConfig[status]?.text || status}
      </span>
    );
  };

  if (loading) return (
    <LoadingSpinner/>
  );

  if (offers.length === 0) return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-4">
        <FaHome className="text-3xl text-base-content/50" />
      </div>
      <h3 className="text-xl font-medium text-base-content">No properties found</h3>
      <p className="text-base-content/70 mt-2">You haven't made any offers yet</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-base-content">Your Property Offers</h1>
        <p className="text-base-content/70 mt-2">View the status of your property offers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="bg-base-100 rounded-xl shadow-md overflow-hidden border border-base-200 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src={offer.propertyImg}
                alt="Property"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4">
                {getStatusBadge(offer.status)}
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold text-base-content mb-2 line-clamp-1">
                {offer.propertyTitle}
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-base-content/80">
                  <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                  <span className="line-clamp-1">{offer.propertyLocation}</span>
                </div>

                <div className="flex items-center gap-3 text-base-content/80">
                  <FaMoneyBillWave className="text-primary flex-shrink-0" />
                  <span>${offer.offerAmount.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-3 text-base-content/80">
                  <FaCalendarAlt className="text-primary flex-shrink-0" />
                  <span>{offer.buyingDate}</span>
                </div>
              </div>

              {offer.status === "accepted" && (
                <button
                  onClick={() => navigate(`/dashboard/user/payment/${offer._id}`)}
                  className="btn btn-primary w-full mt-4 gap-2"
                >
                  <FaCreditCard />
                  Complete Payment
                </button>
              )}

              {offer.status === "bought" && (
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <p className="text-success flex items-center gap-2">
                    <FaCheckCircle />
                    Purchase Complete
                  </p>
                  {offer.transactionId && (
                    <p className="text-sm text-success mt-1">
                      Transaction ID: {offer.transactionId}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;