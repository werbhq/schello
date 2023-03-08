import { MAPPING } from "api/mapping";
import { useQuery } from "react-query";
import { getWantedList } from "api/wanted_list";

export const useWantedData = () => {
  return useQuery(MAPPING.WANTED_LIST, getWantedList);
};
