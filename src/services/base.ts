import { API_CONFIG } from "@/constants/ApiConfig";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

// create an axios instance
const service = axios.create({
  baseURL: API_CONFIG.VUE_APP_API_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: API_CONFIG.API_TIMEOUT, // request timeout,
});
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (respone) => respone.data,
  (error) => handleError(error)
);

const handleError = async (error: AxiosError) => {
  console.log(error)
};

export { service };
