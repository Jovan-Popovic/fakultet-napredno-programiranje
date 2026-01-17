import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility class to work with CSS class names.
 */
export type ClassNameManagerType = {
  /**
   * Join a list of class names, filtering out falsy values.
   */
  joinClasses(...classes: Array<string | boolean | null | undefined>): string;

  /**
   * Merge Tailwind CSS class names with clsx + tailwind-merge.
   */
  mergeClasses(...inputs: ClassValue[]): string;
};

export class ClassNameManager implements ClassNameManagerType {
  joinClasses(...classes: Array<string | boolean | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
  }

  mergeClasses(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
  }
}

export const classNameManager: ClassNameManagerType = new ClassNameManager();
