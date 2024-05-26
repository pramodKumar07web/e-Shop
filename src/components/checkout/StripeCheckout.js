import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import CheckoutForm from "./CheckoutForm";
import UserContext from "../context/UserContext";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51OsUBIDflVYbhFY6WhxU0eUzUcexECtxqLoXIs0hDGkp49yXdLo29i9BNtZ3vjhtoyrM7g9cH6Gtwwg034zINEek00FckpmzTg");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const { totalAmount, currentOrder }  = useContext(UserContext)
  console.log("dddd",currentOrder._id)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3005/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      body: JSON.stringify({ totalAmount:totalAmount, orderId:currentOrder._id }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}