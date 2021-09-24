import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";

const Total = ({ itemCount, total }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="block">Liczba produktów: {itemCount}</div>
      <div className="block">{`Suma: ${total}zł`}</div>
      <button className="button is-black" onClick={() => router.push(`${!user ? "/signin" : "/checkout"}`)}>
        Zamów
      </button>
    </>
  );
};

export default Total;
