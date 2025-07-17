import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoughtOffers = async () => {
      try {
        const res = await axiosSecure.get(`/offers/${user.email}`);
        const acceptedOffers = res.data.filter(offer => offer.status === "accepted");
        setOffers(acceptedOffers);
      } catch (error) {
        console.error("❌ Failed to fetch bought properties:", error);
        toast.error("Failed to load bought properties");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchBoughtOffers();
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <div className="p-4 text-center">Loading your properties...</div>;
  if (offers.length === 0) return <div className="p-4 text-center">No bought properties found</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {offers.map((offer) => (
        <div key={offer._id} className="card shadow-md p-4 border rounded-lg">
          <img src={offer.propertyImg} alt="Property" className="w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-bold mt-2">{offer.propertyTitle}</h2>
          <p><strong>Location:</strong> {offer.propertyLocation}</p>
          <p><strong>Offered:</strong> ${offer.offerAmount}</p>
          <p><strong>Buying Date:</strong> {offer.buyingDate}</p>
          <p><strong>Status:</strong> <span className="capitalize text-green-600">{offer.status}</span></p>
        </div>
      ))}
    </div>
  );
};

export default PropertyBought;
