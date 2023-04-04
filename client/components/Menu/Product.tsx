import { useContext } from 'react';
import { isInCart } from '../../helpers';
import { CartContext } from '../../context/CartContext';
import { Product } from '../../types';

const Product = ({ title, price, id, description, category }: Product) => {
  const { addProduct, cartItems, increase } = useContext(CartContext);

  const product = { title, price, id, category, description };
  const itemInCart = isInCart(product, cartItems);

  return (
    <div className='box my-3'>
      <div className='columns is-vcentered'>
        <div className='column is-two-thirds'>
          <p className='title is-6'>{title}</p>
          {description && <p>{description}</p>}
        </div>
        <div className='column'>
          <p className='title is-6 price'>{price}zł</p>
        </div>
        <div className='column'>
          <button className='button add-btn' onClick={() => (!itemInCart ? addProduct(product) : increase(product))}>
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
