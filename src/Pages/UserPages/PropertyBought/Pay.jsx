import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

// Load your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

// ---------------- CheckoutForm Component ----------------
const CheckoutForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setProcessing(true);

  // 1. Validate Stripe and Elements
  if (!stripe || !elements) {
    setError("Payment system not ready. Please try again later.");
    setProcessing(false);
    return;
  }

  // 2. Validate card element
  const card = elements.getElement(CardElement);
  if (!card) {
    setError("Please enter your card details");
    setProcessing(false);
    return;
  }

  // 3. Validate offer amount
  const amount = parseFloat(offer?.offerAmount);
  if (isNaN(amount)) {
    setError("Invalid offer amount");
    setProcessing(false);
    return;
  }

  // 4. Validate Stripe amount limits (in dollars)
  if (amount < 0.5) {
    setError("Minimum payment amount is $0.50");
    setProcessing(false);
    return;
  }

  if (amount > 999999.99) {
    setError("Maximum payment amount is $999,999.99");
    setProcessing(false);
    return;
  }

  try {
    console.log("Starting payment process for offer:", offer._id, "Amount:", amount);

    // 5. Create Payment Intent
    const { data } = await axiosSecure.post("/create-payment-intent", {
      offerAmount: amount.toFixed(2),
      offerId: offer._id
    }).catch(err => {
      console.error("Payment intent creation failed:", err.response?.data || err.message);
      throw new Error(err.response?.data?.error || "Failed to initialize payment");
    });

    if (!data?.clientSecret) {
      throw new Error("Payment system error (no client secret)");
    }

    console.log("Payment intent created:", data.paymentIntentId);

    // 6. Create Payment Method
    const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: offer.buyerName || "Anonymous",
        email: offer.buyerEmail || "noemail@example.com",
      },
    });

    if (paymentMethodError) {
      throw new Error(paymentMethodError.message || "Invalid card details");
    }

    if (!paymentMethod?.id) {
      throw new Error("Failed to process card information");
    }

    console.log("Payment method created:", paymentMethod.id);

    // 7. Confirm Card Payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      data.clientSecret,
      {
        payment_method: paymentMethod.id,
        receipt_email: offer.buyerEmail || undefined,
      }
    );

    if (confirmError) {
      throw new Error(confirmError.message || "Payment authorization failed");
    }

    console.log("Payment confirmation result:", paymentIntent?.status, paymentIntent?.id);

    // 8. Handle Payment Result
    switch (paymentIntent?.status) {
      case "succeeded":
        // Update backend
        const updateResponse = await axiosSecure.patch(
          `/offers/payment-success/${offer._id}`,
          {
            transactionId: paymentIntent.id,
            paymentAmount: amount,
            paymentDate: new Date().toISOString(),
          }
        ).catch(err => {
          console.error("Status update failed:", err);
          throw new Error("Payment succeeded but record update failed");
        });

        console.log("Backend updated successfully:", updateResponse.data);
        toast.success("Payment successful!");
        navigate("/dashboard/property-bought");
        break;

      case "requires_action":
        throw new Error("Additional authentication required");

      case "processing":
        toast.success("Payment processing - we'll notify you when complete");
        navigate("/dashboard/property-bought");
        break;

      default:
        throw new Error(`Unexpected payment status: ${paymentIntent?.status}`);
    }
  } catch (err) {
    console.error("Payment error:", err);
    setError(err.message || "Payment failed. Please try again.");
    toast.error(err.message || "Payment failed");
  } finally {
    setProcessing(false);
  }
};
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <CardElement className="border p-3 rounded" />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : `Pay $${offer.offerAmount}`}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

// ---------------- Main Pay Component ----------------
const Pay = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      const res = await axiosSecure.get(`/offers/by-id/${id}`);
      setOffer(res.data);
    };
    fetchOffer();
  }, [id, axiosSecure]);

  if (!offer) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Pay for: {offer.propertyTitle}
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm offer={offer} />
      </Elements>
    </div>
  );
};

export default Pay; 