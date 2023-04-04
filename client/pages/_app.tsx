import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppProps } from 'next/app';
import '../styles/globals.scss';
import ProductsContextProvider from '../context/ProductsContext';
import CartContextProvider from '../context/CartContext';
import UserContextProvider from '../context/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [stripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as string));

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
