import { Timestamp } from "firebase/firestore";

export const convertTimeStamp = (e: any) => {
  const data: { [index: string]: any } = {};
  Object.keys(e).forEach((k) => {
    if (e[k] instanceof Timestamp) data[k] = e[k].toDate().toISOString();
    else data[k] = e[k];
  });
  return data;
};
