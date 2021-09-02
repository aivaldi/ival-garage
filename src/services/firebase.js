// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB2waAIKj_jE18bMQtelwxPW02VEDPSls",
  authDomain: "chat-36853.firebaseapp.com",
  projectId: "chat-36853",
  storageBucket: "chat-36853.appspot.com",
  messagingSenderId: "849118841667",
  appId: "1:849118841667:web:63a2c9f27ecc84ba56fdf6",
  measurementId: "G-9SK2V2J1J2"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();