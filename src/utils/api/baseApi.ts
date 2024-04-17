import axios from "axios";

export const authorizationToken = `Bearer ${import.meta.env.VITE_TOKEN}`;

export const kanbamApi = axios.create({
  baseURL: `${import.meta.env.VITE_KANBAM_API_URL}`,
});
