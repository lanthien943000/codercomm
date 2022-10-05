import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.response.use(
  (response) => {
    console.log("reponse", response);
    return response.data;
  },
  function (error) {
    console.log("request error");
    const message = error.response?.data?.errors?.message || "Unknown Error";
    return Promise.reject({ message });
  }
);

apiService.interceptors.request.use(
  (request) => {
    console.log("request", request);
    return request;
  },
  function (error) {
    console.log("request error");
    return Promise.reject(error);
  }
);

export default apiService;
