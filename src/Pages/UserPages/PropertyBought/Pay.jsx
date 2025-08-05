import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { FaLock, FaCreditCard, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

// Animated Checkout Form
const CheckoutForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again later.");
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Please enter your card details");
      setProcessing(false);
      return;
    }

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        offerAmount: offer.offerAmount.toFixed(2),
        offerId: offer._id
      });

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: offer.buyerName || "Anonymous",
              email: offer.buyerEmail || "noemail@example.com",
            },
          },
        }
      );

      if (paymentError) throw new Error(paymentError.message);

      await axiosSecure.patch(`/offers/payment-success/${offer._id}`, {
        transactionId: paymentIntent.id,
        paymentAmount: offer.offerAmount,
        paymentDate: new Date().toISOString(),
      });

      toast.success("Payment successful!");
      navigate("/dashboard/user/bought");
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
      toast.error(err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto"
    >
      <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden">
        {/* Payment Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Complete Payment</h2>
            <div className="flex items-center gap-2">
              <FaLock className="text-white/80" />
              <span className="text-sm">Secure Payment</span>
            </div>
          </div>
        </div>

        {/* Property Summary */}
        <div className="p-6 border-b border-base-200">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <img 
                src={offer.propertyImg} 
                alt={offer.propertyTitle} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{offer.propertyTitle}</h3>
              <p className="text-base-content/70">{offer.propertyLocation}</p>
              <div className="mt-2">
                <span className="text-2xl font-bold text-primary">
                  ${offer.offerAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 font-medium text-base-content">
              Card Details
            </label>
            <div className="border border-base-300 rounded-lg p-3 bg-base-200/30">
              <CardElement 
                onChange={(e) => setCardComplete(e.complete)}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-base-content/70">
            <FaCheckCircle className="text-success" />
            <span>Your payment is secured with 256-bit encryption</span>
          </div>

          {error && (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary w-full gap-2 ${(!stripe || processing || !cardComplete) ? 'btn-disabled' : ''}`}
            disabled={!stripe || processing || !cardComplete}
          >
            {processing ? (
              <>
                <FaSpinner className="animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <FaCreditCard />
                Pay ${offer.offerAmount.toLocaleString()}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 p-6 bg-base-200 rounded-xl">
        <h3 className="font-medium mb-4">Accepted Payment Methods</h3>
        <div className="flex flex-wrap gap-4">
          {['visa', 'mastercard', 'amex', 'discover'].map((type) => (
            <div key={type} className="w-12 h-8 bg-white rounded flex items-center justify-center shadow-sm">
              <img 
                src={`https://logo.clearbit.com/${type}.com`} 
                alt={type} 
                className="h-5 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Pay Component
const Pay = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axiosSecure.get(`/offers/by-id/${id}`);
        setOffer(res.data);
      } catch (err) {
        toast.error("Failed to load offer details");
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [id, axiosSecure]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!offer) return (
    <div className="alert alert-error max-w-md mx-auto mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Offer not found</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Elements stripe={stripePromise}>
        <CheckoutForm offer={offer} />
      </Elements>
    </div>
  );
};

export default Pay;