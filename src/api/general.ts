import { collection, getDocs } from "firebase/firestore";
import { fireStore } from ".";
import { GeneralNews, GeneralVideo } from "../models/General Awarness";
import { MAPPING } from "./mapping";

export const getGeneralVideos = async () => {
  const videoRef = collection(fireStore, MAPPING.EXCISE.VIDEO);
  const snapshot = await getDocs(videoRef);
  const data = snapshot.docs.map((doc) => doc.data()).filter((e) => e.visible);
  return data as GeneralVideo[];
};

export const getGeneralNews = async () => {
  const newsRef = collection(fireStore, MAPPING.EXCISE.NEWS);
  const snapshot = await getDocs(newsRef);
  const data = snapshot.docs.map((doc) => doc.data()).filter((e) => e.visible);
  return data as GeneralNews[];
};
