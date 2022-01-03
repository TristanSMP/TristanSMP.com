import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import React, { useState } from "react";
import { fauth, firebaseAuth, firestore } from "../../utils";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="container py-32 mx-auto text-center sm:px-4">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <div className="flex flex-col items-center justify-center p-5">
          <input
            type="text"
            placeholder="Email"
            className="border-2 border-gray-400 rounded-lg py-2 px-4 mb-4 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border-2 border-gray-400 rounded-lg py-2 px-4 mb-4 text-black"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={onLoginPress}
        >
          Log in
        </button>
      </div>
    </>
  );
};

export default Login;
