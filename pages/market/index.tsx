import { User } from "@firebase/auth";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  CheckBadgeIcon,
  ChevronDownIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";
import axios, { AxiosError } from "axios";
import { EventEmitter } from "fbemitter";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where
} from "firebase/firestore";
// @ts-expect-error
import McText from "mctext-react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { Item } from "../../components/Item";
import { MarketsPage } from "../../components/MarketsPage";
import { fauth, firebaseAuth, firestore } from "../../utils";
const fstore = firestore.getFirestore();

type MarketItem = {
  base64: string;
  price: number;
  seller: string;
  id: string;
  lore: string[];
  enchants: string[];
  customName: string;
  amount: number | null;
  username: string | null;
  insideshulker: string[] | null;
};

export const signOutEvent = new EventEmitter();

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<MarketItem[]>();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [item, setItem] = useState<MarketItem>();
  const [mainButtonJSX, setMainButtonJSX] = useState<JSX.Element>();
  const [withdrawButtonJSX, setWithdrawButtonJSX] = useState<JSX.Element>(
    <>Withdraw Diamonds</>
  );
  const [diamonds, setDiamonds] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortOptions, setSortOptions] = useState([
    { name: "Price: Low to High" },
    { name: "Price: High to Low" }
  ]);

  const [currentSort, setCurrentSort] = useState("Price: Low to High");

  const [searchLoading, setSearchLoading] = useState(false);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    fauth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setSearchLoading(true);

        const afterDocRef = router.query.startAfter
          ? await getDoc(
              // @ts-ignore
              doc(fstore, "market", router.query.startAfter)
            )
          : null;

        let q = query(collection(fstore, "market"), limit(33));

        if (afterDocRef) {
          q = query(
            collection(fstore, "market"),
            limit(33),
            startAfter(afterDocRef)
          );
        }

        if (search != "") {
          q = query(
            collection(fstore, "market"),
            limit(45),
            orderBy("customName", "asc"),
            where("customName", ">=", search),
            where("customName", "<=", search + "\uf8ff")
          );
        }

        if (search != "" && afterDocRef) {
          q = query(
            collection(fstore, "market"),
            limit(35),
            orderBy("customName", "asc"),
            startAfter(afterDocRef),
            where("customName", ">=", search),
            where("customName", "<=", search + "\uf8ff")
          );
        }

        onSnapshot(doc(fstore, "users", user.uid), (snapshot) => {
          setWithdrawButtonJSX(<>Withdraw Diamonds</>);
          return setDiamonds(snapshot.data()?.diamonds ?? 0);
        });

        const unsub = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              setItems(
                await getDocs(q).then((docs) =>
                  docs.docs
                    .map((doc) => {
                      const data = doc.data();
                      return {
                        base64: data.base64,
                        price: data.price,
                        seller: data.seller,
                        id: doc.id,
                        lore: data.lore,
                        enchants: data.enchants,
                        customName: data.customName,
                        amount: data.amount,
                        username: data.username,
                        insideshulker: data.insideshulker
                      };
                    })
                    .sort((a, b) => {
                      if (currentSort === "Price: Low to High") {
                        return a.price - b.price;
                      } else {
                        return b.price - a.price;
                      }
                    })
                )
              );

              setLoading(false);
              setSearchLoading(false);
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
  }, [router.isReady, search, currentSort]);

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
        <meta property="og:url" content="https://tristansmp.com/markets" />
        <meta property="og:title" content="TSMP Market" />
        <meta
          property="og:description"
          content="Buy & Auction Items on the TSMP Market."
        />
        <meta property="og:image" content={""} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tristansmp.com/markets" />
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
                        <CheckBadgeIcon
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
                            {item?.lore ? (
                              <span className="text-blue-600 font-bold text-2xl">
                                Lore:
                              </span>
                            ) : null}
                            {item?.lore ? (
                              <>
                                {item.lore.map((lore) => (
                                  <>
                                    <br />
                                    <span
                                      key={lore}
                                      className="text-gray-600 text-2xl"
                                    >
                                      <McText>{lore}</McText>
                                    </span>
                                  </>
                                ))}
                                <br />
                              </>
                            ) : null}
                            {item?.enchants.length === 0 ? null : (
                              <span className="text-purple-600 font-bold text-2xl">
                                Enchants:
                              </span>
                            )}
                            {item?.enchants ? (
                              <>
                                {item.enchants.map((enchant) => (
                                  <>
                                    <br />
                                    <span
                                      key={enchant}
                                      className="text-2xl text-purple-600"
                                    >
                                      {enchant.replaceAll("_", " ")}
                                    </span>
                                  </>
                                ))}
                                <br />
                              </>
                            ) : null}
                            {item?.insideshulker ? (
                              <span className="text-blue-600 font-bold text-2xl">
                                Inside of shulker:
                              </span>
                            ) : null}
                            {item?.insideshulker
                              ? item.insideshulker.map((inside) => (
                                  <>
                                    <br />
                                    <span
                                      key={inside}
                                      className="text-blue-600 text-2xl"
                                    >
                                      {inside.replaceAll("_", " ")}
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
                                      Item Bought! Type /deliver in-game to get
                                      your diamonds!
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
                    <span className="text-sm text-gray-400 text-center p-2">
                      iid: {item?.id}
                    </span>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <span className="text-4xl font-bold text-white">
          Welcome to the TSMP Market {user.displayName}
          <span className="font-normal">🛍️</span>
          <br />
          You have {diamonds} diamonds. <br />
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {
              setWithdrawButtonJSX(
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
                      `https://us-central1-tristan-smp.cloudfunctions.net/api/market/withdraw?auth=${idToken}`,
                      {
                        headers: {
                          "Content-Type": "application/json"
                        }
                      }
                    )
                    .then((res) => {
                      console.log(res.data.message);
                      if (res.data.message == "Withdrawal successful") {
                        setWithdrawButtonJSX(
                          <>
                            Withdrawal successful! Type /deliver in-game to get
                            your diamonds!
                          </>
                        );
                      } else {
                        setWithdrawButtonJSX(
                          <>{res.data.message ?? "Error"}</>
                        );
                      }
                    })
                    .catch((err: AxiosError) => {
                      console.log(err.response?.data.error);
                      setWithdrawButtonJSX(
                        <>{err.response?.data.error ?? "Error"}</>
                      );
                    });
                });
            }}
          >
            {withdrawButtonJSX}
          </button>
          <Link href="/info/markets">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Deposit Diamonds
            </button>
          </Link>
          <Link href="/info/markets">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              What is this?
            </button>
          </Link>
        </span>
        <br />
        <input
          type="search"
          placeholder="What are you looking for today?"
          id="search"
          className="p-2 mx-2 mt-6 w-96 bg-white text-black rounded-md placeholder-gray-600"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <br />
        <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
          <Tooltip title="Queried Items only! If you have no search set then we will pick 30-33 random items and display them to you with your current sort">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              {`${currentSort ?? "Unknown Sort"} - ${items?.length ?? 0} items`}
              <InformationCircleIcon className="inline w-5 h-5 ml-4" />
            </h1>
          </Tooltip>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white hover:text-blue-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1 cursor-pointer">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              setCurrentSort(option.name);
                            }}
                            className={classNames(
                              currentSort
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!searchLoading ? (
            items!.map((item) => (
              <div
                key={
                  item.base64 + (Math.random() + 1).toString(36).substring(7)
                }
                className="group relative"
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <Item
                    className="w-2/4 h-2/4 object-center object-cover lg:w-full lg:h-full bg-purple-300"
                    id={`minecraft:${item.base64
                      .split(" 😎 ")[1]
                      .toLowerCase()}`}
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
                        {item.customName.startsWith("TextComponentImpl")
                          ? `${
                              item.amount
                                ? `${item.amount} x ${
                                    item.customName.split('"')[1]
                                  }`
                                : `Unknown Amount x ${
                                    item.customName.split('"')[1]
                                  }`
                            }`
                          : `
                          ${
                            item.amount
                              ? `${item.amount} x ${item.customName.replaceAll(
                                  "_",
                                  " "
                                )}`
                              : `Unknown Amount x ${item.base64.replaceAll(
                                  "_",
                                  " "
                                )}`
                          }
                          
                          `}
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
                    <span className="text-sm font-bold text-blue-400">
                      {item.price} Diamonds <br />
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                      Sold by {item.username ?? "*before we logged usernames*"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blurple drop-shadow-2xl" />
          )}
        </div>
        <br />
        <button
          type="button"
          onClick={() => {
            const lastItem = items?.[items.length - 1];
            if (lastItem) {
              window.location.href = `/market?startAfter=${lastItem.id}`;
            }
          }}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Next Page
        </button>
        <br />
        Textures Mapped by{" "}
        <Link href="https://www.npmjs.com/package/minecraft-textures">
          <a>Destruc7i0n</a>
        </Link>
        <br />
        The item icons are owned by Mojang Studios. This project is not
        affiliated with Mojang Studios.
      </section>
    </>
  ) : (
    <MarketsPage />
  );
};

export default Home;
