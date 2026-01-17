import type { CookieOptions } from "./types/cookie";

/**
 * Utility class to work with cookies.
 */
export type CookieManagerType = {
  /**
   * Set a cookie with the given name and value.
   */
  setCookie(name: string, value: string, options?: CookieOptions): void;

  /**
   * Get a cookie value by name.
   */
  getCookie(name: string): string | null;

  /**
   * Remove a cookie by name.
   */
  removeCookie(name: string, options?: Pick<CookieOptions, "path" | "domain">): void;

  /**
   * Check if a cookie exists.
   */
  hasCookie(name: string): boolean;
};

export class CookieManager implements CookieManagerType {
  setCookie(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof document === "undefined") return;

    const { path = "/", maxAge, expires, domain, secure, sameSite = "lax" } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (path) cookieString += `; path=${path}`;
    if (maxAge !== undefined) cookieString += `; max-age=${maxAge}`;
    if (expires) cookieString += `; expires=${expires.toUTCString()}`;
    if (domain) cookieString += `; domain=${domain}`;
    if (secure) cookieString += `; secure`;
    if (sameSite) cookieString += `; samesite=${sameSite}`;

    document.cookie = cookieString;
  }

  getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const encodedName = encodeURIComponent(name);
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === encodedName) {
        return cookieValue ? decodeURIComponent(cookieValue) : null;
      }
    }

    return null;
  }

  removeCookie(name: string, options: Pick<CookieOptions, "path" | "domain"> = {}): void {
    this.setCookie(name, "", {
      ...options,
      maxAge: 0,
    });
  }

  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }
}

export const cookieManager: CookieManagerType = new CookieManager();
