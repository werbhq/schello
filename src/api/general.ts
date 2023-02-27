import { collection, getDocs } from "firebase/firestore";
import { fireStore, processSnapshot } from ".";
import { MAPPING } from "./mapping";
import { GeneralNews, GeneralVideo } from "../types/General Awarness";

export const getGeneralVideos = async () => {
  const videoRef = collection(fireStore, MAPPING.GENERAL.VIDEO);
  const snapshot = await getDocs(videoRef);
  const data = processSnapshot(snapshot);
  return data as GeneralVideo[];
};

export const getGeneralNews = async () => {
  const newsRef = collection(fireStore, MAPPING.GENERAL.NEWS);
  const snapshot = await getDocs(newsRef);
  const data = processSnapshot(snapshot);
  return data as GeneralNews[];
};
