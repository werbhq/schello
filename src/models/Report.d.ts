import type { MapData } from "./MapData";

export interface FacialData {
  hairType: "STRAIGHT" | "WAVY" | "CURLY" | "KINKY";
  skinColor: "FAIR" | "OLIVE" | "BROWN" | "LIGHT-BROWN" | "DARK-BROWN";
  gender: "MALE" | "FEMALE";
  eyeColor: "BLACK" | "BLUE" | "GREEN" | "SILVER" | "BROWN";
  faceShape:
    | "DIAMOND"
    | "OVAL"
    | "INVERTED_TRIANGLE"
    | "SQUARE"
    | "TRIANGLE"
    | "ROUND";
}
export interface Report {
  dateIncident: string | null;
  timeFrom: string | null;
  timeTo: string | null;
  category:
    | "USAGE_SUSPECTED"
    | "USAGE_CONFIRMED"
    | "TRADING_SUSPECTED"
    | "TRADING_CONFIRMED";
  description: string;
  location: MapData;
  studentId: string | null;
  status: "NEW" | "IN-PROGRESS" | "DONE" | "SPAM";
  facialData: FacialData | null;
}
