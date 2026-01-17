import { CalendarIcon, X as XIcon } from "lucide-react";
import { useMemo, type InputHTMLAttributes, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

type Props<TValue> = InputHTMLAttributes<HTMLInputElement> & {
  children?: ReactNode;
  containerClassName?: string;
  selection: TValue;
  onReset: () => void;
  onToggle: () => void;
  isClearable?: boolean;
};

export const DatePickerInput = <TValue,>({
  children,
  className,
  containerClassName,
  onReset,
  onToggle,
  selection,
  value,
  placeholder,
  isClearable = true,
  disabled = false,
}: Props<TValue>) => {
  const hasSelection = useMemo<boolean>(
    () => selection !== undefined && (!Array.isArray(selection) || selection.length > 0),
    [selection]
  );

  return (
    <div className={joinClasses("relative w-full", containerClassName || "")}>
      <Button
        data-testid="open-button"
        type="button"
        variant="outline"
        className={joinClasses(
          "w-full flex-row-reverse justify-between bg-white !py-[8px] hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-800",
          className || ""
        )}
        onClick={onToggle}
        icon={CalendarIcon}
        iconClassName="w-6 h-6"
        disabled={disabled}
      >
        <div className="flex w-full items-center justify-between">
          <div className="mx-2 flex max-w-44 items-center justify-center overflow-x-hidden">
            <span>{hasSelection ? value : placeholder}</span>
          </div>
          {hasSelection && isClearable && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              data-testid="reset-icon"
              className="hover:text-foreground cursor-pointer text-gray-600 transition dark:text-gray-300"
              aria-label="Reset input"
            >
              <XIcon className="h-5 w-5" />
            </span>
          )}
        </div>
      </Button>
      {children}
    </div>
  );
};
