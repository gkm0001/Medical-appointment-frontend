import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBCDeGM-rZ7u2AGul1AXOjwrGgBXwkfG-w",
  authDomain: "medical-d2edf.firebaseapp.com",
  projectId: "medical-d2edf",
  storageBucket: "medical-d2edf.appspot.com",
  messagingSenderId: "474288630669",
  appId: "1:474288630669:web:d4cfbd3e793f840df6ebc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();


export const authWithGoogle = async() => {
     
    let user = null;

    await signInWithPopup(auth , provider)
    .then((result) => {
         user = result.user
    })
    .catch((err => {
         console.error("Error authentication with google" , err);
         console.log(err);
    }))

    return user;
}