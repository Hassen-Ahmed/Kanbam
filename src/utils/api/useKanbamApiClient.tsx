import { useEffect } from "react";
import axios from "axios";
import { useAppDispath, useAppSelector } from "../../features/hooks";
import { setAsscessToken } from "../../features/slices/authSlice";

export default function useKanbamApiClient() {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatchRdx = useAppDispath();

  const kanbamApi = axios.create({
    baseURL: `${import.meta.env.VITE_KANBAM_API_URL}`,
    withCredentials: true,
  });

  useEffect(() => {
    const requestInterceptor = kanbamApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = kanbamApi.interceptors.response.use(
      (res) => res,

      async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;

          try {
            const { data } = await kanbamApi.post<{ accessToken: string }>(
              "/auth/RefreshToken"
            );

            dispatchRdx(setAsscessToken(data.accessToken));

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            return kanbamApi(originalRequest);
            //
          } catch (error) {
            window.location.href = "/auth/login";
            await kanbamApi.post("/auth/RevokeRefreshToken");

            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      kanbamApi.interceptors.request.eject(requestInterceptor);
      kanbamApi.interceptors.response.eject(responseInterceptor);
    };
  }, [kanbamApi, accessToken, dispatchRdx]);

  return kanbamApi;
}
