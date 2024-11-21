import { jwtDecode } from "jwt-decode";

export const isTokenAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000; // in second

    if ((decodedToken.exp as number) < currentTime) {
      return false;
    }

    return true;
  }

  return false;
};
