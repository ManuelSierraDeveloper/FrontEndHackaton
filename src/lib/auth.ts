import { postJson } from './api';

const ACCESS_KEY = 'nebbi_access_token';
const REFRESH_KEY = 'nebbi_refresh_token';

export async function login(email: string, password: string) {
  const payload = { email, password };
  const data = await postJson<any>('/auth/login', payload);
  const access = data?.accessToken ?? data?.access_token ?? data?.token ?? null;
  const refresh = data?.refreshToken ?? data?.refresh_token ?? null;
  if (access) {
    try {
      localStorage.setItem(ACCESS_KEY, access);
      if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    } catch {}
  }
  return data;
}

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_KEY);
  } catch {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  } catch {}
}

export default { login, getAccessToken, logout };
