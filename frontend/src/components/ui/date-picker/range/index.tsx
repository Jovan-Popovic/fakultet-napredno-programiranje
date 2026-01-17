import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { type DateRange, DayPicker, type DayPickerProps, type Matcher } from "react-day-picker";

import "react-day-picker/style.css";

import { DatePickerDayButton } from "@/components/ui/date-picker/common/components/day";
import { DatePickerDropdown } from "@/components/ui/date-picker/common/components/dropdown";
import { DatePickerFooter } from "@/components/ui/date-picker/common/components/footer";
import { DatePickerInput } from "@/components/ui/date-picker/common/components/input";
import { DatePickerQuickPresetButtons } from "@/components/ui/date-picker/common/components/range-buttons";
import { DatePickerMode } from "@/components/ui/date-picker/common/enums";
import { usePopoverScroll } from "@/components/ui/date-picker/common/hooks/scroll";
import {
  type DatePickerTypeRange,
  type RangeMode,
} from "@/components/ui/date-picker/common/types/date-picker";
import {
  formatSelection,
  getDayPickerProps,
} from "@/components/ui/date-picker/common/utils/format";
import { Popover } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover/components/content";
import { PopoverTrigger } from "@/components/ui/popover/components/trigger";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

const mode = DatePickerMode.RANGE;

export type Props = Omit<DayPickerProps, "mode" | "disabled"> & {
  value?: DatePickerTypeRange;
  onChange?: (date: DatePickerTypeRange) => void;
  isClearable?: boolean;
  dayPickerDisabled?: Matcher | Matcher[];
  disabled?: boolean;
};

