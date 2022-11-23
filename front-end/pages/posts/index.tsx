import axios from "axios";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "../../components/layout";

type PageProps = {
  posts: {
    id: number;
    image: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
  }[];
};

export const getStaticProps: GetStaticProps = async () => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`
  );
  const res = req.data.data.data;

  return {
    props: {
      posts: res,
    },
  };
};

export default function PostIndex(props: PageProps) {
  const { posts } = props;

  return (
    <Layout>
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <Link href="/posts/create">
                  <button className="btn btn-primary border-0 shadow-sm mb-3">
                    TAMBAH
                  </button>
                </Link>
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th scope="col">IMAGE</th>
                      <th scope="col">JUDUL</th>
                      <th scope="col">CONTENT</th>
                      <th scope="col">AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="text-center">
                          <Image
                            loader={({ src }) => src}
                            src={post.image}
                            width="150"
                            height="150"
                            className="rounded-3"
                            alt={post.title}
                          />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">
                            EDIT
                          </button>
                          <button className="btn btn-sm btn-danger border-0 shadow-sm mb-3">
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
