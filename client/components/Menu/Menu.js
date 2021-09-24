import MenuCategory from "./MenuCategory";

const Menu = () => {
  return (
    <div className="has-background-white-ter">
      <div id="menu" className="container py-6 has-text-centered">
        <h1 className="title is-size-4-mobile">Menu</h1>
        <p className="title is-4 pb-5 is-size-5-mobile">Massolit na słodko ! / Sweets at Massolit !</p>
        <p className="title is-4 is-size-5-mobile">Ciasta / Cakes</p>
        <div className="columns is-multiline">
          <MenuCategory category="cakes" />
        </div>
        <p className="title is-4 is-size-5-mobile">Serniki Nowojorskie / New York Cheesecakes</p>
        <div className="columns is-multiline">
          <MenuCategory category="cheesecakes" />
        </div>
        <p className="title is-4 is-size-5-mobile">Cookies / Ciasteczka</p>
        <div className="block">
          Niezależnie od rodzaju, wszystkie ciasteczka są sumowane. Jeśli zamawiasz 1-3 ciasteczka, płacisz 3 zł za
          jedno. Gdy zamawiasz 4 kosztują razem 10 zł; 10 ciasteczek 23 zł, 20 ciasteczek - 40 zł. / All cookie orders
          are grouped - if you order a total of 1-3 cookies: it is 3 zł/cookie, 4 cookies: 10 zł, 10 cookies: 23 zł, 20
          cookies: 40 zł.
        </div>
        <div className="columns is-multiline">
          <MenuCategory category="cookies" />
        </div>
        <p className="title is-4 mb-2 is-size-5-mobile">Ciasta Ucierane / Bundt Cakes</p>
        <div className="columns is-multiline">
          <MenuCategory category="bundt" />
        </div>
        <p className="title is-4 py-5 is-size-5-mobile">Oferta na słono !</p>
        <p className="title is-4 is-size-5-mobile">Pieczywo / Bread</p>
        <div className="columns is-multiline">
          <MenuCategory category="bread" />
        </div>
        <p className="title is-4 is-size-5-mobile">Pasty / Spreads</p>
        <div className="columns is-multiline">
          <MenuCategory category="spreads" />
        </div>
        <p className="title is-4 is-size-5-mobile">Pasztety / Pate: 15.5x6 cm, 20x7 cm</p>
        <div className="columns is-multiline">
          <MenuCategory category="pate" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
