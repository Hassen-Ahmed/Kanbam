import axios from "axios";

const kanbamApi = axios.create({
  baseURL: `${import.meta.env.VITE_KANBAM_API_URL}`,
  withCredentials: true,
});

export default kanbamApi;
