import { describe, expect, it } from "vitest";

import { stringManager, StringManager, type StringManagerType } from ".";

describe("StringManager", () => {
  describe("toUpper", () => {
    it("converts to uppercase", () => {
      expect(stringManager.toUpper("hello")).toBe("HELLO");
    });

    it("respects locale (e.g., Turkish dotted i)", () => {
      expect(stringManager.toUpper("i", "tr")).toBe("İ");
    });

    it("handles empty string", () => {
      expect(stringManager.toUpper("")).toBe("");
    });
  });

  describe("toLower", () => {
    it("converts to lowercase", () => {
      expect(stringManager.toLower("HeLLo")).toBe("hello");
    });

    it("respects locale (e.g., Turkish capital İ)", () => {
      expect(stringManager.toLower("İ", "tr")).toBe("i");
    });

    it("handles empty string", () => {
      expect(stringManager.toLower("")).toBe("");
    });
  });

  describe("capitalizeFirst", () => {
    it("capitalizes only the first character of the string", () => {
      expect(stringManager.capitalizeFirst("hello world")).toBe("Hello world");
    });

    it("handles single-character strings", () => {
      expect(stringManager.capitalizeFirst("h")).toBe("H");
    });

    it("handles empty string", () => {
      expect(stringManager.capitalizeFirst("")).toBe("");
    });

    it("respects locale", () => {
      expect(stringManager.capitalizeFirst("istanbul", { locale: "tr" })).toBe("İstanbul");
    });
  });

  describe("capitalizeWords", () => {
    it("capitalizes each word and lowercases the rest by default", () => {
      expect(stringManager.capitalizeWords("heLLo woRLD")).toBe("Hello World");
    });

    it("preserves rest casing when lowerRest=false", () => {
      expect(stringManager.capitalizeWords("heLLo woRLD", { lowerRest: false })).toBe(
        "HeLLo WoRLD"
      );
    });

    it("treats underscores and dashes as separators", () => {
      expect(stringManager.capitalizeWords("hello_world-goodbye")).toBe("Hello World Goodbye");
    });

    it("respects locale", () => {
      expect(stringManager.capitalizeWords("istanbul izmir", { locale: "tr" })).toBe(
        "İstanbul İzmir"
      );
    });
  });

  describe("toStartCase", () => {
    it("turns any casing into words with first letter capitalized", () => {
      expect(stringManager.toStartCase("helloWorld")).toBe("Hello World");
      expect(stringManager.toStartCase("hello-world")).toBe("Hello World");
      expect(stringManager.toStartCase("hello_world")).toBe("Hello World");
      expect(stringManager.toStartCase("Hello   world")).toBe("Hello World");
      expect(stringManager.toStartCase("userID42")).toBe("User ID 42");
    });

    it("preserves rest when lowerRest=false", () => {
      expect(stringManager.toStartCase("heLLo woRLD", { lowerRest: false })).toBe("HeLLo WoRLD");
    });
  });

  describe("toSnakeCase", () => {
    it("converts to snake_case from mixed formats", () => {
      expect(stringManager.toSnakeCase("HelloWorld")).toBe("hello_world");
      expect(stringManager.toSnakeCase("hello-world now")).toBe("hello_world_now");
      expect(stringManager.toSnakeCase("userID42Ready")).toBe("user_id_42_ready");
      expect(stringManager.toSnakeCase(" already_snake ")).toBe("already_snake");
    });

    it("handles empty string", () => {
      expect(stringManager.toSnakeCase("")).toBe("");
    });
  });

  describe("toConstantCase", () => {
    it("converts to CONSTANT_CASE", () => {
      expect(stringManager.toConstantCase("makeThisNice")).toBe("MAKE_THIS_NICE");
      expect(stringManager.toConstantCase("make this nice")).toBe("MAKE_THIS_NICE");
    });

    it("respects locale", () => {
      expect(stringManager.toConstantCase("istanbul izmir", "tr")).toBe("İSTANBUL_İZMİR");
    });
  });

  describe("toKebabCase", () => {
    it("converts to kebab-case", () => {
      expect(stringManager.toKebabCase("MakeThisNice")).toBe("make_this_nice".replace(/_/g, "-"));
      expect(stringManager.toKebabCase("make_this_nice")).toBe("make-this-nice");
      expect(stringManager.toKebabCase("  make  this   nice ")).toBe("make-this-nice");
    });
  });

  describe("toPascalCase", () => {
    it("converts to PascalCase", () => {
      expect(stringManager.toPascalCase("make this nice")).toBe("MakeThisNice");
      expect(stringManager.toPascalCase("make_this_nice")).toBe("MakeThisNice");
      expect(stringManager.toPascalCase("make-this-nice")).toBe("MakeThisNice");
      expect(stringManager.toPascalCase("userID42 ready")).toBe("UserId42Ready");
    });

    it("respects locale for the first letter", () => {
      expect(stringManager.toPascalCase("istanbul izmir", "tr")).toBe("İstanbulİzmir");
    });
  });

  describe("toUnderscoreTitle", () => {
    it("capitalizes all words and joins with underscores", () => {
      expect(stringManager.toUnderscoreTitle("make this nice")).toBe("Make_This_Nice");
      expect(stringManager.toUnderscoreTitle("make-this_niceNow")).toBe("Make_This_Nice_Now");
    });

    it("preserves rest casing when lowerRest=false", () => {
      expect(stringManager.toUnderscoreTitle("heLLo woRLD", { lowerRest: false })).toBe(
        "HeLLo_WoRLD"
      );
    });
  });

  describe("collapseWhitespace", () => {
    it("collapses multiple spaces and trims ends", () => {
      expect(stringManager.collapseWhitespace("  Hello   world   ")).toBe("Hello world");
    });

    it("handles tabs and newlines", () => {
      expect(stringManager.collapseWhitespace("\tHello\nworld\r\nagain")).toBe("Hello world again");
    });

    it("handles empty string", () => {
      expect(stringManager.collapseWhitespace("")).toBe("");
    });
  });

  describe("instance behavior", () => {
    it("can create a new instance with same functionality", () => {
      const custom = new StringManager();
      expect(custom.toSnakeCase("HelloWorld")).toBe("hello_world");
      expect(custom.toStartCase("hello-world")).toBe("Hello World");
    });

    it("implements StringManagerType", () => {
      const manager: StringManagerType = new StringManager();
      expect(typeof manager.toUpper).toBe("function");
      expect(typeof manager.toLower).toBe("function");
      expect(typeof manager.capitalizeFirst).toBe("function");
      expect(typeof manager.capitalizeWords).toBe("function");
      expect(typeof manager.toStartCase).toBe("function");
      expect(typeof manager.toSnakeCase).toBe("function");
      expect(typeof manager.toConstantCase).toBe("function");
      expect(typeof manager.toKebabCase).toBe("function");
      expect(typeof manager.toPascalCase).toBe("function");
      expect(typeof manager.toUnderscoreTitle).toBe("function");
      expect(typeof manager.collapseWhitespace).toBe("function");
    });
  });

  describe("real-world usage scenarios", () => {
    it("formats identifiers from API keys and labels", () => {
      const apiKey = "x-rate-limit-remaining";
      const pascal = stringManager.toPascalCase(apiKey);
      const consty = stringManager.toConstantCase(apiKey);
      expect(pascal).toBe("XRateLimitRemaining");
      expect(consty).toBe("X_RATE_LIMIT_REMAINING");
    });

    it("normalizes user input to safe machine keys", () => {
      const input = "  New   Feature: Beta v2 ";
      const key = stringManager.toSnakeCase(input);
      expect(key).toBe("new_feature_beta_v2");
    });

    it("pretty prints technical tokens for UI", () => {
      const token = "userID42_ready";
      const label = stringManager.toStartCase(token);
      expect(label).toBe("User ID 42 Ready");
    });

    it("builds title-like underscore strings for filenames", () => {
      const title = stringManager.toUnderscoreTitle("refactor build script");
      expect(title).toBe("Refactor_Build_Script");
    });
  });
});
