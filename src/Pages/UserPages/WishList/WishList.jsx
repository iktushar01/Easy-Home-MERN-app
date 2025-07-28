import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaHandshake, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import LoadingSpinner from "../../../Componens/Buttons/LoadingSpinner";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axiosSecure.get(`/wishlist/${user.email}`);
        const wishlistData = res.data;

        const propertyRequests = wishlistData.map((item) =>
          axiosSecure.get(`/properties/${item.propertyId}`)
        );
        const propertyResponses = await Promise.all(propertyRequests);
        const fullProperties = propertyResponses.map((res) => ({
          ...res.data,
          wishlistId: wishlistData.find((w) => w.propertyId === res.data._id)?._id,
        }));

        setWishlist(fullProperties);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchWishlist();
    }
  }, [user, axiosSecure]);

  const handleRemove = async (wishlistId) => {
    try {
      await axiosSecure.delete(`/wishlist/${wishlistId}`);
      setWishlist((prev) =>
        prev.filter((property) => property.wishlistId !== wishlistId)
      );
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("Remove failed", err);
      toast.error("Failed to remove");
    }
  };

  const handleMakeOffer = (propertyId) => {
    navigate(`/dashboard/user/make-offer/${propertyId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Saved Properties</h1>
          <p className="text-base-content/70 mt-2">
            {wishlist.length} {wishlist.length === 1 ? "property" : "properties"} saved
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner/>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-xl">
          <div className="flex justify-center mb-4">
            <FaHeart className="text-5xl text-primary/30" />
          </div>
          <h3 className="text-xl font-medium text-base-content/70">Your wishlist is empty</h3>
          <p className="text-base-content/50 mt-2">
            Save properties you're interested in by clicking the heart icon
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((property) => (
            <div
              key={property._id}
              className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-200/50 group"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-60 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => handleRemove(property.wishlistId)}
                  className="absolute top-4 right-4 btn btn-circle btn-sm btn-error text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Remove from wishlist"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{property.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-base-content/70 mb-3">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-lg font-bold mb-4">
                  <FaDollarSign className="text-primary" />
                  <span>${property.minPrice.toLocaleString()} - ${property.maxPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-base-200/50">
                  <div className="avatar">
                    <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1">
                      <img src={property.agentImage} alt={property.agentName} />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{property.agentName}</p>
                    {property.isVerified && (
                      <span className="badge badge-success badge-xs mt-0.5 gap-1">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleMakeOffer(property._id)}
                    className="btn btn-primary flex-1 gap-2"
                  >
                    <FaHandshake />
                    Make Offer
                  </button>
                  <button
                    onClick={() => handleRemove(property.wishlistId)}
                    className="btn btn-outline btn-error md:hidden"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;