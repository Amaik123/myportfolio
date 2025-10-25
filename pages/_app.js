import "../styles/globals.css";
import "../pages/components/GradientText.css";
import "../styles/ProfileCard.css";
import Head from "next/head";
// import "../pages/ProfileCard.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
