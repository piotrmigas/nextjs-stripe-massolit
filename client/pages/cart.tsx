import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CartContext } from "../context/CartContext";
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import Total from "../components/Total";

const Cart = () => {
  const { cartItems, itemCount, total, increase, decrease, removeProduct } = useContext(CartContext);
  const funcs = { increase, decrease, removeProduct };

  return (
    <Layout title="Koszyk">
      <div className="container">
        {cartItems.length === 0 ? (
          <div className="hero is-medium">
            <div className="hero-body">
              <h4 className="title has-text-centered is-4">Twój koszyk jest pusty.</h4>
            </div>
          </div>
        ) : (
          <div className="columns pt-3">
            <div className="column">
              <TransitionGroup>
                {cartItems.map((item) => (
                  <CSSTransition key={item.id} timeout={500} classNames="item">
                    <CartItem {...item} {...funcs} />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
            <div className="column has-text-centered">
              <Total itemCount={itemCount} total={total} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
