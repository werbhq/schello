import axios from 'axios';
import { useEmulator } from 'config';
import BASE_URL from 'constant/api';
import firebaseConfig from 'constant/firebase.config';
import { initializeApp } from 'firebase/app';
import {
    DocumentData,
    QuerySnapshot,
    getFirestore,
    connectFirestoreEmulator,
} from 'firebase/firestore';
import { convertTimeStamp, sortByTimeStamp } from 'util/TimeStamp';

export const isProd = process.env.NODE_ENV === 'production';
const baseURL = isProd ? BASE_URL.PROD : useEmulator ? BASE_URL.EMULATOR : BASE_URL.PROD;

export const baseApi = axios.create({
    baseURL,
    headers: {},
});

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
if (useEmulator && !isProd) {
    connectFirestoreEmulator(fireStore, 'localhost', 8090);
}

export const processSnapshot = (
    e: QuerySnapshot<DocumentData>,
    disableFilterVisible: boolean = false
) => {
    const data = e.docs
        .map((doc) => doc.data())
        .map(convertTimeStamp)
        .sort(sortByTimeStamp);
    if (disableFilterVisible) return data;
    return data.filter((e) => e.visible);
};
