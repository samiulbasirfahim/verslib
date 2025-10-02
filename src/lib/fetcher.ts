const BASE_URL = "http://10.10.13.59:8080/api";

export class ApiError extends Error {
    public status: number;
    public data: any;

    constructor(status: number, data: any) {
        super("API Error");
        this.status = status;
        this.data = data;
    }
}

type Props = {
    endpoint: string;
    options: {
        method?: "GET" | "POST" | "PATCH" | "DELETE";
        body?: any;
        headers?: Record<string, string>;
        auth?: boolean;
    };
};
export async function fetcher<T>({ endpoint, options }: Props): Promise<T> {
    const { method = "GET", body, headers = {}, auth = false } = options;

    const finalHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
    };

    if (auth) {
        const token = "";
        if (token) {
            finalHeaders["Authorization"] = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
    });

    let data: any;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        throw new ApiError(res.status, data);
    }

    return data as T;
}
