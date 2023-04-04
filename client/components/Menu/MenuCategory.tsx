import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import Product from './Product';

type Props = {
  category: string;
};

const MenuItems = ({ category }: Props) => {
  const { products } = useContext(ProductsContext);

  return (
    <>
      {products
        .filter((product) => product.category === category)
        .map((product) => (
          <div className='column is-half' key={product.id}>
            <Product {...product} key={product.id} />
          </div>
        ))}
    </>
  );
};

export default MenuItems;
