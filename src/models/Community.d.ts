import type { GeneralVideo } from "./General Awarness";

export interface CommunityVideo extends GeneralVideo {
  author: string;
  email: string;
}

export interface CommunityArticle {
  id: string;
  title: string;
  author: string;
  email: string;
  visible: boolean;
  timestamp: string;
  description: string; // HTML
}
