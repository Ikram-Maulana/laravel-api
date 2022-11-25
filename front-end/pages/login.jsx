import React, { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import Head from "next/head";
import axios from "axios";

export default function Login() {
  // Router
  const router = useRouter();

  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validation, setValidation] = useState([]);

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("email", email);
    formData.append("password", password);

    //send data to server
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData)
      .then((response) => {
        //set token on cookies
        setCookie(null, "token", response.data.token, {
          // Max Cookie Age for 30 minutes
          maxAge: 30 * 60,
        });

        //redirect to dashboard
        router.push("/dashboard");
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  //hook useEffect
  useEffect(() => {
    const cookies = parseCookies();

    //check token
    if (cookies.token) {
      //redirect to dashboard
      router.push("/dashboard");
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Login Account - Ikram Web</title>
      </Head>

      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold">HALAMAN LOGIN</h4>
                <hr />
                {validation.message && (
                  <div className="alert alert-danger">{validation.message}</div>
                )}
                <form onSubmit={loginHandler}>
                  <div className="mb-3">
                    <label className="form-label">ALAMAT EMAIL</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan Alamat Email"
                    />
                  </div>
                  {validation.email && (
                    <div className="alert alert-danger">
                      {validation.email[0]}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">PASSWORD</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan Password"
                    />
                  </div>
                  {validation.password && (
                    <div className="alert alert-danger">
                      {validation.password[0]}
                    </div>
                  )}
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
