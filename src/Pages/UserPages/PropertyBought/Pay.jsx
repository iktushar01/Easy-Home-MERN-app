import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

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

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    try {
      // 1. Create PaymentIntent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        offerAmount: offer.offerAmount,
      });

      console.log("Offer in checkout form:", offer);


      const clientSecret = data.clientSecret;

      // 2. Create PaymentMethod
      const paymentMethodResult = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: offer.buyerName || "Anonymous",
          email: offer.buyerEmail || "noemail@example.com",
        },
      });

      if (paymentMethodResult.error) {
        setError(paymentMethodResult.error.message);
        setProcessing(false);
        return;
      }

      // 3. Confirm payment
      const confirm = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodResult.paymentMethod.id,
      });

      if (confirm.error) {
        setError(confirm.error.message);
        setProcessing(false);
      } else if (confirm.paymentIntent.status === "succeeded") {
        // 4. Update status in backend
        await axiosSecure.patch(`/offers/payment-success/${offer._id}`, {
          transactionId: confirm.paymentIntent.id,
        });

        toast.success("Payment successful!");
        navigate("/dashboard/property-bought");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
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