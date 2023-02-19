export interface Event {
  id: string;
  title: string;
  visible: boolean;
  time_from: string;
  time_to: string;
  date_from: string;
  date_to: string;
  description: string; // HTML
  mode: "VIRTUAL" | "OFFLINE";
  venue: string; // Venue for offline. Meeting link for online
  register_url?: string;
}

export interface GeneralVideo {
  id: string;
  title: string;
  author: "EXCISE";
  visible: boolean;
  timestamp: string;
  description: string; // HTML
  platform: "YOUTUBE" | "DAILY-MOTION" | "GOOGLE-DRIVE" | "REEL";
  url: string;
  thumbnail: string;
}

export type PlatFormOptions = GeneralVideo["platform"];

export interface GeneralNews {
  id: string;
  title: string;
  timestamp: string;
  visible: boolean;

  news_type: "EXTERNAL" | "INTERNAL";

  /*
     news_type == 'EXTERNAL' will have redirect_url. This will simply redirect to that page.
     Eg: a times now article link
    */
  redirect_url?: string;
  description?: string; // HTML . news_type == 'EXTERNAL won't have this
}
