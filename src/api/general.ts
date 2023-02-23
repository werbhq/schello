import { collection, getDocs } from "firebase/firestore";
import { fireStore, processSnapshot } from ".";
import { MAPPING } from "./mapping";
import { GeneralNews, GeneralVideo } from "../models/General Awarness";

export const getGeneralVideos = async () => {
  const videoRef = collection(fireStore, MAPPING.EXCISE.VIDEO);
  const snapshot = await getDocs(videoRef);
  const data = processSnapshot(snapshot);
  return data as GeneralVideo[];
};

export const getGeneralNews = async () => {
  const newsRef = collection(fireStore, MAPPING.EXCISE.NEWS);
  const snapshot = await getDocs(newsRef);
  const data = processSnapshot(snapshot);
  return data as GeneralNews[];
};
