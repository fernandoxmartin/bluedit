import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Header } from "./header";

export const Layout = ({ children, title }) => {
  return (
    <div className="w-full">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="bg-light-bg">{children}</main>
    </div>
  );
};