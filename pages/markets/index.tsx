import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { MarketsPage } from "../../components/MarketsPage";
import { fauth, firestore } from "../../utils";
import { EventEmitter } from "fbemitter";
import { User } from "@firebase/auth";
import { Item } from "../../components/Item";
import { query, collection, getDocs } from "firebase/firestore";

type MarketItem = {
  base64: string;
  price: number;
  seller: string;
};

export const signOutEvent = new EventEmitter();

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<MarketItem[]>();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    signOutEvent.addListener("signout", function () {
      setUser(null);
    });

    fauth.onAuthStateChanged(async (user) => {
      if (user) {
        const fstore = firestore.getFirestore();
        setUser(user);
        const q = query(collection(fstore, "market"));
        const items = (await getDocs(q)).docs.map((d) =>
          d.data()
        ) as MarketItem[];
        console.log(items);
        setItems(items);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [user]);

  while (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blurple drop-shadow-2xl" />
      </div>
    );
  }

  return user ? (
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
      <section className="container py-32 mx-auto text-center sm:px-4">
        <span className="text-4xl font-bold text-white">
          Welcome to the TSMP Markets {user.displayName}
          <span className="font-normal">🛍️</span>
        </span>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items!.map((item) => (
            <div key={item.base64} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Item
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  id={`minecraft:${item.base64.split(" 😎 ")[1].toLowerCase()}`}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white font-semibold">
                    <a href="/bruh">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.base64.split(" 😎 ")[1].replace("_", " ")}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-blue-600">
                  {item.price} Diamonds
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  ) : (
    <MarketsPage />
  );
};

export default Home;
