import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACYiTseI4sGGmOo4hmENrcPGTtUOPj1qM",
  authDomain: "pulsar-fb2aa.firebaseapp.com",
  databaseURL: "https://pulsar-fb2aa.firebaseio.com",
  projectId: "pulsar-fb2aa",
  storageBucket: "pulsar-fb2aa.appspot.com",
  messagingSenderId: "366397027551",
  appId: "1:366397027551:web:db0ddcd5116e44f510a56a",
  measurementId: "G-X5K9M0Z0JY"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  //if no user in the database create one!
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
