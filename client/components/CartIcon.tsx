import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';

const CartIcon = () => {
  const router = useRouter();
  const { itemCount } = useContext(CartContext);

  return (
    <div className='cart-container'>
      <Image
        src='/shopping-bag.png'
        alt='shopping-bag-icon'
        width={30}
        height={30}
        onClick={() => router.push('/cart')}
      />
      {itemCount > 0 && <span className='badge is-bottom-right is-dark'>{itemCount}</span>}
    </div>
  );
};

export default CartIcon;
