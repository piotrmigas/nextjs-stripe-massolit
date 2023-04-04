import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Canceled = () => {
  const router = useRouter();

  return (
    <Layout title="Płatność anulowana">
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h4 className="title is-4">Płatność nie powiodła się :(</h4>
            <button className="button is-black" onClick={() => router.push("/")}>
              Powrót
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Canceled;
