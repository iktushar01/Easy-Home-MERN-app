import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const SoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [sold, setSold] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const res = await axiosSecure.get(`/agent-offers/${user.email}`);
        // Filter only bought properties
        const boughtOffers = res.data.filter(offer => offer.status === "bought");
        setSold(boughtOffers);
      } catch (err) {
        console.error("Failed to fetch sold properties:", err);
        toast.error("Failed to load sold properties");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchSoldProperties();
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <div className="p-4 text-center">Loading sold properties...</div>;
  if (sold.length === 0) return <div className="p-4 text-center">No sold properties found</div>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sold.map((offer) => (
        <div key={offer._id} className="card shadow-md p-4 border rounded-lg">
          <img src={offer.propertyImage} alt="Property" className="w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-bold mt-2">{offer.propertyTitle}</h2>
          <p><strong>Location:</strong> {offer.propertyLocation}</p>
          <p><strong>Buyer:</strong> {offer.buyerName}</p>
          <p><strong>Email:</strong> {offer.buyerEmail}</p>
          <p><strong>Sold for:</strong> ${offer.offerAmount}</p>
          <p><strong>Date:</strong> {new Date(offer.buyingDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span className="text-green-600 capitalize font-semibold">{offer.status}</span></p>
        </div>
      ))}
    </div>
  );
};

export default SoldProperties;