export const DatePickerRange: FC<Props> = (props) => {
  const {
    value,
    onChange,
    isClearable = true,
    dayPickerDisabled,
    disabled = false,
    ...dayPickerRestProps
  } = props;

  const [selection, setSelection] = useState<DatePickerTypeRange>(value ?? undefined);
  const [month, setMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  const DatePickerPresetsButtons =
    DatePickerQuickPresetButtons as typeof DatePickerQuickPresetButtons<
      DatePickerTypeRange,
      RangeMode
    >;

  const Footer = DatePickerFooter as typeof DatePickerFooter<RangeMode, DatePickerTypeRange>;

  const Input = DatePickerInput as typeof DatePickerInput<DatePickerTypeRange>;

  const updateSelection = useCallback(
    (newValue: DatePickerTypeRange) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // CASE 1: User clicked the same already selected date (react-day-picker returns undefined)
      if (newValue === undefined) {
        const isTodaySelected =
          selection?.from &&
          selection?.to &&
          selection.from.getTime() === today.getTime() &&
          selection.to.getTime() === today.getTime();

        const isSingleDate =
          selection?.from && selection?.to && selection.from.getTime() === selection.to.getTime();

        // If user is in selecting mode and clicks same date twice → close picker
        if (isSingleDate && isSelectingRange) {
          setIsSelectingRange(false);
          setOpen(false);
          return;
        }

        if (isTodaySelected) {
          // Clicking today when today is selected (not in selecting mode) → close picker
          setIsSelectingRange(false);
          setOpen(false);
        } else if (isSingleDate) {
          // Clicking same non-today date → switch to today as single date (start of new range)
          setSelection({ from: today, to: today });
          onChange?.({ from: today, to: today });
          setIsSelectingRange(true);
        } else {
          // Other case → just clear
          setSelection(undefined);
          onChange?.(undefined);
        }

        return;
      }

      // CASE 2: Check if we currently have a complete range (from !== to)
      const hasCompleteRange =
        selection?.from && selection?.to && selection.from.getTime() !== selection.to.getTime();

      if (hasCompleteRange) {
        // User is clicking a new date while having a complete range
        // We need to RESET and start a new range from the clicked date
        const newValueIsRange =
          newValue?.from && newValue?.to && newValue.from.getTime() !== newValue.to.getTime();

        if (newValueIsRange) {
          // React-day-picker is trying to extend/create a range, but we want to reset
          let clickedDate: Date | undefined;

          const fromTime = newValue.from?.getTime();
          const toTime = newValue.to?.getTime();
          const currentFromTime = selection.from?.getTime();
          const currentToTime = selection.to?.getTime();

          // The clicked date is the one that's NOT in our current selection
          if (fromTime !== currentFromTime && fromTime !== currentToTime) {
            clickedDate = newValue.from;
          } else if (toTime !== currentFromTime && toTime !== currentToTime) {
            clickedDate = newValue.to;
          }

          if (clickedDate) {
            // Reset to the clicked date as a single date
            setSelection({ from: clickedDate, to: clickedDate });
            onChange?.({ from: clickedDate, to: clickedDate });
            setIsSelectingRange(true);
            return;
          }
        }
      }

      // CASE 3: Check if we have a single date and user is trying to complete the range
      const hasSingleDate =
        selection?.from && selection?.to && selection.from.getTime() === selection.to.getTime();

      const newValueIsRange =
        newValue?.from && newValue?.to && newValue.from.getTime() !== newValue.to.getTime();

      if (hasSingleDate && newValueIsRange && isSelectingRange) {
        // User is completing the range → allow it and close picker
        setSelection(newValue);
        onChange?.(newValue);
        setIsSelectingRange(false);
        setOpen(false);
        return;
      }

      if (hasSingleDate && newValueIsRange && !isSelectingRange) {
        // User has a single date (probably default) and clicking to start fresh range
        // Reset to the clicked date
        let clickedDate: Date | undefined;

        const fromTime = newValue.from?.getTime();
        const toTime = newValue.to?.getTime();
        const currentFromTime = selection.from?.getTime();
        const currentToTime = selection.to?.getTime();

        if (fromTime !== currentFromTime && fromTime !== currentToTime) {
          clickedDate = newValue.from;
        } else if (toTime !== currentFromTime && toTime !== currentToTime) {
          clickedDate = newValue.to;
        }

        if (clickedDate) {
          setSelection({ from: clickedDate, to: clickedDate });
          onChange?.({ from: clickedDate, to: clickedDate });
          setIsSelectingRange(true);
          return;
        }
      }

      // CASE 4: Normal flow
      const isCompleteRange =
        newValue?.from && newValue?.to && newValue.from.getTime() !== newValue.to.getTime();

      const isSingleDate =
        newValue?.from && newValue?.to && newValue.from.getTime() === newValue.to.getTime();

      if (isCompleteRange) {
        // User completed a range → close picker
        setSelection(newValue);
        onChange?.(newValue);
        setIsSelectingRange(false);
        setOpen(false);
      } else if (isSingleDate) {
        // User clicked a single date
        setSelection(newValue);
        onChange?.(newValue);
        setIsSelectingRange(true);
      } else {
        // Other cases → just update
        setSelection(newValue);
        onChange?.(newValue);
      }
    },
    [onChange, selection, isSelectingRange]
  );

  const handleResetClick = useCallback(() => {
    updateSelection(undefined);
  }, [updateSelection]);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const formattedValue = useMemo(() => formatSelection({ selection, mode }), [selection]);

  const dayPickerProps = useMemo(
    () =>
      getDayPickerProps<RangeMode, DatePickerTypeRange>({
        mode,
        selection,
        onSelect: updateSelection,
        restProps: dayPickerRestProps,
      }),
    [dayPickerRestProps, selection, updateSelection]
  );

  const handlePresetSelect = useCallback(
    (preset: DatePickerTypeRange) => {
      if (!preset || typeof preset !== "object" || !("from" in preset)) {
        updateSelection(undefined);
        return;
      }

      setSelection(preset as DateRange);
      onChange?.(preset as DateRange);

      if (preset.from) {
        setMonth(preset.from);
      }

      // Close picker when preset is selected
      if (preset.from && preset.to) {
        setOpen(false);
      }
    },
    [onChange, updateSelection]
  );

  useEffect(() => {
    setSelection(value ?? undefined);
  }, [value]);

  useEffect(() => {
    // Reset selection state when picker opens
    if (open) {
      setIsSelectingRange(false);
    }
  }, [open]);

  usePopoverScroll(open);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full">
          <Input
            value={formattedValue}
            onClick={toggleOpen}
            placeholder="Select date range"
            onReset={handleResetClick}
            onToggle={toggleOpen}
            selection={selection}
            isClearable={isClearable}
            disabled={disabled}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="!z-30 w-[310px] !border !border-gray-200 !bg-white !p-0 md:w-[280px] dark:!border-[#2E3D52] dark:!bg-[#232e3e]"
        align="start"
        side="bottom"
        avoidCollisions={false}
        hideWhenDetached={false}
        collisionPadding={0}
        role="dialog"
        aria-label="Date range picker calendar"
      >
        <div className="flex flex-col">
          <div className="flex w-full justify-center sm:[&_table_button]:!h-8 sm:[&_table_button]:!w-8 sm:[&_table_button]:!min-w-8 sm:[&_th]:!w-8">
            <DayPicker
              footer={<Footer mode={mode} selection={selection} />}
              className={joinClasses(
                "!bg-transparent text-gray-950 dark:bg-[#232e3e] dark:text-gray-50 [&_table]:!mx-auto [&_table]:!border-separate [&_table]:!border-spacing-y-1.5",
                props.className || ""
              )}
              classNames={{
                month: "space-y-2",
                chevron:
                  "inline-flex w-6 h-6 ml-2 rounded-md fill-gray-950 dark:fill-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer p-1",
                caption_label: "text-sm font-medium text-gray-950 dark:text-gray-50",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "h-8 w-8 p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-950 dark:hover:text-gray-50",
                day: "text-gray-700 border-1 border-transparent hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 h-[36px] w-[36px] text-sm rounded-md transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
                selected: "!rounded-none",
                range_middle:
                  "!bg-[#b9dcfe] dark:!bg-[#374151] hover:!bg-[#b9dcfe]/90 dark:hover:!bg-[#374151]/90 dark!text-white dark:!text-white !rounded-none",
                today: "text-gray-950 dark:text-gray-100 font-bold rounded-md",
                range_start:
                  "!bg-[#34a1fc] dark:!bg-[#00366B] !text-white dark:!text-white !rounded-l-md hover:!bg-[#34a1fc]/90 dark:hover:!bg-[#00366B]/90",
                range_end:
                  "!bg-[#34a1fc] dark:!bg-[#00366B] !text-white dark:!text-white !rounded-r-md hover:!bg-[#34a1fc]/90 dark:hover:!bg-[#00366B]/90",
                ...props.classNames,
              }}
              components={{
                Dropdown: (props) => <DatePickerDropdown {...props} />,
                DayButton: (props) => <DatePickerDayButton {...props} />,
              }}
              navLayout="around"
              captionLayout="dropdown"
              animate
              month={month}
              onMonthChange={setMonth}
              disabled={dayPickerDisabled}
              {...dayPickerProps}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-b-md border-t border-gray-200 !bg-transparent p-2 sm:gap-1.5 dark:border-[#2E3D52] dark:bg-[#232e3e]">
            <DatePickerPresetsButtons
              mode={mode}
              selection={selection as DatePickerTypeRange}
              onSelect={handlePresetSelect}
              dayPickerDisabled={dayPickerDisabled}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
