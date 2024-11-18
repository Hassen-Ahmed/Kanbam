import axios from "axios";
import { useEffect } from "react";

export default function useKanbamApiClient() {
  const kanbamApi = axios.create({
    baseURL: `${import.meta.env.VITE_KANBAM_API_URL}`,
    withCredentials: true,
  });

  useEffect(() => {
    const requestInterceptor = kanbamApi.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = kanbamApi.interceptors.response.use(
      function (res) {
        return res;
      },

      function (error) {
        console.log("Unauthorized. Redirecting to login...");

        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    );

    return () => {
      kanbamApi.interceptors.request.eject(requestInterceptor);
      kanbamApi.interceptors.response.eject(responseInterceptor);
    };
  }, [kanbamApi.interceptors.request, kanbamApi.interceptors.response]);

  return kanbamApi;
}
