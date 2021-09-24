import { useState } from "react";
import { Link } from "react-scroll";
import Image from "next/image";
import hero from "../public/hero.jpg";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="hero is-fullheight-with-navbar" style={{ opacity: loaded ? 1 : 0 }}>
      <Image src={hero} alt="" onLoadingComplete={() => setLoaded(true)} className="hero-background" layout="fill" />
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title has-text-white is-size-4-mobile">Massolit na świątecznym stole!</h1>
          <Link to="menu" smooth={true} duration={1200} className="button is-black">
            Zamów
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
