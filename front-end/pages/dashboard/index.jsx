import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  // Router
  const router = useRouter();

  //get token
  const cookie = parseCookies();
  const token = cookie.token;

  //state user
  const [user, setUser] = useState({});

  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/user`)
      .then((response) => {
        //set response user to state
        setUser(response.data);
      });
  };

  //hook useEffect
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      router.push("/login");
    }

    //call function "fetchData"
    fetchData();
  }, []);

  //function logout
  const logoutHanlder = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch Rest API
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`)
      .then(() => {
        //remove token from cookies
        destroyCookie(null, "token");

        //redirect halaman login
        router.push("/login");
      });
  };

  return (
    <Layout>
      <Head>
        <title>Login Account - Ikram Web</title>
      </Head>

      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-body">
                SELAMAT DATANG{" "}
                <strong className="text-uppercase">{user.name}</strong>
                <hr />
                <button
                  onClick={logoutHanlder}
                  className="btn btn-md btn-danger"
                >
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
