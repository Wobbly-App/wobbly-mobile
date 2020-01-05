import axios from "axios";
import asyncStorageService from "../services/asyncStorageService";
import Constants from "expo-constants";

axios.defaults.baseURL = Constants.manifest.extra.baseUrl;

axios.interceptors.request.use(
  async config => {
    const token = await asyncStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  async function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("/auth/token", {
          refresh_token: await asyncStorageService.getRefreshToken()
        })
        .then(async res => {
          if (res.status === 201) {
            // 1) put token to AsyncStorage
            await asyncStorageService.setToken(res.data);

            // 2) Change Authorization header
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + (await asyncStorageService.getAccessToken());

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        });
    }
    // return Error object with Promise
    return Promise.reject(error);
  }
);
