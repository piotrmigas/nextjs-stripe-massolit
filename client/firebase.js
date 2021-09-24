import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC1IOmT2rD2_3eBQ8RfxH7UAgcUANgWBHE",
    authDomain: "massolit-58e82.firebaseapp.com",
    projectId: "massolit-58e82",
    storageBucket: "massolit-58e82.appspot.com",
    messagingSenderId: "790916665710",
    appId: "1:790916665710:web:afa5b99649086c4d53717f",
  });
}

export const db = firebase.firestore();
export const auth = firebase.auth();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = db.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
