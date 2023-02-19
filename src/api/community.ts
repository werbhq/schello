import { collection, Timestamp, addDoc, getDocs } from "firebase/firestore";
import { fireStore } from ".";
import { CommunityVideo, CommunityArticle } from "../models/Community";
import { MAPPING } from "./mapping";

type CommunityForm = Omit<
  CommunityVideo & CommunityArticle,
  "id" | "timestamp" | "visible"
>;

export const addCommunityForm = async (
  data: CommunityForm,
  type: "VIDEO" | "ARTICLE"
) => {
  const communityRef = collection(
    fireStore,
    type === "ARTICLE" ? MAPPING.COMMUNITY.ARTICLE : MAPPING.COMMUNITY.VIDEO
  );

  const refinedData =
    type === "ARTICLE"
      ? {
          title: data.title,
          author: data.author,
          email: data.email,
          description: data.description,
        }
      : {
          title: data.title,
          author: data.author,
          email: data.email,
          description: data.description,
          platform: data.platform,
          url: data.url,
          thumbnail: data.thumbnail,
        };

  await addDoc(communityRef, {
    ...refinedData,
    visible: false,
    timestamp: Timestamp.fromDate(new Date()),
  });
};

export const getCommunityVideos = async () => {
  const videoRef = collection(fireStore, MAPPING.COMMUNITY.VIDEO);
  const snapshot = await getDocs(videoRef);
  const data = snapshot.docs.map((doc) => doc.data());
  return data as CommunityVideo[];
};

export const getCommunityArticle = async () => {
  const newsRef = collection(fireStore, MAPPING.COMMUNITY.ARTICLE);
  const snapshot = await getDocs(newsRef);
  const data = snapshot.docs.map((doc) => doc.data());
  return data as CommunityArticle[];
};
