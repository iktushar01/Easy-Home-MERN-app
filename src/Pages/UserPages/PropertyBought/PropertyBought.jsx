import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOffers = async () => {
      try {
        const res = await axiosSecure.get(`/offers/${user.email}`);
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

  const handlePay = (offerId) => {
    navigate(`/payment/${offerId}`);
  };

  if (loading)
    return <div className="p-4 text-center">Loading properties...</div>;
  if (offers.length === 0)
    return <div className="p-4 text-center">No properties found</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {offers.map((offer) => (
        <div key={offer._id} className="card shadow-md p-4 border rounded-lg">
          <img
            src={offer.propertyImg}
            alt="Property"
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-xl font-bold mt-2">{offer.propertyTitle}</h2>
          <p>
            <strong>Location:</strong> {offer.propertyLocation}
          </p>
          <p>
            <strong>Offered:</strong> ${offer.offerAmount}
          </p>
          <p>
            <strong>Buying Date:</strong> {offer.buyingDate}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`capitalize font-semibold ${
                offer.status === "bought"
                  ? "text-blue-600"
                  : offer.status === "accepted"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {offer.status}
            </span>
          </p>

          {offer.status === "accepted" ? (
            <button
              onClick={() => navigate(`/dashboard/user/payment/${offer._id}`)}
              className="btn btn-primary mt-2"
            >
              Pay
            </button>
          ) : offer.status === "bought" ? (
            <p className="mt-2 text-green-600 font-semibold">
              ✅ Transaction ID: {offer.transactionId}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default PropertyBought;
