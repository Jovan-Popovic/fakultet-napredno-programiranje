import { describe, expect, it } from "vitest";

import { urlQueryManager, UrlQueryManager, type UrlQueryManagerType } from ".";

describe("UrlQueryManager", () => {
  describe("setQueryParam", () => {
    it("should add a new query parameter to a URL without existing params", () => {
      const result = urlQueryManager.setQueryParam({
        urlString: "https://example.com",
        key: "page",
        value: "1",
      });
      expect(result).toBe("https://example.com?page=1");
    });

    it("should add a new query parameter to a URL with existing params", () => {
      const result = urlQueryManager.setQueryParam({
        urlString: "https://example.com?existing=true",
        key: "page",
        value: "2",
      });
      expect(result).toBe("https://example.com?existing=true&page=2");
    });

    it("should replace an existing query parameter", () => {
      const result = urlQueryManager.setQueryParam({
        urlString: "https://example.com?page=1&sort=name",
        key: "page",
        value: "3",
      });
      expect(result).toBe("https://example.com?page=3&sort=name");
    });

    it("should handle undefined value by returning original URL", () => {
      const originalUrl = "https://example.com?page=1";
      const result = urlQueryManager.setQueryParam({
        urlString: originalUrl,
        key: "newParam",
        value: undefined,
      });
      expect(result).toBe(originalUrl);
    });

    it("should handle null value by returning original URL", () => {
      const originalUrl = "https://example.com?page=1";
      const result = urlQueryManager.setQueryParam({
        urlString: originalUrl,
        key: "newParam",
        value: null,
      });
      expect(result).toBe(originalUrl);
    });

    it("should handle empty string value by returning original URL", () => {
      const originalUrl = "https://example.com?page=1";
      const result = urlQueryManager.setQueryParam({
        urlString: originalUrl,
        key: "newParam",
        value: "",
      });
      expect(result).toBe(originalUrl);
    });

    it("should handle URLs with fragments", () => {
      const result = urlQueryManager.setQueryParam({
        urlString: "https://example.com/path#section",
        key: "tab",
        value: "overview",
      });
      expect(result).toBe("https://example.com/path?tab=overview");
    });

    it("should handle relative URLs", () => {
      const result = urlQueryManager.setQueryParam({
        urlString: "/dashboard",
        key: "view",
        value: "grid",
      });
      expect(result).toBe("/dashboard?view=grid");
    });

    it("should handle URLs with special characters in values", () => {
      const result = urlQueryManager.setQueryParam({
        urlString: "https://example.com",
        key: "search",
        value: "hello world & more",
      });
      expect(result).toBe("https://example.com?search=hello%20world%20%26%20more");
    });

    it("should handle invalid URLs gracefully", () => {
      const invalidUrl = "not-a-valid-url";
      const result = urlQueryManager.setQueryParam({
        urlString: invalidUrl,
        key: "param",
        value: "value",
      });
      expect(result).toBe("not-a-valid-url?param=value");
    });

    it("should handle array values (converted to string)", () => {
      const result = urlQueryManager.setQueryParam({
        urlString: "https://example.com",
        key: "tags",
        value: "javascript,react",
      });
      expect(result).toBe("https://example.com?tags=javascript%2Creact");
    });
  });

  describe("getQueryString", () => {
    it("should convert object to query string with question mark", () => {
      const result = urlQueryManager.getQueryString({
        page: "1",
        limit: "10",
        sort: "name",
      });
      expect(result).toBe("?limit=10&page=1&sort=name");
    });

    it("should handle empty object", () => {
      const result = urlQueryManager.getQueryString({});
      expect(result).toBe("");
    });

    it("should handle null/undefined input", () => {
      const result1 = urlQueryManager.getQueryString({});
      const result2 = urlQueryManager.getQueryString({});
      expect(result1).toBe("");
      expect(result2).toBe("");
    });

    it("should skip undefined values", () => {
      const result = urlQueryManager.getQueryString({
        page: "1",
        filter: undefined,
        sort: "name",
      });
      expect(result).toBe("?page=1&sort=name");
      expect(result).not.toContain("filter");
    });

    it("should skip empty string values", () => {
      const result = urlQueryManager.getQueryString({
        page: "1",
        search: "",
        sort: "name",
      });
      expect(result).toBe("?page=1&sort=name");
      expect(result).not.toContain("search");
    });

    it("should handle boolean values", () => {
      const result = urlQueryManager.getQueryString({
        active: true,
        disabled: false,
      });
      expect(result).toBe("?active=true&disabled=false");
    });

    it("should handle number values", () => {
      const result = urlQueryManager.getQueryString({
        page: 1,
        limit: 25,
        price: 99.99,
      });
      expect(result).toBe("?limit=25&page=1&price=99.99");
    });

    it("should handle array values", () => {
      const result = urlQueryManager.getQueryString({
        tags: ["javascript", "react", "typescript"],
      });
      expect(result).toContain("tags=javascript");
      expect(result).toContain("tags=react");
      expect(result).toContain("tags=typescript");
    });

    it("should encode special characters", () => {
      const result = urlQueryManager.getQueryString({
        search: "hello world & more",
        category: "news/tech",
      });
      expect(result).toContain("hello%20world%20%26%20more");
      expect(result).toContain("news%2Ftech");
    });
  });

  describe("UrlQueryManager instance", () => {
    it("should create a new instance with same functionality", () => {
      const customManager = new UrlQueryManager();

      const result1 = customManager.setQueryParam({
        urlString: "https://test.com",
        key: "test",
        value: "value",
      });
      expect(result1).toBe("https://test.com?test=value");

      const result2 = customManager.getQueryString({ key: "value" });
      expect(result2).toBe("?key=value");
    });

    it("should implement UrlQueryManagerType interface", () => {
      const manager: UrlQueryManagerType = new UrlQueryManager();

      expect(typeof manager.setQueryParam).toBe("function");
      expect(typeof manager.getQueryString).toBe("function");
    });
  });

  describe("exported urlQueryManager instance", () => {
    it("should be a singleton instance", () => {
      expect(urlQueryManager).toBeDefined();
      expect(typeof urlQueryManager.setQueryParam).toBe("function");
      expect(typeof urlQueryManager.getQueryString).toBe("function");
    });

    it("should maintain consistency between calls", () => {
      const params = { page: "1", sort: "name" };
      const result1 = urlQueryManager.getQueryString(params);
      const result2 = urlQueryManager.getQueryString(params);
      expect(result1).toBe(result2);
    });
  });

  describe("real-world usage scenarios", () => {
    it("should handle pagination URL building", () => {
      let url = "https://api.example.com/users";

      url = urlQueryManager.setQueryParam({
        urlString: url,
        key: "page",
        value: "1",
      });

      url = urlQueryManager.setQueryParam({
        urlString: url,
        key: "limit",
        value: "20",
      });

      url = urlQueryManager.setQueryParam({
        urlString: url,
        key: "sort",
        value: "created_at",
      });

      expect(url).toBe("https://api.example.com/users?limit=20&page=1&sort=created_at");
    });

    it("should handle search and filter combinations", () => {
      const filters = {
        search: "john doe",
        status: "active",
        role: "admin",
        page: "1",
        limit: "10",
      };

      const queryString = urlQueryManager.getQueryString(filters);
      expect(queryString).toContain("search=john%20doe");
      expect(queryString).toContain("status=active");
      expect(queryString).toContain("role=admin");
      expect(queryString).toContain("page=1");
      expect(queryString).toContain("limit=10");
    });

    it("should handle updating existing search URL", () => {
      const baseUrl = "https://example.com/search?q=javascript&page=1";

      const updatedUrl = urlQueryManager.setQueryParam({
        urlString: baseUrl,
        key: "page",
        value: "2",
      });

      expect(updatedUrl).toBe("https://example.com/search?page=2&q=javascript");
    });
  });
});
