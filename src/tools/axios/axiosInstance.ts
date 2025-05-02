import axios from "axios";
import { getServerUrl } from "../../utils/serverUrls";

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;

const baseUrl = getServerUrl();
export const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    timeout: ONE_MINUTE,
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.replace(/"/g, '')}`;
    }
    const rawTenantId = localStorage.getItem("X-Tenant-ID");
    const tenantId = rawTenantId?.replace(/^"|"$/g, ''); // remove leading/trailing quotes

    config.headers["X-Tenant-ID"] = tenantId;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
