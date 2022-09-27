import { User } from "@firebase/auth";
import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../styles/blog.css";
import { fauth } from "../utils";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    fauth.onAuthStateChanged(async (user) => {
      setUser(user);
    });
  }, [user]);
  return (
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
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="bg-zinc-800 text-white font-thin">
        {/* Banner */}
        {showBanner && (
          <div className="bg-indigo-600">
            <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center">
                  <span className="flex rounded-lg bg-indigo-800 p-2">
                    <MegaphoneIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="ml-3 truncate font-medium text-white">
                    <span className="md:hidden">TSMP is shutdown!</span>
                    <span className="hidden md:inline">
                      Tristan SMP has been permanently shutdown.
                    </span>
                  </p>
                </div>
                <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                  <Link href="https://blog.evie.pw/tsmp-shutdown">
                    <a className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50">
                      Learn more
                    </a>
                  </Link>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                  <button
                    type="button"
                    onClick={() => setShowBanner(false)}
                    className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <nav className="fixed flex justify-between py-6 w-full lg:px-48 md:px-12 px-4 content-center bg-secondary z-10">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <Image
                  src="/images/TLogo.png"
                  alt="Me"
                  className="h-4 rounded-full"
                  width={50}
                  height={50}
                />
              </a>
            </Link>
          </div>
          <ul className="font-montserrat items-center hidden md:flex">
            <li className="mx-3 ">
              <Link href="/blog">
                <a className="growing-underline">Blog</a>
              </Link>
            </li>
            <li className="growing-underline mx-3">
              <Link href="/market">
                <a>Market</a>
              </Link>
            </li>
            <li className="growing-underline mx-3">
              <Link href="/stats">
                <a>Player Stats</a>
              </Link>
            </li>

            <li className="growing-underline mx-3">
              <Link href="/donate">
                <a>Donate</a>
              </Link>
            </li>
            <li className="growing-underline mx-3">
              <Link href="/photos">
                <a>Photos</a>
              </Link>
            </li>
            <li className="growing-underline mx-3">
              <Link href="/info">
                <a>Docs</a>
              </Link>
            </li>
            <li className="growing-underline mx-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => {
                  if (user) {
                    fauth.signOut();
                    window.location.href = `/market/login`;
                  } else {
                    window.location.href = `/market/login`;
                  }
                }}
              >
                {user ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
