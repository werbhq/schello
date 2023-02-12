import { collection, getDocs } from "firebase/firestore";
import { fireStore } from ".";
import { Event } from "../models/General Awarness";

export const getEvents = async () => {
  const event = collection(fireStore, "events");
  const eventsSnapshot = await getDocs(event);
  const events = eventsSnapshot.docs.map((doc) => doc.data());
  return events as Event[];
};
