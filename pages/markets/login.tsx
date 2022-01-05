import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import React, { Fragment, useRef, useState } from "react";
import { fauth, firebaseAuth, firestore } from "../../utils";
import { Dialog, Transition } from "@headlessui/react";
import { BadgeCheckIcon, ExclamationIcon } from "@heroicons/react/outline";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const onLoginPress = () => {
    firebaseAuth
      .signInWithEmailAndPassword(fauth, email, password)
      .then(async (response: { user: { uid: any } }) => {
        const uid = response.user.uid;

        window.location.href = `/markets`;
      })
      .catch((error: any) => {
        if (error.code == "auth/user-not-found") {
          alert("User not found");
        } else if (error.code == "auth/wrong-password") {
          alert("Wrong password");
        } else {
          alert("Unknown error");
        }
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[url('/images/signin.png')] bg-cover">
        <div className="p-3 bg-zinc-800 my-44 flex flex-col rounded-xl drop-shadow-2xl">
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
                            In-game signup
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-blue-600">
                              To register for a TSMP account, it is done through
                              game. Join <code>mc.tristansmp.com</code>
                              <br />
                              then type{" "}
                              <code>
                                /tsmpsignup &#60;email&#62; &#60;password&#62;
                              </code>
                              <br />
                              <br />
                              <span className="text-red-600">
                                <strong>
                                  We are not Minecraft, Please Do NOT Use Your
                                  Minecraft Account Details.
                                </strong>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <label className="p-2 font-bold text-white text-3xl text-left">
            Sign-In via your TSMP Account
          </label>
          <input
            type="email"
            placeholder="email"
            id="email"
            className="p-2 mx-2 mt-6 bg-blue-200 text-black rounded-md placeholder-gray-600"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="p-2 mx-2 mt-6 bg-blue-200 text-black rounded-md placeholder-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="p-5 bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={onLoginPress}
          >
            Log in
          </button>
        </div>
        <a
          className="text-white text-center mt-6"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span className="text-sm hover:cursor-pointer hover:underline">
            Don't have an account?{" "}
            <span className="text-blue-500">Sign up</span>
          </span>
        </a>
      </div>
    </>
  );
};

export default Login;
