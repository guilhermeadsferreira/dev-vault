import { createCookie } from "react-router";

/** Cookie simples de auth – esboço até integrar com backend real. */
export const authCookie = createCookie("auth", {
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 semana
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

export type AuthData = { loggedIn: true } | Record<string, never>;

export async function getAuth(cookieHeader: string | null): Promise<AuthData> {
  const data = (await authCookie.parse(cookieHeader)) ?? {};
  return data?.loggedIn === true ? { loggedIn: true } : {};
}

export async function serializeAuth(data: AuthData): Promise<string> {
  return authCookie.serialize(data);
}

/** Retorna header Set-Cookie para invalidar a sessão (logout). */
export async function clearAuth(): Promise<string> {
  return authCookie.serialize({}, { expires: new Date(0) });
}
