import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Layout from "../components/Layout";
import OrderForm from "../components/OrderForm";
import CustomCheckout from "../components/CustomCheckout";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const [orderDetails, setOrderDetails] = useState(null);

  const addressShown = {
    display: orderDetails ? "none" : "block",
  };

  const cardShown = {
    display: orderDetails ? "block" : "none",
  };

  return (
    <Layout title="Zamów">
      <div className="container">
        <div style={addressShown}>
          <OrderForm setOrderDetails={setOrderDetails} />
        </div>
        <div style={cardShown}>
          <CustomCheckout {...{ orderDetails, cartItems }} />
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
