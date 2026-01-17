/**
 * Alert Component
 *
 * Simple alert/notification component for displaying messages
 */

import { type FC, type ReactNode } from "react";

import { classNameManager } from "@/utils/css";

type AlertVariant = "default" | "success" | "warning" | "destructive" | "info";

type AlertProps = {
  variant?: AlertVariant;
  children: ReactNode;
  className?: string;
};

type AlertDescriptionProps = {
  children: ReactNode;
  className?: string;
};

const getVariantStyles = (variant: AlertVariant) => {
  switch (variant) {
    case "success":
      return "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100";
    case "warning":
      return "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100";
    case "destructive":
      return "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/20 dark:text-red-100";
    case "info":
      return "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100";
    default:
      return "border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100";
  }
};

export const Alert: FC<AlertProps> = ({ variant = "default", children, className }) => {
  return (
    <div
      className={classNameManager.mergeClasses(
        "flex items-start gap-3 rounded-lg border p-4",
        getVariantStyles(variant),
        className
      )}
      role="alert"
    >
      {children}
    </div>
  );
};

export const AlertDescription: FC<AlertDescriptionProps> = ({ children, className }) => {
  return (
    <div className={classNameManager.mergeClasses("text-sm [&_p]:leading-relaxed", className)}>
      {children}
    </div>
  );
};
