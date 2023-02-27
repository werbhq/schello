import { baseApi, fireStore } from ".";
import { Report } from "../types/Report";
import { Timestamp, collection, getDocs } from "firebase/firestore";

export const firebaseToDate = (date: Timestamp) => date.toDate().toISOString();

export const addReport = async (data: Report) => {
  await baseApi.post("/report", data);
};

export const getEncryptedReports = async () => {
  const reports = collection(fireStore, "reports");
  const reportsSnapshot = await getDocs(reports);
  const report = reportsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      dateIncident: firebaseToDate(data.dateIncident),
      timeFrom: firebaseToDate(data.timeFrom),
      timeTo: firebaseToDate(data.timeTo),
    };
  });
  return report as Report[];
};
