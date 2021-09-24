import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from "./Icons";

const CartItem = ({ title, price, quantity, id, description, category, increase, decrease, removeProduct }) => {
  const product = { title, price, quantity, id, description, category };

  return (
    <div className="box has-background-grey-lighter mx-5">
      <div className="columns is-vcentered">
        <div className="column is-three-fifths ">
          <p className="title is-6">{title}</p>
          <p className="subtitle is-6">{price}zł</p>
        </div>
        <div className="column has-text-centered">
          <p className="is-6">{`Ilość: ${quantity}`}</p>
          <button className="btn-increase" onClick={() => increase(product)}>
            <PlusCircleIcon />
          </button>
          {quantity === 1 && (
            <button className="btn-trash" onClick={() => removeProduct(product)}>
              <TrashIcon />
            </button>
          )}
          {quantity > 1 && (
            <button className="btn-decrease" onClick={() => decrease(product)}>
              <MinusCircleIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
