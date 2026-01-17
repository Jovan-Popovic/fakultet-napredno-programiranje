import { useCallback } from "react";
import { type DateRange, type Matcher } from "react-day-picker";

import { getPresetsForMode } from "@/components/ui/date-picker/common/utils/presets";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

/**
 * Checks if a date is disabled according to a Matcher
 */
const isDateDisabled = (date: Date, matcher?: Matcher | Matcher[]): boolean => {
  if (!matcher) return false;

  const checkSingleMatcher = (d: Date, m: Matcher): boolean => {
    // Function matcher
    if (typeof m === "function") {
      return m(d);
    }

    // Date matcher
    if (m instanceof Date) {
      return d.toDateString() === m.toDateString();
    }

    // Array of matchers
    if (Array.isArray(m)) {
      return m.some((matcher) => checkSingleMatcher(d, matcher));
    }

    // Object matcher (DateRange, DateBefore, DateAfter, DayOfWeek, DateInterval)
    if (typeof m === "object") {
      // DateRange: { from: Date, to: Date }
      if ("from" in m && "to" in m) {
        const range = m as DateRange;
        if (range.from && range.to) {
          return d >= range.from && d <= range.to;
        }

        if (range.from) {
          return d >= range.from;
        }

        if (range.to) {
          return d <= range.to;
        }
      }

      // DateBefore: { before: Date }
      if ("before" in m && m.before instanceof Date) {
        return d < m.before;
      }

      // DateAfter: { after: Date }
      if ("after" in m && m.after instanceof Date) {
        return d > m.after;
      }

      // DayOfWeek: { dayOfWeek: number[] }
      if ("dayOfWeek" in m && Array.isArray(m.dayOfWeek)) {
        return m.dayOfWeek.includes(d.getDay());
      }
    }

    return false;
  };

  if (Array.isArray(matcher)) {
    return matcher.some((m) => checkSingleMatcher(date, m));
  }

  return checkSingleMatcher(date, matcher);
};

type Props<TValue, TMode> = {
  mode: TMode;
  selection: TValue;
  onSelect: (value: TValue) => void;
  dayPickerDisabled?: Matcher | Matcher[];
};

export const DatePickerQuickPresetButtons = <TValue, TMode>({
  mode,
  selection,
  onSelect,
  dayPickerDisabled,
}: Props<TValue, TMode>) => {
  const presets = getPresetsForMode<TMode>(mode);

  /**
   * Checks if any date in the preset is disabled
   */
  const isPresetDisabled = useCallback(
    (preset: { label: string; range?: DateRange; date?: Date; dates?: Date[] }): boolean => {
      // Single date
      if ("date" in preset && preset.date) {
        return isDateDisabled(preset.date, dayPickerDisabled);
      }

      // Multiple dates
      if ("dates" in preset && preset.dates) {
        return preset.dates.some((date) => isDateDisabled(date, dayPickerDisabled));
      }

      // Date range
      if ("range" in preset && preset.range) {
        const { from, to } = preset.range;

        if (from && isDateDisabled(from, dayPickerDisabled)) return true;

        if (to && isDateDisabled(to, dayPickerDisabled)) return true;

        // Check dates in between for range
        if (from && to) {
          const daysDiff = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

          for (let i = 1; i < daysDiff; i++) {
            const dateToCheck = new Date(from);
            dateToCheck.setDate(from.getDate() + i);

            if (isDateDisabled(dateToCheck, dayPickerDisabled)) {
              return true;
            }
          }
        }
      }

      return false;
    },
    [dayPickerDisabled]
  );

  const isEqual = useCallback(
    (selectionValue: TValue, presetValue: TValue): boolean => {
      if (!selectionValue || !presetValue) return false;

      if (mode === "single") {
        if (selectionValue instanceof Date && presetValue instanceof Date) {
          return selectionValue.getTime() === presetValue.getTime();
        }
      }

      if (mode === "multiple") {
        if (
          Array.isArray(selectionValue) &&
          Array.isArray(presetValue) &&
          selectionValue.every((d) => d instanceof Date) &&
          presetValue.every((d) => d instanceof Date)
        ) {
          if (selectionValue.length !== presetValue.length) return false;

          return selectionValue.every(
            (date, index) => date.getTime() === presetValue[index].getTime()
          );
        }
      }

      if (mode === "range") {
        const isValidRange = (
          value: Partial<{ from: Date; to: Date }>
        ): value is { from?: Date; to?: Date } => {
          return typeof value === "object" && value !== null && "from" in value;
        };

        if (isValidRange(selectionValue) && isValidRange(presetValue)) {
          const selectionRange = selectionValue;
          const presetRange = presetValue;

          const isFromEqual =
            selectionRange.from instanceof Date &&
            presetRange.from instanceof Date &&
            selectionRange.from.getTime() === presetRange.from.getTime();

          const isToEqual =
            (!selectionRange.to && !presetRange.to) ||
            (selectionRange.to instanceof Date &&
              presetRange.to instanceof Date &&
              selectionRange.to.getTime() === presetRange.to.getTime());

          return isFromEqual && isToEqual;
        }
      }

      return false;
    },
    [mode]
  );

  return (
    <>
      {presets.map((preset) => {
        const presetValue =
          "range" in preset
            ? (preset.range as TValue)
            : "date" in preset
              ? (preset.date as TValue)
              : (preset.dates as TValue);

        const isActive = isEqual(selection, presetValue);
        const isDisabled = isPresetDisabled(preset);

        return (
          <button
            key={preset.label}
            data-testid="preset-button"
            onClick={() => onSelect(presetValue)}
            disabled={isDisabled}
            className={joinClasses(
              "h-10 w-full rounded-md border px-2 text-xs font-medium whitespace-nowrap transition-colors sm:h-8 sm:px-1",
              isDisabled
                ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-600"
                : "cursor-pointer",
              !isDisabled && isActive
                ? "border bg-[#34a1fc] text-white dark:bg-[#00366B]"
                : !isDisabled &&
                    "text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
            )}
          >
            {preset.label}
          </button>
        );
      })}
    </>
  );
};
