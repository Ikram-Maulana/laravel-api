import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Layout from "../../components/layout";

export const getStaticProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`
  );
  const data = await response.json();

  return {
    props: {
      posts: data.data.data,
    },
    revalidate: 10,
  };
};

export default function PostIndex(props) {
  const { posts } = props;

  //router
  const router = useRouter();
  const path = usePathname();

  // Refresh data
  const refreshData = () => {
    router.replace(path);
  };

  //function "deletePost"
  const deletePost = async (id) => {
    //sending using fetch
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${id}`
    );

    //refresh data
    refreshData();
  };

  return (
    <Layout>
      <Head>
        <title>Posts - Ikram Web</title>
      </Head>

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
                            unoptimized
                            priority
                          />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td className="text-center">
                          <Link href={`/posts/edit/${post.id}`}>
                            <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">
                              EDIT
                            </button>
                          </Link>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="btn btn-sm btn-danger border-0 shadow-sm mb-3"
                          >
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
