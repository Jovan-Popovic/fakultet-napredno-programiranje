import { StorageTokenKeys } from "./enums/token";
import type { TokenPairNullableRecord, TokenPairRecord } from "./types/token";

export class AuthTokensManager {
  /**
   * Stores tokens into localStorage.
   * @param tokens Object containing access and refresh tokens.
   */
  static set(tokens: TokenPairRecord): void {
    localStorage.setItem(StorageTokenKeys.ACCESS, tokens.accessToken);
    localStorage.setItem(StorageTokenKeys.REFRESH, tokens.refreshToken);
  }

  /**
   * Retrieves both tokens from localStorage.
   * @returns Object containing nullable access and refresh tokens.
   */
  static get(): TokenPairNullableRecord {
    return {
      accessToken: localStorage.getItem(StorageTokenKeys.ACCESS),
      refreshToken: localStorage.getItem(StorageTokenKeys.REFRESH),
    };
  }

  /**
   * Retrieves only the access token.
   * @returns Access token or null.
   */
  static getAccessToken(): string | null {
    return localStorage.getItem(StorageTokenKeys.ACCESS);
  }

  /**
   * Retrieves only the refresh token.
   * @returns Refresh token or null.
   */
  static getRefreshToken(): string | null {
    return localStorage.getItem(StorageTokenKeys.REFRESH);
  }

  /**
   * Clears both access and refresh tokens from localStorage.
   */
  static clear(): void {
    localStorage.removeItem(StorageTokenKeys.ACCESS);
    localStorage.removeItem(StorageTokenKeys.REFRESH);
  }
}
