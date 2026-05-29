const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1").replace(/\/$/, "");

export async function fetchJson<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE}${path.startsWith("/") ? path : "/" + path}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  let body = options.body as any;
  if (body && typeof body !== "string") {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, { ...options, headers, body });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`Request failed ${res.status} ${res.statusText}: ${text}`);
    // @ts-ignore
    err.status = res.status;
    throw err;
  }

  // try parse json, but return null for empty
  const text = await res.text().catch(() => "");
  if (!text) return null as unknown as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    // fallback to raw text
    return text as unknown as T;
  }
}

export async function getPublicProducts(): Promise<any[]> {
  try {
    const data = await fetchJson<any>('/public/products');
    if (Array.isArray(data)) return data;
    if (data?.content && Array.isArray(data.content)) return data.content;
    if (data?.items && Array.isArray(data.items)) return data.items;
    return [];
  } catch (e) {
    console.error('getPublicProducts error', e);
    return [];
  }
}

export async function postJson<T = any>(path: string, body: any): Promise<T> {
  return fetchJson<T>(path, { method: 'POST', body });
}

export default { fetchJson, getPublicProducts, postJson };
