import { collection, getDocs } from "firebase/firestore";
import { fireStore } from ".";
import { Event } from "../models/General Awarness";
import { MAPPING } from "./mapping";

export const getEvents = async () => {
  const ref = collection(fireStore, MAPPING.EVENTS);
  const snapshot = await getDocs(ref);
  const data = snapshot.docs.map((doc) => doc.data());
  return data as Event[];
};
