import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { CartContext } from "../context/CartContext";

const CartIcon = () => {
  const router = useRouter();
  const { itemCount } = useContext(CartContext);

  return (
    <div className="cart-container" onClick={() => router.push("/cart")}>
      <Image src="/shopping-bag.png" alt="shopping-cart-icon" width={30} height={30} />
      {itemCount > 0 && <span className="cart-count"> {itemCount} </span>}
    </div>
  );
};

export default CartIcon;
