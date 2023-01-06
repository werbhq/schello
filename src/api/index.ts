import axios from "axios";

// const prod = "https://us-central1-merit-werb.cloudfunctions.net/serverCall";
const dev = "http://localhost:5001/merit-werb/us-central1/serverCall";

export const baseApi = axios.create({
  baseURL: dev,
  headers: {},
});
