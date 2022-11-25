import Head from "next/head";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home - Ikram Web</title>
      </Head>

      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="p-5 mb-4 bg-light rounded-3 shadow-sm border-0">
              <div className="container-fluid py-5">
                <h2 className="display-6 fw-bold">LARAVEL + NEXT.JS</h2>
                <p className="col-md-12 fs-4">
                  Belajar CRUD dan Authentication Laravel API dengan Next.js
                </p>
                <a
                  href="https://github.com/ikram-maulana"
                  target="_blank"
                  className="btn btn-dark btn-lg"
                  type="button"
                >
                  Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
