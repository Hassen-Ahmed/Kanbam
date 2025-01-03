import axios from "axios";

export const kanbamApi = axios.create({
  baseURL: `${import.meta.env.VITE_KANBAM_API_URL}`,
  withCredentials: true,
});
