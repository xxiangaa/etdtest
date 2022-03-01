import Head from "next/head";
import React from "react";

interface Props{
    title: string;
}

export default function Header(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="Generated NFT" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
