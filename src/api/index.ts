import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  DocumentData,
  QuerySnapshot,
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { convertTimeStamp } from "util/TimeStamp";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-merit-werb.cloudfunctions.net/api"
    : "http://localhost:5001/merit-werb/us-central1/api";

const firebaseConfig = {
  apiKey: "AIzaSyCsV-3C_U3ksRXdsZorW9RXy7PifGTR52w",
  authDomain: "merit-werb.firebaseapp.com",
  projectId: "merit-werb",
  storageBucket: "merit-werb.appspot.com",
  messagingSenderId: "1023193104645",
  appId: "1:1023193104645:web:c569ccf902442e2402f76c",
  measurementId: "G-GHVRHTZN0E",
};

const emulate = false;

export const baseApi = axios.create({
  baseURL,
  headers: {},
});

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
if (emulate) connectFirestoreEmulator(fireStore, "localhost", 8090);

export const processSnapshot = (
  e: QuerySnapshot<DocumentData>,
  disableFilterVisible: boolean = false
) => {
  const data = e.docs.map((doc) => doc.data()).map(convertTimeStamp);
  if (disableFilterVisible) return data;
  return data.filter((e) => e.visible);
};
