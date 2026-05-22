import Constants from "expo-constants";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? Constants.expoConfig?.extra?.apiUrl ?? "";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// 1. Custom Error Class for better type inference in TanStack Query
export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  params?: object;
}

// 2. The core request function (THROWS errors for TanStack Query)
export const request = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { method = "GET", body, params, headers, ...customConfig } = options;

  let url = `${BASE_URL}${endpoint}`;

  // Automatically construct query parameters
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Easily inject Auth tokens here later:
      // "Authorization": `Bearer ${await getAuthToken()}`,
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(url, config);

  if (res.status === 204) return null as T;

  let data;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null
        ? (data as Record<string, unknown>)?.error
          ? String((data as Record<string, unknown>).error)
          : (data as Record<string, unknown>)?.message
            ? String((data as Record<string, unknown>).message)
            : res.statusText
        : res.statusText;
    throw new ApiError(res.status, message, data);
  }

  return data as T;
};
