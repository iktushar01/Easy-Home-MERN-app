import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";

const MakeOffer = () => {
  const { id } = useParams(); // propertyId
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // form state
  const [offerAmount, setOfferAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosSecure.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        toast.error("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, axiosSecure]);

  if (loading) return <div className="p-4 text-center">Loading property details...</div>;
  if (!property) return <div className="p-4 text-center">Property not found</div>;

  const minPrice = property.minPrice || 0;
  const maxPrice = property.maxPrice || 0;

  const handleOfferChange = (e) => {
    const val = e.target.value;
    setOfferAmount(val);

    const numVal = Number(val);
    if (numVal < minPrice || numVal > maxPrice) {
      setError(`Offer must be between $${minPrice} and $${maxPrice}`);
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offerAmount) {
      toast.error("Please enter an offer amount");
      return;
    }

    if (error) {
      toast.error(error);
      return;
    }

    const offerData = {
      propertyId: id,
      propertyImg : property.image,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agentName,
      offerAmount: Number(offerAmount),
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await axiosSecure.post("/offers", offerData);
      if (res.data?.insertedId) {
        toast.success("Offer submitted successfully!");
        setOfferAmount("");
      } else {
        toast.error("Failed to submit offer");
      }
    } catch (err) {
      console.error("Offer submission failed:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Property Title</label>
          <input type="text" value={property.title} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Property Location</label>
          <input type="text" value={property.location} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Agent Name</label>
          <input type="text" value={property.agentName} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Offer Amount</label>
          <input
            type="number"
            value={offerAmount}
            onChange={handleOfferChange}
            placeholder={`Enter amount between $${minPrice} and $${maxPrice}`}
            className="input input-bordered w-full"
          />
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Buyer Email</label>
          <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Buyer Name</label>
          <input type="text" value={user.displayName || ""} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Buying Date</label>
          <input
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={!!error}>
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
