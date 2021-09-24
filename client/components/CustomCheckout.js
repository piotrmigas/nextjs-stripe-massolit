import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../helpers";
import { UserContext } from "../context/UserContext";

const CustomCheckout = ({ cartItems, orderDetails }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    const items = cartItems.map((item) => ({ price: item.price, quantity: item.quantity, category: item.category }));

    if (orderDetails) {
      const body = {
        cartItems: items,
        shipping: {
          name: user.displayName,
          phone: orderDetails.phone,
          address: {
            line1: orderDetails.pickupAddress,
          },
        },
        receipt_email: user.email,
        metadata: {
          uid: user.id,
          products: cartItems.map((item) => item.title).join(", "),
          pickupDate: orderDetails.pickupDate,
        },
      };

      const customCheckout = async () => {
        const { id } = await fetchFromAPI("create-payment-intent", { body });

        setPaymentIntentId(id);
      };

      customCheckout();
    }
  }, [cartItems, orderDetails, user]);

  const handleCheckout = async () => {
    setProcessing(true);
    const { clientSecret } = await fetchFromAPI("update-payment-intent", {
      body: { paymentIntentId },
      method: "PUT",
    });

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardNumberElement) },
    });

    if (payload.error) {
      setError(`Payment Failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      router.push("/success");
    }
  };

  const handleCardChange = (e) => {
    const { error } = e;
    setError(error ? error.message : "");
    setCardComplete({ ...cardComplete, [e.elementType]: e.complete });
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        textAlign: "center",
        "::placeholder": {
          color: "#4a4a4a",
        },
      },
      invalid: {
        color: "red",
      },
    },
  };

  const { cardNumber, cardExpiry, cardCvc } = cardComplete;

  return (
    <div className="columns is-centered has-text-centered mt-6">
      <div className="column is-one-third">
        <h5 className="title is-5">Płatność kartą</h5>
        <div className="stripe-card">
          <CardNumberElement className="card-element" options={cardStyle} onChange={handleCardChange} />
        </div>
        <div className="stripe-card">
          <CardExpiryElement className="card-element" options={cardStyle} onChange={handleCardChange} />
        </div>
        <div className="stripe-card">
          <CardCvcElement className="card-element" options={cardStyle} onChange={handleCardChange} />
        </div>
        <button
          disabled={processing || !cardNumber || !cardExpiry || !cardCvc}
          className={`button is-black ${processing && "is-loading"}`}
          onClick={() => handleCheckout()}
        >
          Zapłać
        </button>
        {error && <p className="error-message mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CustomCheckout;
