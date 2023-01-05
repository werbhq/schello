import type { MapData } from "./MapData";

export interface Report {
  dateIncident: string | undefined;
  timeFrom: string | undefined;
  timeTo: string | undefined;
  category:
    | "USAGE_SUSPECTED"
    | "USAGE_CONFIRMED"
    | "TRADING_SUSPECTED"
    | "TRADING_CONFIRMED";
  description: string;
  image: string | null;
  location: MapData;
}
