import { PlatFormOptions } from "types/General Awarness";

export class PlatForm {
  static options = ["YOUTUBE", "DAILY-MOTION", "GOOGLE-DRIVE", "REEL"];

  static getThumbnailUrl(url: string, platform: PlatFormOptions) {
    let thumbnailUrl: string = "";

    if (platform === "YOUTUBE") {
      const id = url
        .replace("https://www.youtube.com/watch?v=", "")
        .replace("https://youtu.be/", "");

      thumbnailUrl = `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
    } else if (platform === "GOOGLE-DRIVE") {
      const id = url
        .replace("https://drive.google.com/file/d/", "")
        .replace(/\/[^/].*/g, "");
      thumbnailUrl = `https://drive.google.com/thumbnail?id=${id}`;
    } else if (platform === "DAILY-MOTION") {
      const id = url
        .replace("https://www.dailymotion.com/video/", "")
        .replace(/\?.*/g, "");
      thumbnailUrl = `https://www.dailymotion.com/thumbnail/video/${id}`;
    }

    return thumbnailUrl;
  }
}
