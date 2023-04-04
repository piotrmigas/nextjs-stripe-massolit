const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  typeof window !== 'undefined' && localStorage.setItem('cart', JSON.stringify(cart));
};

export const sumItems = (cartItems) => {
  storeCartItems(cartItems);
  const cookies = cartItems.filter((item) => item.category === 'cookies');
  const otherItems = cartItems.filter((item) => item.category !== 'cookies');

  let discount;

  const quantity = cookies.reduce((prev, cur) => prev + cur.quantity, 0);

  if (quantity > 0 && quantity <= 3) discount = 0;
  if (quantity > 3 && quantity <= 9) discount = 0.16;
  if (quantity > 9 && quantity <= 19) discount = 0.23;
  if (quantity > 19) discount = 0.33;
  const price = quantity * 3;
  const savings = price * discount;
  const totalCookies = Math.floor(price - savings);

  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total:
      (cookies.length ? totalCookies : 0) + otherItems.reduce((total, prod) => total + prod.price * prod.quantity, 0),
  };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case 'INCREASE':
      const increaseIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      state.cartItems[increaseIndex].quantity++;

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case 'DECREASE':
      const decreaseIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      const product = state.cartItems[decreaseIndex];

      if (product.quantity > 1) {
        product.quantity--;
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case 'REMOVE_ITEM':
      const newCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cartItems: [...newCartItems],
        ...sumItems(newCartItems),
      };
    case 'CLEAR':
      localStorage.removeItem('cart');
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
