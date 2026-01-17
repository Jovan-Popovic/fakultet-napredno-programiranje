import axios, { AxiosError, HttpStatusCode, type AxiosRequestConfig } from "axios";

import type { ApiErrorResponseRecord } from "./types/errors";

import { AuthTokensManager } from "@/utils/auth/token";

export type Signal = AxiosRequestConfig["signal"];

export type ApiResponse<T> = T | AxiosError<unknown, unknown>;

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  paramsSerializer: {
    indexes: null, // Serialize arrays as: account_ids=1&account_ids=2 (without brackets)
  },
});

export const callApi = async <Success, ErrorShape = ApiErrorResponseRecord>(
  config: AxiosRequestConfig
): Promise<Success> => {
  try {
    const { data } = await axiosInstance.request<Success>(config);

    return data;
  } catch (error: unknown) {
    // Normalize anything Axios might throw
    const axiosErr = error as AxiosError<ErrorShape>;

    throw axiosErr;
  }
};

// Set authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = AuthTokensManager.getAccessToken();

  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    // Handle specific status codes
    switch (status) {
      case HttpStatusCode.Unauthorized:
        // 401 will be handled if we add users & auth
        break;

      case HttpStatusCode.Forbidden:
        // 403 will be handled by components
        break;

      case HttpStatusCode.NotFound:
        break;

      case HttpStatusCode.InternalServerError:
        // Add specific handling for 500 when needed
        break;

      default:
        // All other errors pass through unchanged
        break;
    }

    return Promise.reject(error);
  }
);
