import React from "react";
import Navbar from "./Navbar";

type PageProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: PageProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
