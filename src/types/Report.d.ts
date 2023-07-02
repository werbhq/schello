import type admin from "firebase-admin";
import type { MapData } from "./MapData";

export interface FacialData {
  hairType: "STRAIGHT" | "WAVY" | "CURLY" | "KINKY" | "NONE";
  skinColor: "FAIR" | "OLIVE" | "BROWN" | "LIGHT-BROWN" | "DARK-BROWN" | "NONE";
  gender: "MALE" | "FEMALE" | "NONE";
  eyeColor: "BLACK" | "BLUE" | "GREEN" | "SILVER" | "BROWN" | "NONE";
  faceShape:
    | "DIAMOND"
    | "OVAL"
    | "INVERTED_TRIANGLE"
    | "SQUARE"
    | "TRIANGLE"
    | "ROUND"
    | "NONE";
}

export interface InputReport {
  dateIncident: string | Date;
  timeFrom: string | Date;
  timeTo: string | Date;
  category:
    | "USAGE_SUSPECTED"
    | "USAGE_CONFIRMED"
    | "TRADING_SUSPECTED"
    | "TRADING_CONFIRMED";
  description: string;
  location: MapData | null;
  tenant: string;
  student: null | {
    name: string;
    class: string;
  };
  status: "NEW" | "IN-PROGRESS" | "DONE" | "SPAM" | "ESCALATED";
  facialData: FacialData | null;
}

export interface Report {
  dateIncident: string | Date;
  timeFrom: string | Date;
  timeTo: string | Date;
  category:
    | "USAGE_SUSPECTED"
    | "USAGE_CONFIRMED"
    | "TRADING_SUSPECTED"
    | "TRADING_CONFIRMED";
  description: string;
  location: MapData;
  tenant: string;
  student: null | {
    name: string;
    class: string;
  };
  studentIds: string[];
  studentConfirmed: string | null;
  status: "NEW" | "IN-PROGRESS" | "DONE" | "SPAM" | "ESCALATED";
  facialData: FacialData | null;
  ip: string | null;
}

export interface FirebaseReport {
  dateIncident: admin.firestore.Timestamp;
  timeFrom: admin.firestore.Timestamp;
  timeTo: admin.firestore.Timestamp;
  category:
    | "USAGE_SUSPECTED"
    | "USAGE_CONFIRMED"
    | "TRADING_SUSPECTED"
    | "TRADING_CONFIRMED";
  description: string;
  location: string;
  tenant: string;
  studentIds: [];
  studentConfirmed: string | null;
  status: "NEW" | "IN-PROGRESS" | "DONE" | "SPAM" | "ESCALATED";
  facialData: FacialData | null;
  ip: string | null;
}

export interface IP {
  ip: string;
  studentId: string;
}

export interface BaseStudent {
  id: string;
  classId: string;
  admnNo: string;
  name: string;
  rollNo: number;
}

export interface StudentReport extends BaseStudent {
  blockTill: string | null;
  tenant: string;
  reported: string[];
}
