import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { FaDollarSign, FaHome, FaChartLine, FaMoneyBillWave, FaCalendarAlt, FaUser, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import LoadingSpinner from '../../../Componens/Buttons/LoadingSpinner';

const SoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [sold, setSold] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAmount: 0,
    averagePrice: 0,
    totalProperties: 0,
    highestSale: 0
  });

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const res = await axiosSecure.get(`/agent-offers/${user.email}`);
        const boughtOffers = res.data.filter(offer => offer.status === "bought");
        setSold(boughtOffers);
        
        if (boughtOffers.length > 0) {
          const total = boughtOffers.reduce((sum, offer) => sum + offer.offerAmount, 0);
          const average = total / boughtOffers.length;
          const highest = Math.max(...boughtOffers.map(offer => offer.offerAmount));
          
          setStats({
            totalAmount: total,
            averagePrice: average,
            totalProperties: boughtOffers.length,
            highestSale: highest
          });
        }
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

  if (loading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="p-4 space-y-8">
      {/* Stats Dashboard - Grid Layout */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Sales Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Sales Card */}
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <FaDollarSign className="text-3xl" />
                <div>
                  <h3 className="card-title">Total Sales</h3>
                  <p className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</p>
                  <p className="text-sm opacity-80">All time earnings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Sold Card */}
          <div className="card bg-secondary text-secondary-content">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <FaHome className="text-3xl" />
                <div>
                  <h3 className="card-title">Properties Sold</h3>
                  <p className="text-2xl font-bold">{stats.totalProperties}</p>
                  <p className="text-sm opacity-80">Successful transactions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Average Price Card */}
          <div className="card bg-accent text-accent-content">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <FaChartLine className="text-3xl" />
                <div>
                  <h3 className="card-title">Average Price</h3>
                  <p className="text-2xl font-bold">${stats.averagePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  <p className="text-sm opacity-80">Per property</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highest Sale Card */}
          <div className="card bg-neutral text-neutral-content">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <FaMoneyBillWave className="text-3xl" />
                <div>
                  <h3 className="card-title">Highest Sale</h3>
                  <p className="text-2xl font-bold">${stats.highestSale.toLocaleString()}</p>
                  <p className="text-sm opacity-80">Record transaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Sold Properties</h2>
        
        {sold.length === 0 ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center">
              <h3 className="text-xl font-medium">No sold properties yet</h3>
              <p className="text-base-content/70">Your sold properties will appear here once you complete transactions</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sold.map((offer) => (
              <div key={offer._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <figure>
                  <img 
                    src={offer.propertyImage} 
                    alt="Property" 
                    className="w-full h-60 object-cover rounded-t-lg" 
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{offer.propertyTitle}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary" />
                      <span>{offer.propertyLocation}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaUser className="text-secondary" />
                      <span>{offer.buyerName}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-accent" />
                      <span>{offer.buyerEmail}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-success" />
                      <span className="font-bold">${offer.offerAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-info" />
                      <span>{new Date(offer.buyingDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="card-actions justify-end mt-4">
                    <div className="badge badge-success gap-2">
                      {offer.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoldProperties;