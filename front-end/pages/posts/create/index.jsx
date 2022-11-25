import React, { useState } from "react";
import Layout from "../../../components/layout";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function PostCreate() {
  // Router
  const router = useRouter();

  //state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //function "handleFileChange"
  const handleFileChange = (e) => {
    //define variable for get value image data
    const imageData = e.target.files[0];

    //check validation file
    if (!imageData.type.match("image.*")) {
      //set state "image" to null
      setImage("");

      return;
    }

    //assign file to state "image"
    setImage(imageData);
  };

  //method "storePost"
  const storePost = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);

    //send data to server using fetch
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`,
      {
        method: "POST",
        body: formData,
      }
    );

    //get response data
    const data = await response.json();

    //check response
    if (data.success) {
      //redirect to dashboard
      router.push("/posts");
    } else {
      console.log(data);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Create Post - Ikram Web</title>
      </Head>

      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-body">
                <form onSubmit={storePost}>
                  <div className="form-group mb-3">
                    <label className="form-label fw-bold">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  {validation.image && (
                    <div className="alert alert-danger">{validation.image}</div>
                  )}

                  <div className="form-group mb-3">
                    <label className="form-label fw-bold">TITLE</label>
                    <input
                      className="form-control"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Masukkan Title"
                    />
                  </div>
                  {validation.title && (
                    <div className="alert alert-danger">{validation.title}</div>
                  )}

                  <div className="form-group mb-3">
                    <label className="form-label fw-bold">CONTENT</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Masukkan Content"
                    />
                  </div>
                  {validation.content && (
                    <div className="alert alert-danger">
                      {validation.content}
                    </div>
                  )}

                  <button
                    className="btn btn-primary border-0 shadow-sm"
                    type="submit"
                  >
                    SIMPAN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
