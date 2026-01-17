import { type VariantProps, cva } from "class-variance-authority";
import { type DetailedHTMLProps, type TextareaHTMLAttributes, forwardRef } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

import { classNameManager } from "@/utils/css";

const { mergeClasses } = classNameManager;

const variants = cva("theme-transition disabled:cursor-not-allowed", {
  variants: {
    variant: {
      text: "text-secondary-1 dark:text-gray-1 border-gray-3 dark:border-dark-1 primary-ring block w-full rounded-md border bg-white px-2.5 py-1.5 text-sm outline-none placeholder:text-gray-400 disabled:bg-gray-100 sm:leading-6 dark:bg-gray-900 disabled:dark:bg-gray-700",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  VariantProps<typeof variants> & {
    textareaClassName?: string;
    field?: ControllerRenderProps<FieldValues, string>;
    showCount?: boolean;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { name, className, variant, field, textareaClassName, showCount, value, maxLength, ...props },
    ref
  ) => {
    if (showCount && maxLength) {
      const currentLength = typeof value === "string" ? value.length : 0;

      const warningLimit = Math.floor(maxLength * 0.8);
      const isWarning = currentLength >= warningLimit && currentLength < maxLength;
      const isError = currentLength === maxLength;

      const counterColor = isError
        ? "text-red-500"
        : isWarning
          ? "text-orange-500"
          : "text-gray-500 dark:text-gray-400";

      return (
        <div className="relative w-full">
          <textarea
            ref={ref}
            name={name}
            className={mergeClasses(variants({ className: textareaClassName, variant }), "pr-20")}
            value={value}
            maxLength={maxLength}
            {...field}
            {...props}
          />
          <span
            className={mergeClasses(
              "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs",
              counterColor
            )}
          >
            {currentLength}/{maxLength}
          </span>
        </div>
      );
    }

    return (
      <textarea
        ref={ref}
        name={name}
        className={mergeClasses(variants({ className: textareaClassName, variant }))}
        value={value}
        {...field}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
