import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

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
    const confirm = window.confirm("Are you sure you want to reject this offer?");
    if (!confirm) return;

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

  if (loading) return <div className="p-4 text-center">Loading requested properties...</div>;
  if (offers.length === 0) return <div className="p-4 text-center">No offers found</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {offers.map((offer) => (
        <div key={offer._id} className="card shadow-md p-4 border rounded-lg">
          <img src={offer.propertyImage} alt="Property" className="w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-bold mt-2">{offer.propertyTitle}</h2>
          <p><strong>Location:</strong> {offer.propertyLocation}</p>
          <p><strong>Buyer:</strong> {offer.buyerName}</p>
          <p><strong>Email:</strong> {offer.buyerEmail}</p>
          <p><strong>Offered:</strong> ${offer.offerAmount}</p>
          <p><strong>Date:</strong> {offer.buyingDate}</p>
          <p><strong>Status:</strong> <span className="capitalize">{offer.status}</span></p>
          {offer.status === "pending" && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleAccept(offer._id)}
                className="btn btn-success"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(offer._id)}
                className="btn btn-error"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RequestedProperties;
