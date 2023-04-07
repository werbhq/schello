import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

export const convertTimeStamp = (e: any) => {
  const data: { [index: string]: any } = {};
  Object.keys(e).forEach((k) => {
    if (e[k] instanceof Timestamp) data[k] = e[k].toDate().toISOString();
    else data[k] = e[k];
  });
  return data;
};

export const sortByTimeStamp = (a: any, b: any) => {
  if (a["timestamp"] && b["timestamp"]) {
    return dayjs(a["timestamp"]).isBefore(dayjs(b["timestamp"])) ? 1 : -1;
  }
  return 0;
};
