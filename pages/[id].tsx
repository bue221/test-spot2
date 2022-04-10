import DetailViewC from "features/maps/containers/DetailView";
import type { NextPage } from "next";
import Head from "next/head";

const DetailView: NextPage = () => {
  return (
    <>
      <Head>
        <title>Prueba detalle| spot2</title>
        <meta
          name="description"
          content="Esta es la mejor prueba hasta el momento jaja"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailViewC />
    </>
  );
};

export default DetailView;
