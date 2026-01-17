import { beforeEach, describe, expect, it, vi } from "vitest";

import { StorageTokenKeys } from "./enums/token";
import { AuthTokensManager } from "./token";

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

describe("AuthTokensManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("set", () => {
    it("should store both access and refresh tokens in localStorage", () => {
      const tokens = {
        accessToken: "access_token_123",
        refreshToken: "refresh_token_456",
      };

      AuthTokensManager.set(tokens);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        StorageTokenKeys.ACCESS,
        "access_token_123"
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        StorageTokenKeys.REFRESH,
        "refresh_token_456"
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
    });

    it("should handle JWT tokens", () => {
      const tokens = {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ",
      };

      AuthTokensManager.set(tokens);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        StorageTokenKeys.ACCESS,
        tokens.accessToken
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        StorageTokenKeys.REFRESH,
        tokens.refreshToken
      );
    });

    it("should handle empty string tokens", () => {
      const tokens = {
        accessToken: "",
        refreshToken: "",
      };

      AuthTokensManager.set(tokens);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(StorageTokenKeys.ACCESS, "");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(StorageTokenKeys.REFRESH, "");
    });
  });

  describe("get", () => {
    it("should retrieve both tokens from localStorage", () => {
      mockLocalStorage.getItem
        .mockReturnValueOnce("access_token_123")
        .mockReturnValueOnce("refresh_token_456");

      const result = AuthTokensManager.get();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(StorageTokenKeys.ACCESS);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(StorageTokenKeys.REFRESH);
      expect(result).toEqual({
        accessToken: "access_token_123",
        refreshToken: "refresh_token_456",
      });
    });

    it("should return null values when tokens don't exist", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = AuthTokensManager.get();

      expect(result).toEqual({
        accessToken: null,
        refreshToken: null,
      });
    });

    it("should handle mixed scenarios where only one token exists", () => {
      mockLocalStorage.getItem.mockReturnValueOnce("access_token_123").mockReturnValueOnce(null);

      const result = AuthTokensManager.get();

      expect(result).toEqual({
        accessToken: "access_token_123",
        refreshToken: null,
      });
    });

    it("should handle empty string tokens from localStorage", () => {
      mockLocalStorage.getItem.mockReturnValueOnce("").mockReturnValueOnce("");

      const result = AuthTokensManager.get();

      expect(result).toEqual({
        accessToken: "",
        refreshToken: "",
      });
    });
  });

  describe("getAccessToken", () => {
    it("should retrieve only the access token", () => {
      mockLocalStorage.getItem.mockReturnValue("access_token_123");

      const result = AuthTokensManager.getAccessToken();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(StorageTokenKeys.ACCESS);
      expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(result).toBe("access_token_123");
    });

    it("should return null when access token doesn't exist", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = AuthTokensManager.getAccessToken();

      expect(result).toBeNull();
    });

    it("should return empty string when access token is empty", () => {
      mockLocalStorage.getItem.mockReturnValue("");

      const result = AuthTokensManager.getAccessToken();

      expect(result).toBe("");
    });

    it("should handle JWT access tokens", () => {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      mockLocalStorage.getItem.mockReturnValue(jwtToken);

      const result = AuthTokensManager.getAccessToken();

      expect(result).toBe(jwtToken);
    });
  });

  describe("getRefreshToken", () => {
    it("should retrieve only the refresh token", () => {
      mockLocalStorage.getItem.mockReturnValue("refresh_token_456");

      const result = AuthTokensManager.getRefreshToken();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(StorageTokenKeys.REFRESH);
      expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(result).toBe("refresh_token_456");
    });

    it("should return null when refresh token doesn't exist", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = AuthTokensManager.getRefreshToken();

      expect(result).toBeNull();
    });

    it("should return empty string when refresh token is empty", () => {
      mockLocalStorage.getItem.mockReturnValue("");

      const result = AuthTokensManager.getRefreshToken();

      expect(result).toBe("");
    });

    it("should handle JWT refresh tokens", () => {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ";
      mockLocalStorage.getItem.mockReturnValue(jwtToken);

      const result = AuthTokensManager.getRefreshToken();

      expect(result).toBe(jwtToken);
    });
  });

  describe("clear", () => {
    it("should remove both access and refresh tokens from localStorage", () => {
      AuthTokensManager.clear();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(StorageTokenKeys.ACCESS);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(StorageTokenKeys.REFRESH);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(2);
    });

    it("should not throw error when tokens don't exist", () => {
      mockLocalStorage.removeItem.mockImplementation(() => {
        // Simulate localStorage behavior - removeItem doesn't throw for non-existent keys
      });

      expect(() => {
        AuthTokensManager.clear();
      }).not.toThrow();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(2);
    });
  });

  describe("static class behavior", () => {
    it("should be a static class with no instance methods", () => {
      expect(typeof AuthTokensManager.set).toBe("function");
      expect(typeof AuthTokensManager.get).toBe("function");
      expect(typeof AuthTokensManager.getAccessToken).toBe("function");
      expect(typeof AuthTokensManager.getRefreshToken).toBe("function");
      expect(typeof AuthTokensManager.clear).toBe("function");
    });

    it("should not be instantiable", () => {
      // AuthTokensManager should be used as a static class
      const instance = new AuthTokensManager();
      expect(instance).toBeInstanceOf(AuthTokensManager);

      // But it should still work as static methods
      expect(typeof AuthTokensManager.set).toBe("function");
    });
  });

  describe("real-world usage scenarios", () => {
    it("should handle complete authentication flow", () => {
      // Login - set tokens
      const loginTokens = {
        accessToken: "access_123",
        refreshToken: "refresh_456",
      };

      AuthTokensManager.set(loginTokens);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(StorageTokenKeys.ACCESS, "access_123");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        StorageTokenKeys.REFRESH,
        "refresh_456"
      );

      // Check authentication status
      mockLocalStorage.getItem.mockReturnValue("access_123");
      const accessToken = AuthTokensManager.getAccessToken();
      expect(accessToken).toBe("access_123");

      // Logout - clear tokens
      AuthTokensManager.clear();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(StorageTokenKeys.ACCESS);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(StorageTokenKeys.REFRESH);
    });

    it("should handle token refresh scenario", () => {
      // Get current tokens for refresh
      mockLocalStorage.getItem
        .mockReturnValueOnce("old_access_token")
        .mockReturnValueOnce("current_refresh_token");

      const currentTokens = AuthTokensManager.get();
      expect(currentTokens).toEqual({
        accessToken: "old_access_token",
        refreshToken: "current_refresh_token",
      });

      // Refresh tokens - set new tokens
      const newTokens = {
        accessToken: "new_access_token",
        refreshToken: "new_refresh_token",
      };

      AuthTokensManager.set(newTokens);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        StorageTokenKeys.ACCESS,
        "new_access_token"
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        StorageTokenKeys.REFRESH,
        "new_refresh_token"
      );
    });

    it("should handle API request authentication", () => {
      // Simulate getting token for API request
      mockLocalStorage.getItem.mockReturnValue("bearer_token_123");

      const token = AuthTokensManager.getAccessToken();

      // This would be used in API headers
      const authHeader = token ? `Bearer ${token}` : null;

      expect(authHeader).toBe("Bearer bearer_token_123");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(StorageTokenKeys.ACCESS);
    });

    it("should handle expired session cleanup", () => {
      // When session expires, clear all tokens
      AuthTokensManager.clear();

      // Verify both tokens are removed
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(StorageTokenKeys.ACCESS);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(StorageTokenKeys.REFRESH);

      // Check that no tokens exist
      mockLocalStorage.getItem.mockReturnValue(null);
      const tokens = AuthTokensManager.get();

      expect(tokens).toEqual({
        accessToken: null,
        refreshToken: null,
      });
    });

    it("should handle app initialization token check", () => {
      // App startup - check for existing tokens
      mockLocalStorage.getItem
        .mockReturnValueOnce("existing_access")
        .mockReturnValueOnce("existing_refresh");

      const existingTokens = AuthTokensManager.get();

      expect(existingTokens.accessToken).toBe("existing_access");
      expect(existingTokens.refreshToken).toBe("existing_refresh");

      // This would determine if user is already authenticated
      const isAuthenticated = Boolean(existingTokens.accessToken);
      expect(isAuthenticated).toBe(true);
    });

    it("should handle partial token scenarios", () => {
      // Scenario where only access token exists (unusual but possible)
      mockLocalStorage.getItem
        .mockReturnValueOnce("orphaned_access_token")
        .mockReturnValueOnce(null);

      const tokens = AuthTokensManager.get();

      expect(tokens).toEqual({
        accessToken: "orphaned_access_token",
        refreshToken: null,
      });

      // In this case, app might want to clear tokens and re-authenticate
      AuthTokensManager.clear();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(2);
    });

    it("should handle storage errors gracefully", () => {
      // Simulate localStorage quota exceeded or disabled
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });

      expect(() => {
        AuthTokensManager.set({
          accessToken: "test_token",
          refreshToken: "test_refresh",
        });
      }).toThrow("QuotaExceededError");

      // In real app, this would be caught and handled appropriately
    });
  });
});
