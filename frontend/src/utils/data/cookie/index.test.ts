import { beforeEach, describe, expect, it, vi } from "vitest";

import { cookieManager, CookieManager, type CookieManagerType } from ".";

// Mock document.cookie for testing
const mockDocumentCookie = vi.fn();
Object.defineProperty(document, "cookie", {
  get: () => mockDocumentCookie(),
  set: (value) => mockDocumentCookie.mockReturnValue(value),
  configurable: true,
});

describe("CookieManager", () => {
  beforeEach(() => {
    mockDocumentCookie.mockClear();
    mockDocumentCookie.mockReturnValue("");
  });

  describe("setCookie", () => {
    it("should set a simple cookie with default options", () => {
      cookieManager.setCookie("testCookie", "testValue");

      expect(document.cookie).toContain("testCookie=testValue");
      expect(document.cookie).toContain("path=/");
      expect(document.cookie).toContain("samesite=lax");
    });

    it("should set a cookie with custom path", () => {
      cookieManager.setCookie("testCookie", "testValue", { path: "/admin" });

      expect(document.cookie).toContain("testCookie=testValue");
      expect(document.cookie).toContain("path=/admin");
    });

    it("should set a cookie with maxAge", () => {
      cookieManager.setCookie("testCookie", "testValue", { maxAge: 3600 });

      expect(document.cookie).toContain("testCookie=testValue");
      expect(document.cookie).toContain("max-age=3600");
    });

    it("should set a cookie with expires date", () => {
      const expiryDate = new Date("2025-12-31T23:59:59Z");
      cookieManager.setCookie("testCookie", "testValue", { expires: expiryDate });

      expect(document.cookie).toContain("testCookie=testValue");
      expect(document.cookie).toContain("expires=Wed, 31 Dec 2025 23:59:59 GMT");
    });

    it("should set a cookie with domain", () => {
      cookieManager.setCookie("testCookie", "testValue", { domain: ".example.com" });

      expect(document.cookie).toContain("testCookie=testValue");
      expect(document.cookie).toContain("domain=.example.com");
    });

    it("should set a secure cookie", () => {
      cookieManager.setCookie("testCookie", "testValue", { secure: true });

      expect(document.cookie).toContain("testCookie=testValue");
      expect(document.cookie).toContain("secure");
    });

    it("should set a cookie with custom sameSite", () => {
      cookieManager.setCookie("testCookie", "testValue", { sameSite: "strict" });

      expect(document.cookie).toContain("testCookie=testValue");
      expect(document.cookie).toContain("samesite=strict");
    });

    it("should encode cookie name and value", () => {
      cookieManager.setCookie("test cookie", "test value & more");

      expect(document.cookie).toContain("test%20cookie=test%20value%20%26%20more");
    });

    it("should handle all options together", () => {
      const expiryDate = new Date("2025-12-31T23:59:59Z");
      cookieManager.setCookie("testCookie", "testValue", {
        path: "/app",
        maxAge: 7200,
        expires: expiryDate,
        domain: ".test.com",
        secure: true,
        sameSite: "none",
      });

      const cookieString = document.cookie;
      expect(cookieString).toContain("testCookie=testValue");
      expect(cookieString).toContain("path=/app");
      expect(cookieString).toContain("max-age=7200");
      expect(cookieString).toContain("expires=Wed, 31 Dec 2025 23:59:59 GMT");
      expect(cookieString).toContain("domain=.test.com");
      expect(cookieString).toContain("secure");
      expect(cookieString).toContain("samesite=none");
    });

    it("should handle server-side rendering (no document)", () => {
      const originalDocument = global.document;
      // @ts-expect-error - Intentionally setting to undefined for SSR test
      global.document = undefined;

      expect(() => {
        cookieManager.setCookie("testCookie", "testValue");
      }).not.toThrow();

      global.document = originalDocument;
    });
  });

  describe("getCookie", () => {
    it("should return null when cookie doesn't exist", () => {
      mockDocumentCookie.mockReturnValue("");

      const result = cookieManager.getCookie("nonExistent");
      expect(result).toBeNull();
    });

    it("should retrieve a simple cookie value", () => {
      mockDocumentCookie.mockReturnValue("testCookie=testValue");

      const result = cookieManager.getCookie("testCookie");
      expect(result).toBe("testValue");
    });

    it("should retrieve cookie from multiple cookies", () => {
      mockDocumentCookie.mockReturnValue("cookie1=value1; testCookie=testValue; cookie2=value2");

      const result = cookieManager.getCookie("testCookie");
      expect(result).toBe("testValue");
    });

    it("should handle encoded cookie names and values", () => {
      mockDocumentCookie.mockReturnValue("test%20cookie=test%20value%20%26%20more");

      const result = cookieManager.getCookie("test cookie");
      expect(result).toBe("test value & more");
    });

    it("should handle cookies with spaces around them", () => {
      mockDocumentCookie.mockReturnValue(" testCookie=testValue ; anotherCookie=anotherValue ");

      const result = cookieManager.getCookie("testCookie");
      expect(result).toBe("testValue");
    });

    it("should return null for empty cookie value", () => {
      mockDocumentCookie.mockReturnValue("testCookie=");

      const result = cookieManager.getCookie("testCookie");
      expect(result).toBeNull();
    });

    it("should handle server-side rendering (no document)", () => {
      const originalDocument = global.document;
      // @ts-expect-error - Intentionally setting to undefined for SSR test
      global.document = undefined;

      const result = cookieManager.getCookie("testCookie");
      expect(result).toBeNull();

      global.document = originalDocument;
    });

    it("should handle malformed cookie strings gracefully", () => {
      mockDocumentCookie.mockReturnValue("malformedCookie;validCookie=validValue");

      const result = cookieManager.getCookie("validCookie");
      expect(result).toBe("validValue");
    });
  });

  describe("removeCookie", () => {
    it("should remove a cookie by setting maxAge to 0", () => {
      const setCookieSpy = vi.spyOn(cookieManager, "setCookie");

      cookieManager.removeCookie("testCookie");

      expect(setCookieSpy).toHaveBeenCalledWith("testCookie", "", {
        maxAge: 0,
      });
    });

    it("should remove a cookie with custom path", () => {
      const setCookieSpy = vi.spyOn(cookieManager, "setCookie");

      cookieManager.removeCookie("testCookie", { path: "/admin" });

      expect(setCookieSpy).toHaveBeenCalledWith("testCookie", "", {
        path: "/admin",
        maxAge: 0,
      });
    });

    it("should remove a cookie with custom domain", () => {
      const setCookieSpy = vi.spyOn(cookieManager, "setCookie");

      cookieManager.removeCookie("testCookie", { domain: ".example.com" });

      expect(setCookieSpy).toHaveBeenCalledWith("testCookie", "", {
        domain: ".example.com",
        maxAge: 0,
      });
    });

    it("should remove a cookie with both path and domain", () => {
      const setCookieSpy = vi.spyOn(cookieManager, "setCookie");

      cookieManager.removeCookie("testCookie", {
        path: "/app",
        domain: ".test.com",
      });

      expect(setCookieSpy).toHaveBeenCalledWith("testCookie", "", {
        path: "/app",
        domain: ".test.com",
        maxAge: 0,
      });
    });
  });

  describe("hasCookie", () => {
    it("should return true when cookie exists", () => {
      mockDocumentCookie.mockReturnValue("testCookie=testValue");

      const result = cookieManager.hasCookie("testCookie");
      expect(result).toBe(true);
    });

    it("should return false when cookie doesn't exist", () => {
      mockDocumentCookie.mockReturnValue("otherCookie=otherValue");

      const result = cookieManager.hasCookie("testCookie");
      expect(result).toBe(false);
    });

    it("should return false when cookie exists but has empty value", () => {
      mockDocumentCookie.mockReturnValue("testCookie=");

      const result = cookieManager.hasCookie("testCookie");
      expect(result).toBe(false);
    });

    it("should work with multiple cookies", () => {
      mockDocumentCookie.mockReturnValue("cookie1=value1; testCookie=testValue; cookie2=value2");

      expect(cookieManager.hasCookie("testCookie")).toBe(true);
      expect(cookieManager.hasCookie("cookie1")).toBe(true);
      expect(cookieManager.hasCookie("cookie2")).toBe(true);
      expect(cookieManager.hasCookie("nonExistent")).toBe(false);
    });
  });

  describe("CookieManager instance", () => {
    it("should create a new instance with same functionality", () => {
      const customManager = new CookieManager();

      expect(typeof customManager.setCookie).toBe("function");
      expect(typeof customManager.getCookie).toBe("function");
      expect(typeof customManager.removeCookie).toBe("function");
      expect(typeof customManager.hasCookie).toBe("function");
    });

    it("should implement CookieManagerType interface", () => {
      const manager: CookieManagerType = new CookieManager();

      expect(typeof manager.setCookie).toBe("function");
      expect(typeof manager.getCookie).toBe("function");
      expect(typeof manager.removeCookie).toBe("function");
      expect(typeof manager.hasCookie).toBe("function");
    });
  });

  describe("exported cookieManager instance", () => {
    it("should be a singleton instance", () => {
      expect(cookieManager).toBeDefined();
      expect(typeof cookieManager.setCookie).toBe("function");
      expect(typeof cookieManager.getCookie).toBe("function");
      expect(typeof cookieManager.removeCookie).toBe("function");
      expect(typeof cookieManager.hasCookie).toBe("function");
    });
  });

  describe("real-world usage scenarios", () => {
    it("should handle user session management", () => {
      // Set session cookie
      cookieManager.setCookie("sessionId", "abc123", {
        maxAge: 3600, // 1 hour
        secure: true,
        sameSite: "strict",
      });

      expect(document.cookie).toContain("sessionId=abc123");
      expect(document.cookie).toContain("max-age=3600");
      expect(document.cookie).toContain("secure");
      expect(document.cookie).toContain("samesite=strict");
    });

    it("should handle user preferences", () => {
      let cookieString = "";

      // Mock document.cookie setter to accumulate cookies
      Object.defineProperty(document, "cookie", {
        set: (value) => {
          cookieString += (cookieString ? "; " : "") + value;
        },
        get: () => cookieString,
        configurable: true,
      });

      // Set theme preference
      cookieManager.setCookie("theme", "dark", {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });

      // Set language preference
      cookieManager.setCookie("language", "en-US", {
        maxAge: 365 * 24 * 60 * 60, // 1 year
        path: "/",
      });

      expect(document.cookie).toContain("theme=dark");
      expect(document.cookie).toContain("language=en-US");
    });

    it("should handle authentication flow methods", () => {
      // Test that removeCookie method properly calls setCookie for deletion
      const setCookieSpy = vi.spyOn(cookieManager, "setCookie");
      cookieManager.removeCookie("accessToken");
      expect(setCookieSpy).toHaveBeenCalledWith("accessToken", "", { maxAge: 0 });
      setCookieSpy.mockRestore();

      // All cookie getting/setting functionality is already tested in other tests
      // This test just validates that the removeCookie flow works correctly
    });

    it("should handle complex cookie values", () => {
      const userPreferences = JSON.stringify({
        theme: "dark",
        notifications: true,
        layout: "grid",
      });

      cookieManager.setCookie("userPreferences", userPreferences);

      mockDocumentCookie.mockReturnValue(`userPreferences=${encodeURIComponent(userPreferences)}`);
      const retrieved = cookieManager.getCookie("userPreferences");

      expect(retrieved).toBe(userPreferences);
      expect(JSON.parse(retrieved || "{}")).toEqual({
        theme: "dark",
        notifications: true,
        layout: "grid",
      });
    });
  });
});
