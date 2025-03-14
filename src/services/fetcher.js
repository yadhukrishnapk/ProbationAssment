import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL 
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Client-id": "7645129791",  // Default (qa-en)
    "Secret-key": "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
    "Content-Type": "application/json",
  },
});
export const updateHeaders = (indexName) => {
  const headers = {
    "qa-en": {
      "Client-id": "7645129791",
      "Secret-key": "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
    },
    "qa-ar": {
      "Client-id": "5807942863",
      "Secret-key": "Llz5MR37gZ4gJULMwf762w1lQ13Iro",
    },
  };

  if (headers[indexName]) {
    axiosInstance.defaults.headers["Client-id"] = headers[indexName]["Client-id"];
    axiosInstance.defaults.headers["Secret-key"] = headers[indexName]["Secret-key"];
  }
};

const fetcher = (url, options) =>
  axiosInstance.post(url, options).then((res) => res.data);

export default fetcher;
