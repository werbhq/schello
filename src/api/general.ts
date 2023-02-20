import { collection, getDocs } from "firebase/firestore";
import { fireStore, processSnapshot } from ".";
import { CommunityArticle, CommunityVideo } from "../models/Community";
import { MAPPING } from "./mapping";

export const getGeneralVideos = async () => {
  const videoRef = collection(fireStore, MAPPING.EXCISE.VIDEO);
  const snapshot = await getDocs(videoRef);
  const data = processSnapshot(snapshot);
  return data as CommunityVideo[];
};

export const getGeneralNews = async () => {
  const newsRef = collection(fireStore, MAPPING.EXCISE.NEWS);
  const snapshot = await getDocs(newsRef);
  const data = processSnapshot(snapshot);
  return data as CommunityArticle[];
};
