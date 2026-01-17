import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { DayPicker, type DayPickerProps, type Matcher } from "react-day-picker";

import "react-day-picker/style.css";

import { DatePickerDayButton } from "@/components/ui/date-picker/common/components/day";
import { DatePickerDropdown } from "@/components/ui/date-picker/common/components/dropdown";
import { DatePickerFooter } from "@/components/ui/date-picker/common/components/footer";
import { DatePickerInput } from "@/components/ui/date-picker/common/components/input";
import { DatePickerTimePicker } from "@/components/ui/date-picker/common/components/time";
import { DatePickerMode } from "@/components/ui/date-picker/common/enums";
import { usePopoverScroll } from "@/components/ui/date-picker/common/hooks/scroll";
import { useTimePicker } from "@/components/ui/date-picker/common/hooks/time";
import {
  type DatePickerTypeSingle,
  type SingleMode,
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

const mode = DatePickerMode.SINGLE;

export type Props = Omit<DayPickerProps, "mode" | "disabled"> & {
  showTime?: boolean;
  value?: DatePickerTypeSingle;
  onChange?: (date: DatePickerTypeSingle) => void;
  dayPickerDisabled?: Matcher | Matcher[];
  inputClassName?: string;
  isClearable?: boolean;
  disabled?: boolean;
};

export const DatePicker: FC<Props> = (props) => {
  const {
    showTime = false,
    value,
    onChange,
    inputClassName,
    isClearable = true,
    disabled = false,
    dayPickerDisabled,
  } = props;

  const [selection, setSelection] = useState<DatePickerTypeSingle>(value ?? undefined);
  const [month, setMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const Footer = DatePickerFooter as typeof DatePickerFooter<SingleMode, DatePickerTypeSingle>;

  const Input = DatePickerInput as typeof DatePickerInput<DatePickerTypeSingle>;

  const updateSelection = useCallback(
    (val: DatePickerTypeSingle) => {
      setSelection(val);
      onChange?.(val);

      // Close the popover when a date is selected
      if (val) {
        setOpen(false);
      }
    },
    [onChange]
  );

  const { timeValue, handleTimeChange } = useTimePicker<DatePickerTypeSingle>(
    selection,
    updateSelection
  );

  const handleResetClick = useCallback(() => updateSelection(undefined), [updateSelection]);

  useEffect(() => {
    setSelection(value ?? undefined);
  }, [value]);

  usePopoverScroll(open);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const formattedValue = useMemo(
    () => formatSelection({ selection, mode, showTime }),
    [selection, showTime]
  );

  const dayPickerProps = useMemo(() => {
    // Exclude custom props that are not part of DayPickerProps
    const {
      showTime,
      value,
      onChange,
      dayPickerDisabled,
      inputClassName,
      isClearable,
      disabled,
      ...restProps
    } = props;

    return getDayPickerProps<SingleMode, DatePickerTypeSingle>({
      mode,
      selection,
      onSelect: updateSelection,
      restProps: restProps as Omit<DayPickerProps, "selected" | "onSelect" | "mode">,
    });
  }, [props, selection, updateSelection]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Input
            value={formattedValue}
            onClick={toggleOpen}
            placeholder="Select date"
            onReset={handleResetClick}
            onToggle={toggleOpen}
            selection={selection}
            className={inputClassName}
            isClearable={isClearable}
            disabled={disabled}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="max-w-[352px] p-0"
        align="start"
        side="bottom"
        avoidCollisions={false}
        hideWhenDetached={false}
        collisionPadding={0}
        role="dialog"
        aria-label="Date picker calendar"
      >
        <div className="p-3">
          {showTime && (
            <DatePickerTimePicker timeValue={timeValue} onTimeChange={handleTimeChange} />
          )}

          <DayPicker
            footer={<Footer mode={mode} selection={selection} />}
            className={joinClasses(
              showTime && "border-border border-t",
              "px-0 pb-3 text-gray-950 dark:bg-gray-900 dark:text-gray-50",
              props.className || ""
            )}
            classNames={{
              month: "space-y-2",
              chevron:
                "inline-flex w-6 h-6 ml-2 rounded-md fill-gray-950 dark:fill-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer p-1",
              caption_label: "text-sm font-medium text-foreground",
              nav: "space-x-1 flex items-center",
              nav_button:
                "h-8 w-8 p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-950 dark:hover:text-gray-50",
              day: "h-6 w-6 text-sm rounded-md transition-colors text-gray-950 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-500 hover:text-gray-950 dark:hover:text-gray-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring",
              selected:
                "!bg-gray-300 dark:!bg-gray-600 text-gray-950 dark:text-gray-50 hover:bg-gray-950/90 dark:hover:bg-gray-100/90 focus:bg-gray-950/90 dark:focus:bg-gray-100/9 rounded-md",
              today: "text-gray-950 dark:text-gray-100 font-bold rounded-md",
              ...props.classNames,
            }}
            components={{
              Dropdown: (props) => <DatePickerDropdown {...props} />,
              DayButton: (props) => <DatePickerDayButton {...props} />,
              ...props.components,
            }}
            navLayout="around"
            captionLayout="dropdown"
            startMonth={new Date(2025, 0)}
            endMonth={new Date(2030, 11)}
            animate
            month={month}
            onMonthChange={setMonth}
            disabled={dayPickerDisabled}
            {...dayPickerProps}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
