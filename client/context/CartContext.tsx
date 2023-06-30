import { ReactNode, createContext, useReducer } from 'react';
import cartReducer, { sumItems } from './cartReducer';

export const CartContext = createContext(null);

const cartFromStorage =
  typeof window !== 'undefined' && localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : [];

const initialState = { cartItems: cartFromStorage, ...sumItems(cartFromStorage) };

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProduct = (product: CartItem) => dispatch({ type: 'ADD_ITEM', payload: product });
  const increase = (product: CartItem) => dispatch({ type: 'INCREASE', payload: product });
  const decrease = (product: CartItem) => dispatch({ type: 'DECREASE', payload: product });
  const removeProduct = (product: CartItem) => dispatch({ type: 'REMOVE_ITEM', payload: product });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const contextValues = {
    ...state,
    addProduct,
    increase,
    decrease,
    removeProduct,
    clearCart,
  };

  return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
