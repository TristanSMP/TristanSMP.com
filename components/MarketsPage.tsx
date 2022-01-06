import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import { Item } from "./Item";
import Link from "next/link";

export function MarketsPage() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>TSMP Markets</title>
        <meta name="title" content="TSMP Markets" />
        <meta
          name="description"
          content="Buy & Auction Items on the TSMP Market."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tristansmp.com/stats" />
        <meta property="og:title" content="TSMP Markets" />
        <meta
          property="og:description"
          content="Buy & Auction Items on the TSMP Market."
        />
        <meta property="og:image" content={""} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tristansmp.com/stats" />
        <meta
          property="twitter:title"
          content="Buy & Auction Items on the TSMP Market."
        />
        <meta
          property="twitter:description"
          content="Buy & Auction Items on the TSMP Market."
        />
        <meta property="twitter:image" content={""} />
      </Head>
      {/* Hero */}
      <section className="">
        <div className="container py-32 mx-auto text-center sm:px-4">
          <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-6xl xl:text-7xl">
            <span className="block">Welcome to the TSMP</span>{" "}
            <span className="relative inline-block mt-3 text-blue-400">
              Markets 🛒!
            </span>
          </h1>
          <Link href="/info/markets">
            <button
              type="button"
              className="w-full mt-6 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              What is this?
            </button>
          </Link>
          <div className="mt-12">
            <a
              href="/markets/login"
              className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
            >
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm">
                <span className="relative w-5 h-5 mr-2 text-white">
                  <Item id="minecraft:grass_block" />
                </span>
                Sign-In
              </span>
            </a>
          </div>
          <Image
            src="/markets/diamonds.svg"
            alt="Diamonds"
            width={300}
            height={200}
          />
        </div>
      </section>
    </>
  );
}
