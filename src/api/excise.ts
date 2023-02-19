import { collection, getDocs } from "firebase/firestore";
import { fireStore } from ".";
import { GeneralNews, GeneralVideo } from "../models/General Awarness";
import { MAPPING } from "./mapping";

export const getExciseVideos = async () => {
  const videoRef = collection(fireStore, MAPPING.EXCISE.VIDEO);
  const snapshot = await getDocs(videoRef);
  const data = snapshot.docs.map((doc) => doc.data());
  return data as GeneralVideo[];
};

export const getExciseNews = async () => {
  const newsRef = collection(fireStore, MAPPING.EXCISE.NEWS);
  const snapshot = await getDocs(newsRef);
  const data = snapshot.docs.map((doc) => doc.data());
  return data as GeneralNews[];
};
