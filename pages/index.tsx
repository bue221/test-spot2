import MainView from "features/maps/containers/MainView";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Prueba | spot2</title>
        <meta
          name="description"
          content="Esta es la mejor prueba hasta el momento jaja"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainView />
    </>
  );
};

export default Home;
