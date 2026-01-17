import { describe, expect, it } from "vitest";

import { classNameManager, ClassNameManager, type ClassNameManagerType } from ".";

describe("ClassNameManager", () => {
  describe("joinClasses", () => {
    it("should join valid string classes", () => {
      const result = classNameManager.joinClasses("btn", "primary", "large");
      expect(result).toBe("btn primary large");
    });

    it("should filter out falsy values", () => {
      const result = classNameManager.joinClasses(
        "btn",
        false,
        "primary",
        "",
        "large",
        null,
        undefined
      );
      expect(result).toBe("btn primary large");
    });

    it("should handle boolean conditions", () => {
      const isActive = true;
      const isDisabled = false;

      const result = classNameManager.joinClasses(
        "btn",
        isActive && "active",
        isDisabled && "disabled"
      );
      expect(result).toBe("btn active");
    });

    it("should return empty string when all values are falsy", () => {
      const result = classNameManager.joinClasses(false, "", null, undefined);
      expect(result).toBe("");
    });

    it("should handle single class", () => {
      const result = classNameManager.joinClasses("single-class");
      expect(result).toBe("single-class");
    });

    it("should handle empty input", () => {
      const result = classNameManager.joinClasses();
      expect(result).toBe("");
    });

    it("should handle mixed string and boolean values", () => {
      const result = classNameManager.joinClasses(
        "base",
        // eslint-disable-next-line no-constant-binary-expression
        true && "conditional-true",
        // eslint-disable-next-line no-constant-binary-expression
        false && "conditional-false",
        "always-present"
      );
      expect(result).toBe("base conditional-true always-present");
    });
  });

  describe("mergeClasses", () => {
    it("should merge simple classes", () => {
      const result = classNameManager.mergeClasses("btn", "primary");
      expect(result).toBe("btn primary");
    });

    it("should handle Tailwind class conflicts and merge properly", () => {
      const result = classNameManager.mergeClasses("px-2 py-1 bg-red-500", "px-4 bg-blue-500");
      // tailwind-merge should resolve conflicts, keeping the last conflicting classes
      expect(result).toBe("py-1 px-4 bg-blue-500");
    });

    it("should handle conditional classes with clsx syntax", () => {
      const isActive = true;
      const isDisabled = false;

      const result = classNameManager.mergeClasses("btn", {
        active: isActive,
        disabled: isDisabled,
        "btn-primary": true,
      });
      expect(result).toBe("btn active btn-primary");
    });

    it("should handle arrays of classes", () => {
      const result = classNameManager.mergeClasses(["btn", "primary"], ["large", "rounded"]);
      expect(result).toBe("btn primary large rounded");
    });

    it("should handle mixed input types", () => {
      const result = classNameManager.mergeClasses(
        "btn",
        // eslint-disable-next-line no-constant-binary-expression
        ["primary", false && "secondary"],
        { active: true, disabled: false },
        "large"
      );
      expect(result).toBe("btn primary active large");
    });

    it("should handle complex Tailwind conflicts", () => {
      const result = classNameManager.mergeClasses(
        "text-sm text-red-500 p-2 m-1",
        "text-lg text-blue-600 p-4",
        "text-green-400 m-2"
      );
      // Should keep the last conflicting values
      expect(result).toBe("text-lg p-4 text-green-400 m-2");
    });

    it("should handle empty input", () => {
      const result = classNameManager.mergeClasses();
      expect(result).toBe("");
    });

    it("should handle null and undefined values", () => {
      const result = classNameManager.mergeClasses("btn", null, undefined, "primary");
      expect(result).toBe("btn primary");
    });

    it("should handle responsive and state variants", () => {
      const result = classNameManager.mergeClasses(
        "hover:bg-red-500 md:text-lg",
        "hover:bg-blue-500 lg:text-xl"
      );
      expect(result).toBe("md:text-lg hover:bg-blue-500 lg:text-xl");
    });
  });

  describe("ClassNameManager instance", () => {
    it("should create a new instance with same functionality", () => {
      const customManager = new ClassNameManager();

      expect(customManager.joinClasses("a", "b")).toBe("a b");
      expect(customManager.mergeClasses("px-2", "px-4")).toBe("px-4");
    });

    it("should implement ClassNameManagerType interface", () => {
      const manager: ClassNameManagerType = new ClassNameManager();

      expect(typeof manager.joinClasses).toBe("function");
      expect(typeof manager.mergeClasses).toBe("function");
    });
  });

  describe("exported classNameManager instance", () => {
    it("should be a singleton instance", () => {
      expect(classNameManager).toBeDefined();
      expect(typeof classNameManager.joinClasses).toBe("function");
      expect(typeof classNameManager.mergeClasses).toBe("function");
    });

    it("should maintain state between calls", () => {
      // These should work consistently
      const result1 = classNameManager.joinClasses("test");
      const result2 = classNameManager.joinClasses("test");
      expect(result1).toBe(result2);
    });
  });

  describe("real-world usage scenarios", () => {
    it("should handle button component class merging", () => {
      const variant: "primary" | "secondary" = "primary" as "primary" | "secondary";
      const size: "small" | "medium" | "large" = "large" as "small" | "medium" | "large";
      const isDisabled = false;
      const customClasses = "my-custom-class";

      const result = classNameManager.mergeClasses(
        "btn transition-colors duration-200",
        {
          "btn-primary bg-blue-500 hover:bg-blue-600": variant === "primary",
          "btn-secondary bg-gray-500 hover:bg-gray-600": variant === "secondary",
          "text-sm px-3 py-1": size === "small",
          "text-base px-4 py-2": size === "medium",
          "text-lg px-6 py-3": size === "large",
          "opacity-50 cursor-not-allowed": isDisabled,
        },
        customClasses
      );

      expect(result).toContain("btn");
      expect(result).toContain("btn-primary");
      expect(result).toContain("bg-blue-500");
      expect(result).toContain("text-lg");
      expect(result).toContain("px-6");
      expect(result).toContain("py-3");
      expect(result).toContain("my-custom-class");
      expect(result).not.toContain("opacity-50");
    });

    it("should handle card component with conditional styling", () => {
      const isElevated = true;
      const isInteractive = true;
      const theme = "dark";

      const result = classNameManager.mergeClasses(
        "card rounded-lg border",
        isElevated && "shadow-lg",
        isInteractive && "hover:shadow-xl transition-shadow cursor-pointer",
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      );

      expect(result).toContain("card");
      expect(result).toContain("shadow-lg");
      expect(result).toContain("hover:shadow-xl");
      expect(result).toContain("bg-gray-800");
      expect(result).toContain("border-gray-700");
    });
  });
});
