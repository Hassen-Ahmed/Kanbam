import axios from "axios";
import { useContext, useEffect } from "react";
import { ITokenContext, TokenContext } from "../../context/TokenContext";

export default function useKanbamApiClient() {
  const { tokenInCtx, handleSetAccessToken } = useContext(
    TokenContext
  ) as ITokenContext;

  const kanbamApi = axios.create({
    baseURL: `${import.meta.env.VITE_KANBAM_API_URL}`,
    withCredentials: true,
  });

  useEffect(() => {
    const requestInterceptor = kanbamApi.interceptors.request.use(
      (config) => {
        if (tokenInCtx) {
          config.headers.Authorization = `Bearer ${tokenInCtx}`;
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
            const {
              data: { accessToken },
            } = await kanbamApi.post("/auth/RefreshToken");

            handleSetAccessToken(accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            // This need to wait 100ms after new accessToken setted to TokenContext
            return kanbamApi(originalRequest);
            //
          } catch (error) {
            handleSetAccessToken(null);
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
  }, [
    kanbamApi,
    kanbamApi.interceptors.request,
    kanbamApi.interceptors.response,
    tokenInCtx,
    handleSetAccessToken,
  ]);

  return kanbamApi;
}
