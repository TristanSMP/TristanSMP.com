import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { MarketsPage } from "../../components/MarketsPage";
import { fauth, firebaseAuth, firestore } from "../../utils";
import { EventEmitter } from "fbemitter";
import { User } from "@firebase/auth";
import { Item } from "../../components/Item";
import {
  query,
  collection,
  getDocs,
  onSnapshot,
  doc
} from "firebase/firestore";
import axios, { AxiosError } from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { BadgeCheckIcon, ExclamationIcon } from "@heroicons/react/outline";
// @ts-expect-error
import McText from "mctext-react";

type MarketItem = {
  base64: string;
  price: number;
  seller: string;
  id: string;
  lore: string[];
  enchants: string[];
};

export const signOutEvent = new EventEmitter();

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<MarketItem[]>();

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [item, setItem] = useState<MarketItem>();
  const [mainButtonJSX, setMainButtonJSX] = useState<JSX.Element>();
  const [diamonds, setDiamonds] = useState(0);

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

        onSnapshot(doc(fstore, "users", user.uid), (snapshot) => {
          return setDiamonds(snapshot.data()?.diamonds ?? 0);
        });

        const unsub = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              setItems(
                await getDocs(q).then((docs) =>
                  docs.docs.map((doc) => {
                    const data = doc.data();
                    return {
                      base64: data.base64,
                      price: data.price,
                      seller: data.seller,
                      id: doc.id,
                      lore: data.lore,
                      enchants: data.enchants
                    };
                  })
                )
              );
              setLoading(false);
            } else if (change.type === "removed") {
              setItems((items) =>
                items!.filter((item) => item.id !== change.doc.id)
              );
            }
          });
        });
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
        <meta name="title" content="TSMP Market" />
        <meta
          name="description"
          content="Buy & Auction Items on the TSMP Market."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tristansmp.com/stats" />
        <meta property="og:title" content="TSMP Market" />
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
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <BadgeCheckIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Checkout
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-blue-600">
                            Are you sure you want to buy this item?{" "}
                            <span className="text-red-600 font-bold">
                              This action cannot be undone.{" "}
                            </span>
                            <span className="text-blue-600">
                              You will be charged {item ? item.price : "error"}{" "}
                              diamonds.
                            </span>
                            <br />
                            <br />
                            <span className="text-blue-600 font-bold text-2xl">
                              Lore:
                            </span>
                            {item
                              ? item.lore.map((lore) => (
                                  <>
                                    <br />
                                    <span
                                      key={lore}
                                      className="text-gray-600 text-2xl"
                                    >
                                      <McText>{lore}</McText>
                                    </span>
                                  </>
                                ))
                              : null}
                            <br />
                            <span className="text-purple-600 font-bold text-2xl">
                              Enchants:
                            </span>
                            {item
                              ? item.enchants.map((enchant) => (
                                  <>
                                    <br />
                                    <span
                                      key={enchant}
                                      className="text-2xl text-purple-600"
                                    >
                                      {enchant}
                                    </span>
                                  </>
                                ))
                              : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setMainButtonJSX(
                          <>
                            <div className="flex flex-col items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blurple drop-shadow-2xl" />
                            </div>
                          </>
                        );
                        firebaseAuth
                          .getAuth()
                          .currentUser!.getIdToken(true)
                          .then((idToken) => {
                            axios
                              .post(
                                `https://us-central1-tristan-smp.cloudfunctions.net/api/market/buy/${
                                  item ? item.id : "error"
                                }?auth=${idToken}`,
                                //`http://localhost:5001/tristan-smp/us-central1/api/market/buy/${item.id}?auth=${idToken}`,
                                {
                                  headers: {
                                    "Content-Type": "application/json"
                                  }
                                }
                              )
                              .then((res) => {
                                console.log(res.data.message);
                                if (res.data.message == "Item bought") {
                                  setMainButtonJSX(
                                    <>
                                      Item Bought! <br />
                                      Type <code>/deliver</code> in-game to get
                                      your current pending item/items.
                                    </>
                                  );
                                } else {
                                  setMainButtonJSX(
                                    <>{res.data.message ?? "Error"}</>
                                  );
                                }
                              })
                              .catch((err: AxiosError) => {
                                console.log(err.response?.data.error);
                                setMainButtonJSX(
                                  <>{err.response?.data.error ?? "Error"}</>
                                );
                              });
                          });
                      }}
                    >
                      {mainButtonJSX}
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <span className="text-4xl font-bold text-white">
          Welcome to the TSMP Market {user.displayName}
          <span className="font-normal">🛍️</span>
          You have {diamonds} diamonds.
        </span>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items!.map((item) => (
            <div key={item.base64} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Item
                  className="w-2/4 h-2/4 object-center object-cover lg:w-full lg:h-full bg-purple-300"
                  id={`minecraft:${item.base64.split(" 😎 ")[1].toLowerCase()}`}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white font-semibold">
                    <a
                      onClick={() => {
                        setItem(item);
                        setMainButtonJSX(<>Buy!</>);
                        setOpen(true);
                      }}
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.base64.split(" 😎 ")[1].replace("_", " ")}
                    </a>
                    <br />
                    {item.lore
                      ? item.lore.map((lore) => (
                          <span key={lore} className="text-sm text-gray-600">
                            <McText>{lore}</McText>
                          </span>
                        ))
                      : null}
                    {item.enchants
                      ? item.enchants.map((enchant) => (
                          <>
                            <br />
                            <span
                              key={enchant}
                              className="text-sm text-purple-600"
                            >
                              {enchant}
                            </span>
                          </>
                        ))
                      : null}
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
