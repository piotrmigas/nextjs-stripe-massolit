import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Info from "../components/Info";
import Menu from "../components/Menu/Menu";

export default function Home() {
  return (
    <Layout title="Massolit Books &amp; Bakery">
      <Hero />
      <Info />
      <Menu />
    </Layout>
  );
}
