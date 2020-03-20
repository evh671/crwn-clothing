import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCAb0rEyUqrTY3U34R30uKZkCdhptKVnRg",
  authDomain: "crwn-db-a10bc.firebaseapp.com",
  databaseURL: "https://crwn-db-a10bc.firebaseio.com",
  projectId: "crwn-db-a10bc",
  storageBucket: "crwn-db-a10bc.appspot.com",
  messagingSenderId: "251012006512",
  appId: "1:251012006512:web:e5398c4f0748d18b3a6ab5",
  measurementId: "G-RP09C5DPC2"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
