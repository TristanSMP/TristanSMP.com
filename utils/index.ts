import * as firebase from '@firebase/app'
import * as firebaseAuth from '@firebase/auth'
import * as firestore from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAGMqRVyUSvGeX_cTE8hBGFfj212mTF_qE',
  authDomain: 'tristan-smp.firebaseapp.com',
  projectId: 'tristan-smp',
  storageBucket: 'tristan-smp.appspot.com',
  messagingSenderId: '26455848806',
  appId: '1:26455848806:web:3a53445f7755225f00baa7',
  measurementId: 'G-MM3LQPVXX7'
}
if (!firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig)
}

const fauth = firebaseAuth.getAuth()

export { firebase, fauth, firestore, firebaseAuth }
