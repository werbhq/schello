import { collection, query, where, getDocs } from "firebase/firestore";
import { fireStore, processSnapshot } from ".";
import { MAPPING } from "./mapping";
import { GeneralNews, GeneralVideo } from "types/General Awarness";
import { sortByTimeStamp } from "util/TimeStamp";

export const getGeneralVideos = async () => {
  const videoRef = collection(fireStore, MAPPING.GENERAL.VIDEO);
  const videoQuery = query(videoRef, where("visible", "==", true));
  const videoSnapshot = await getDocs(videoQuery);
  const data = processSnapshot(videoSnapshot);
  return data as GeneralVideo[];
};

export const getGeneralNews = async () => {
  const newsRef = collection(fireStore, MAPPING.GENERAL.NEWS);
  const newsQuery = query(newsRef, where("visible", "==", true));
  const newsSnapshot = await getDocs(newsQuery);
  const newsData = processSnapshot(newsSnapshot);

  const googleNewsRef = collection(fireStore, MAPPING.GENERAL.GOOGLE_NEWS);
  const googleNewsQuery = query(googleNewsRef, where("visible", "==", true));
  const googleNewsSnapshot = await getDocs(googleNewsQuery);
  const googleNewsData = processSnapshot(googleNewsSnapshot);

  const data = [...newsData, ...googleNewsData];
  return data.sort(sortByTimeStamp) as GeneralNews[];
};
