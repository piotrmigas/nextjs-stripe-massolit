import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import { UserContext } from '../context/UserContext';
import { db } from '../firebase';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const stripeOrders = await db
        .collection('users')
        .doc(user.id)
        .collection('orders')
        .orderBy('createdAt', 'desc')
        .get();

      setOrders(
        await Promise.all(
          stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            products: order.data().products,
            shipping: order.data().shipping,
            pickupDate: order.data().pickupDate,
            createdAt: order.data().createdAt.toDate().toLocaleDateString('pl-PL'),
          }))
        )
      );
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    !loading && (
      <Layout title='Zamówienia'>
        <div className='section container py-5'>
          {orders.length === 0 ? (
            <div className='hero is-medium'>
              <div className='hero-body'>
                <div className='container has-text-centered'>
                  <h4 className='title is-4'>Brak zamówień :(</h4>
                  <button className='button is-black' onClick={() => router.push('/')}>
                    Zamów
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h4 className='title is-4 has-text-centered is-size-5-mobile'>Twoje zamówienia:</h4>
              <div className='columns pt-3'>
                <div className='column'>
                  {orders.map(({ id, products, amount, createdAt }) => (
                    <div className='box has-background-grey-lighter' key={id}>
                      <div className='columns is-vcentered'>
                        <div className='column is-three-fifths'>
                          <p className='title is-6'>{products}</p>
                          <p className='subtitle is-6'>Suma: {amount}zł</p>
                        </div>
                        <div className='column has-text-centered'>
                          <p className='is-6 id'>id: {id}</p>
                          <p className='is-6'>Dnia: {createdAt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    )
  );
};

export default Orders;
