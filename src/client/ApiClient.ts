import { clientEnv } from "../env/schema.mjs";

export type ApiError = {
  statusText: string;
  status: number;
  body: {
    message?: string;
  };
};

class ApiClient {
  baseUrl;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get(endpoint: string, init?: RequestInit | undefined) {
    return this.request(`${this.baseUrl}${endpoint}`, {
      ...init,
      method: "GET",
    });
  }

  post(endpoint: string, init?: RequestInit | undefined) {
    return this.request(`${this.baseUrl}${endpoint}`, {
      ...init,
      method: "POST",
    });
  }

  put(endpoint: string, init?: RequestInit | undefined) {
    return this.request(`${this.baseUrl}${endpoint}`, {
      ...init,
      method: "PUT",
    });
  }

  private async request(endpoint: string, init: RequestInit | undefined) {
    const res = await fetch(endpoint, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
    if (!res.ok) {
      const err: ApiError = {
        statusText: res.statusText,
        status: res.status,
        body: await res.json(),
      };
      throw err;
    }
    return res;
  }
}

const client = new ApiClient(clientEnv.NEXT_PUBLIC_API as string);

export default client;
