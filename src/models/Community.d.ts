import type { GeneralNews, GeneralVideo } from "./General Awarness";

interface UserInfo {
  author: string;
  email: string;
}

export interface CommunityVideo extends UserInfo, GeneralVideo {}

export interface CommunityArticle extends UserInfo, GeneralNews {}
