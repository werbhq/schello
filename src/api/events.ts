import { collection, getDocs } from "firebase/firestore";
import { fireStore, processSnapshot } from ".";
import { Event } from "../types/General Awarness";
import { MAPPING } from "./mapping";

export const getEvents = async () => {
  const ref = collection(fireStore, MAPPING.EVENTS);
  const snapshot = await getDocs(ref);
  const data = processSnapshot(snapshot);
  return data as Event[];
};
