import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import Layout from '../components/Layout';
import { CartContext } from '../context/CartContext';

const Success = () => {
  const router = useRouter();
  const { clearCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    if (cartItems.length !== 0) clearCart();
  }, [clearCart, cartItems]);

  return (
    <Layout title='Podsumowanie'>
      <section className='hero is-medium'>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <h4 className='title is-4'>Dziękujemy za złożenie zamówienia!</h4>
            <div>
              <FontAwesomeIcon icon={faCheckCircle} size='3x' className='mb-5' />
            </div>
            <button className='button is-black' onClick={() => router.push('/')}>
              Powrót
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Success;
