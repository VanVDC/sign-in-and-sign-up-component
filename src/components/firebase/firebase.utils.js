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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//create user profile in database

export const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      userRef.set({
        displayName,
        email,
        createdAt,
        ...otherData
      });
    } catch (error) {
      console.log("Eorror setting user profile", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
