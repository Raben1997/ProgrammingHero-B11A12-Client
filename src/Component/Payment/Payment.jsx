import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // 🔄 Step 1: Load application data via API
  const { data: applicationData, isLoading } = useQuery({
    queryKey: ["applicationById", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // 🔄 Step 2: Create payment intent when applicationData is loaded
  useEffect(() => {
    if (applicationData?.applicationFee) {
      axiosSecure
        .post("/create-payment-intent", { amount: applicationData.applicationFee })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [applicationData, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      return Swal.fire("Payment Error", error.message, "error");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: applicationData?.userName,
            email: applicationData?.userEmail,
          },
        },
      });

    if (confirmError) {
      setProcessing(false);
      return Swal.fire("Error", confirmError.message, "error");
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        ...applicationData,
        paymentStatus: "paid",
        transactionId: paymentIntent.id,
        paymentDate: new Date(),
      };

      try {
        // 🔄 Step 3: Update the existing application with payment info
        const res = await axiosSecure.put(`/applications/payment/${id}`, paymentInfo);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Payment successful!", "success");
          navigate("/dashboard/user/my-application");
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to update payment info", "error");
      }
    }

    setProcessing(false);
  };

  if (isLoading) {
    return <p className="text-center text-green-600 font-medium mt-10">Loading application data...</p>;
  }

  return (
    <div className="sec-gap">
      <div className="container max-w-xl mx-auto bg-green-50 p-6 border border-green-600 rounded shadow">
        <h2 className="text-xl text-green-700 font-bold mb-4 text-center">
          Complete Scholarship Payment
        </h2>

        {applicationData?.applicationFee ? (
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#16a34a",
                    "::placeholder": { color: "#9ca3af" },
                  },
                  invalid: { color: "#dc2626" },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe || !clientSecret || processing}
              className="btn w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
            >
              {processing
                ? "Processing..."
                : `Pay ₹${applicationData?.applicationFee}`}
            </button>
          </form>
        ) : (
          <p className="text-center text-red-600 font-medium">
            Application Fee not found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;
