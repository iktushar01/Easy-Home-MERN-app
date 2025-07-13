import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

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
    toast("Offer feature coming soon!");
    // Or navigate(`/make-offer/${propertyId}`)
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">My Wishlist</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center text-gray-500">No properties in wishlist.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((property) => (
            <div
              key={property._id}
              className="card bg-base-100 shadow-md border border-base-200"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg md:text-xl">{property.name}</h2>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Location:</span> {property.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Price:</span> ${property.priceRange}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img src={property.agentImage} alt={property.agentName} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{property.agentName}</p>
                    {property.isVerified && (
                      <span className="badge badge-success badge-sm mt-0.5">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleMakeOffer(property._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Make an Offer
                  </button>
                  <button
                    onClick={() => handleRemove(property.wishlistId)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
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
