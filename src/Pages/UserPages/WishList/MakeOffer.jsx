import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { FaHome, FaMapMarkerAlt, FaUserTie, FaDollarSign, FaEnvelope, FaUser, FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MakeOffer = () => {
  const { id } = useParams(); // propertyId
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
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
      propertyImg: property.image,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agentName,
      offerAmount: Number(offerAmount),
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: new Date().toISOString().split("T")[0],
    };

    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: "Confirm Your Offer",
      html: `
        <div class="text-left">
          <p>You are about to submit an offer of <strong>$${offerAmount}</strong> for:</p>
          <p class="font-bold mt-2">${property.title}</p>
          <p class="text-sm">${property.location}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Submit Offer",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#ffffff",
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/house-key.gif")
        center top
        no-repeat
      `,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.post("/offers", offerData);
        if (res.data?.insertedId) {
          await Swal.fire({
            title: "Offer Submitted!",
            text: "Your offer has been successfully submitted.",
            icon: "success",
            confirmButtonColor: "#10b981",
            background: "#1f2937",
            color: "#ffffff"
          });
          setOfferAmount("");
        } else {
          throw new Error("Failed to submit offer");
        }
      } catch (err) {
        console.error("Offer submission failed:", err);
        await Swal.fire({
          title: "Submission Failed",
          text: err.message || "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#ffffff"
        });
      }
    }
  };

  const handleOfferChange = (e) => {
    const val = e.target.value;
    setOfferAmount(val);

    const numVal = Number(val);
    if (numVal < minPrice || numVal > maxPrice) {
      setError(`Offer must be between $${minPrice.toLocaleString()} and $${maxPrice.toLocaleString()}`);
    } else {
      setError("");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
  
  if (!property) return (
    <div className="alert alert-error max-w-md mx-auto mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Property not found</span>
    </div>
  );

  const minPrice = property.minPrice || 0;
  const maxPrice = property.maxPrice || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Make an Offer</h1>
          <p className="opacity-90 mt-1">Submit your offer for this property</p>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaHome className="text-primary" />
                    Property Title
                  </span>
                </label>
                <input 
                  type="text" 
                  value={property.title} 
                  readOnly 
                  className="input input-bordered w-full bg-base-200" 
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    Location
                  </span>
                </label>
                <input 
                  type="text" 
                  value={property.location} 
                  readOnly 
                  className="input input-bordered w-full bg-base-200" 
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaUserTie className="text-primary" />
                    Agent
                  </span>
                </label>
                <input 
                  type="text" 
                  value={property.agentName} 
                  readOnly 
                  className="input input-bordered w-full bg-base-200" 
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaDollarSign className="text-primary" />
                    Your Offer
                  </span>
                </label>
                <input
                  type="number"
                  value={offerAmount}
                  onChange={handleOfferChange}
                  placeholder={`$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`}
                  className="input input-bordered w-full"
                />
                {error && (
                  <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Buyer Information */}
            <div className="border-t border-base-200 pt-6">
              <h3 className="text-lg font-bold mb-4 text-primary">Buyer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <FaEnvelope className="text-primary" />
                      Your Email
                    </span>
                  </label>
                  <input 
                    type="email" 
                    value={user.email} 
                    readOnly 
                    className="input input-bordered w-full bg-base-200" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <FaUser className="text-primary" />
                      Your Name
                    </span>
                  </label>
                  <input 
                    type="text" 
                    value={user.displayName || ""} 
                    readOnly 
                    className="input input-bordered w-full bg-base-200" 
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <FaCalendarAlt className="text-primary" />
                      Purchase Date
                    </span>
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                className={`btn btn-primary btn-block ${error ? 'btn-disabled' : ''}`}
              >
                Submit Offer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeOffer;