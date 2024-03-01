import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { Toaster } from "react-hot-toast";
import { useLoadingWithRefresh } from "hooks/useLoadingWithRefresh";
import Footer from "./Footer";
import { useRouter } from "next/router";


const Layout = ({ children }) => {
  const router = useRouter();
  const { loading } = useLoadingWithRefresh();

 

  const path = router.pathname;

  return loading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <title>Bloom - Track your YouTube Learning</title>
      </Head>
      {!path.includes("auth") && <Navbar />}
      <main className="w-11/12 min-h-screen mx-auto lg:w-10/12">
        {children}
      </main>
      <Toaster />
      {!path.includes("auth") && <Footer />}
    </>
  );
};

export default Layout;
