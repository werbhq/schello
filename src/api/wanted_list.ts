import { MAPPING } from "./mapping";
import { fireStore, processSnapshot } from ".";
import { collection, getDocs } from "firebase/firestore";
import { WantedList } from "types/WantedList";
import { FacialData } from "types/Report";

export interface WantedListCustom extends WantedList, FacialData {
  id: string;
}

export const getWantedList = async () => {
  const ref = collection(fireStore, MAPPING.WANTED_LIST);
  const snapshot = await getDocs(ref);
  const data = processSnapshot(snapshot, true);
  const tableParsedData = data.map((e, index) => ({
    ...e,
    ...e.facialData,
    key: index,
  }));

  return tableParsedData;
};
