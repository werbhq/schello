import { baseApi } from ".";
import { Report } from "../models/Report";

export const addReport = async (data: Report) => {
  await baseApi.post("/report", data);
};
