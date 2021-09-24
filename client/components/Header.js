import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import { auth } from "../firebase";
import { UserContext } from "../context/UserContext";
import logo from "../public/logo.jpg";

const Header = () => {
  const { user } = useContext(UserContext);
  const [isActive, setisActive] = useState(false);

  return (
    <nav className="navbar is-spaced is-white" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="logo" aria-label="logo">
            <Image src={logo} alt="" className="navbar-item" />
          </a>
        </Link>
        <Link href="/">
          <a className="brand ml-3 is-size-5">Massolit Books &amp; Bakery</a>
        </Link>
        <button
          className={`navbar-burger ${isActive && "is-active"}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          onClick={() => {
            setisActive(!isActive);
          }}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div
        id="navbar"
        className={`navbar-menu ${isActive && "is-active"}`}
        onClick={() => {
          setisActive(!isActive);
        }}
      >
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">Menu</a>
          </Link>
          {!user && (
            <Link href="/signin">
              <a className="navbar-item">Zaloguj się</a>
            </Link>
          )}
          {user && (
            <Link href="/">
              <a className="navbar-item" onClick={() => auth.signOut()}>
                Wyloguj
              </a>
            </Link>
          )}
          {user && (
            <Link href="/orders">
              <a className="navbar-item">Zamówienia</a>
            </Link>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <Link href="/cart">
              <a>
                <CartIcon />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
