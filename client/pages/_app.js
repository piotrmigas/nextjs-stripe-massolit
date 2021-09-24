import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/globals.scss";
import ProductsContextProvider from "../context/ProductsContext";
import CartContextProvider from "../context/CartContext";
import UserContextProvider from "../context/UserContext";

function MyApp({ Component, pageProps }) {
  const [stripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY));

  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <Elements stripe={stripePromise}>
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </Elements>
      </CartContextProvider>
    </ProductsContextProvider>
  );
}

export default MyApp;
