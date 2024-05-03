import { jwtDecode } from "jwt-decode";

export const isTokenAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000; // in second

    if ((decodedToken.exp as number) < currentTime) {
      return false;
    }

    return true;
  }

  return false;
};
