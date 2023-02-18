import { collection, Timestamp, addDoc } from "firebase/firestore";
import { fireStore } from ".";
import { CommunityVideo, CommunityArticle } from "../models/Community";
import { MAPPING } from "./mapping";

type CommunityForm = Omit<
  CommunityVideo & CommunityArticle,
  "id" | "timestamp" | "visible"
>;

export const addCommunityForm = async (
  data: CommunityForm & { type: "VIDEO" | "ARTICLE" }
) => {
  const communityRef = collection(
    fireStore,
    data.type === "ARTICLE"
      ? MAPPING.COMMUNITY.ARTICLE
      : MAPPING.COMMUNITY.VIDEO
  );

  const refinedData =
    data.type === "ARTICLE"
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
        };

  await addDoc(communityRef, {
    ...refinedData,
    visible: false,
    timestamp: Timestamp.fromDate(new Date()),
  });
};
