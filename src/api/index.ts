import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const prod = "https://us-central1-merit-werb.cloudfunctions.net/serverCall";
const dev = "http://localhost:5001/merit-werb/us-central1/serverCall";
const firebaseConfig = {
  apiKey: "AIzaSyCsV-3C_U3ksRXdsZorW9RXy7PifGTR52w",
  authDomain: "merit-werb.firebaseapp.com",
  projectId: "merit-werb",
  storageBucket: "merit-werb.appspot.com",
  messagingSenderId: "1023193104645",
  appId: "1:1023193104645:web:c569ccf902442e2402f76c",
  measurementId: "G-GHVRHTZN0E",
};

export const baseApi = axios.create({
  baseURL: dev,
  headers: {},
});

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
