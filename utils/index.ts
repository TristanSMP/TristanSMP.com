import * as firebase from "@firebase/app";
import * as firebaseAuth from "@firebase/auth";
import * as firestore from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGMqRVyUSvGeX_cTE8hBGFfj212mTF_qE",
  authDomain: "tristan-smp.firebaseapp.com",
  projectId: "tristan-smp",
  storageBucket: "tristan-smp.appspot.com",
  messagingSenderId: "26455848806",
  appId: "1:26455848806:web:3a53445f7755225f00baa7",
  measurementId: "G-MM3LQPVXX7"
};
if (!firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig);
}

const fauth = firebaseAuth.getAuth();

// Credit for idToBinary goes to discord.js
// https://github.com/discordjs/discord.js/blob/5ec04e077bbbb9799f3ef135cade84b77346ef20/src/util/SnowflakeUtil.js#62

function getTimestamp(snowflake: string) {
  const BINARY = idToBinary(snowflake).toString().padStart(64, "0");

  return parseInt(BINARY.substring(0, 42), 2) + 1_420_070_400_000;
}

function idToBinary(num: string) {
  let bin = "";
  let high = parseInt(num.slice(0, -10)) || 0;
  let low = parseInt(num.slice(-10));
  while (low > 0 || high > 0) {
    bin = String(low & 1) + bin;
    low = Math.floor(low / 2);
    if (high > 0) {
      low += 5_000_000_000 * (high % 2);
      high = Math.floor(high / 2);
    }
  }
  return bin;
}

export { firebase, fauth, firestore, firebaseAuth, getTimestamp };
