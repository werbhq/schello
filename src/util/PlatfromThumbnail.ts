import { PlatFormOptions } from "../models/General Awarness";

export class PlatFormThumbnailExtractor {
  url: string = "";
  platform: PlatFormOptions = "YOUTUBE";
  thumbnailUrl: string = "";

  constructor(url: string, platform: PlatFormOptions) {
    this.url = url;
    this.platform = platform;

    if (this.platform === "YOUTUBE") {
      const id = this.url
        .replace("https://www.youtube.com/watch?v=", "")
        .replace("https://youtu.be/", "");

      this.thumbnailUrl = `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
    } else if (this.platform === "GOOGLE-DRIVE") {
      const id = this.url
        .replace("https://drive.google.com/file/d/", "")
        .replace(/\/[^/].*/g, "");
      this.thumbnailUrl = `https://drive.google.com/thumbnail?id=${id}`;
    } else if (this.platform === "DAILY-MOTION") {
      const id = this.url
        .replace("https://www.dailymotion.com/video/", "")
        .replace(/\?.*/g, "");
      this.thumbnailUrl = `https://www.dailymotion.com/thumbnail/video/${id}`;
    }
  }

  getThumbnailUrl() {
    return this.thumbnailUrl;
  }
}
