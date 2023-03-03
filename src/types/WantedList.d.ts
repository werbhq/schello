import { FacialData } from "./Report";

export interface WantedList {
  name: string;
  age: number;
  photoUrl: string;
  photoId: string; // Bucket path. Only for internal use
  facialData: FacialData;
  reports: string[];
}
