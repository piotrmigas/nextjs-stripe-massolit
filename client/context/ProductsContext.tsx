import { ReactNode, createContext, useState } from 'react';
import { data } from '../products';

export const ProductsContext = createContext(null);

const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState(data);

  return <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>;
};

export default ProductsContextProvider;
