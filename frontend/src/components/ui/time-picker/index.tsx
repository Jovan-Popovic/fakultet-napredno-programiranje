import { Clock } from "lucide-react";
import { type FC, useEffect, useRef, useState } from "react";

export type TimePickerProps = {
  value: string; // Format: "HH:MM" (24-hour format)
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  disabledHours?: number[]; // Array of hours to disable (0-23)
  use12Hour?: boolean; // Display in 12-hour format with AM/PM
};

export const TimePicker: FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder = "Select time",
  disabled = false,
  disabledHours = [],
  use12Hour = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse value into hour, minute, period
  useEffect(() => {
    if (value && value.includes(":")) {
      const parts = value.split(":");
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);

      if (isNaN(hours) || isNaN(minutes)) {
        setSelectedHour(null);
        setSelectedMinute(null);
        setPeriod("AM");
        return;
      }

      if (use12Hour) {
        const isPM = hours >= 12;
        const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        setSelectedHour(displayHour);
        setPeriod(isPM ? "PM" : "AM");
      } else {
        setSelectedHour(hours);
      }

      setSelectedMinute(minutes);
    } else {
      setSelectedHour(null);
      setSelectedMinute(null);
      setPeriod("AM");
    }
  }, [value, use12Hour]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour);
    updateTime(hour, selectedMinute, period);
  };

  const handleMinuteSelect = (minute: number) => {
    setSelectedMinute(minute);
    updateTime(selectedHour, minute, period);
  };

  const handlePeriodSelect = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    updateTime(selectedHour, selectedMinute, newPeriod);
  };

  const updateTime = (hour: number | null, minute: number | null, timePeriod: "AM" | "PM") => {
    if (hour !== null && minute !== null) {
      let hour24 = hour;

      if (use12Hour) {
        if (timePeriod === "PM" && hour !== 12) {
          hour24 = hour + 12;
        } else if (timePeriod === "AM" && hour === 12) {
          hour24 = 0;
        }
      }

      const timeString = `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      onChange(timeString);
    }
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedHour(null);
    setSelectedMinute(null);
    setPeriod("AM");
    onChange("");
    setIsOpen(false);
  };

  const formatDisplayValue = () => {
    if (selectedHour === null || selectedMinute === null) return "";

    if (use12Hour) {
      return `${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")} ${period}`;
    }

    return `${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`;
  };

  const isHourDisabled = (hour: number): boolean => {
    if (use12Hour) {
      // Convert 12-hour to 24-hour for checking
      let hour24 = hour;
      if (period === "PM" && hour !== 12) {
        hour24 = hour + 12;
      } else if (period === "AM" && hour === 12) {
        hour24 = 0;
      }

      return disabledHours.includes(hour24);
    }

    return disabledHours.includes(hour);
  };

  // Generate hours array
  const hours = use12Hour
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="relative w-full max-w-32" ref={dropdownRef}>
      <div className="relative w-full">
        <input
          type="text"
          className="focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-600 block w-full cursor-pointer rounded-lg border [border-color:var(--color-gray-300)] bg-transparent py-2 ps-3 pe-10 text-sm disabled:pointer-events-none disabled:opacity-50 dark:[border-color:var(--color-gray-600)] dark:text-neutral-200 dark:placeholder-neutral-400"
          placeholder={placeholder}
          value={formatDisplayValue()}
          readOnly
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        />

        <div className="absolute inset-y-0 end-0 flex items-center pe-3">
          <button
            type="button"
            className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-label="Toggle time picker"
          >
            <Clock className="size-4 shrink-0" />
          </button>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 min-w-[240px] rounded-lg border border-gray-200 bg-white shadow-xl dark:border-neutral-700 dark:[background-color:var(--color-gray-900)]">
          <div className="flex flex-row divide-x divide-gray-200 dark:divide-neutral-700">
            {/* Hours */}
            <div className="max-h-56 overflow-y-auto p-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-neutral-800">
              {hours.map((hour) => {
                const hourDisabled = isHourDisabled(hour);
                const isSelected = selectedHour === hour;

                return (
                  <label
                    key={`hour-${hour}`}
                    className={`group relative flex w-10 items-center justify-center rounded-md p-1.5 text-center text-sm ${
                      isSelected
                        ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500 border bg-white dark:bg-transparent"
                        : "text-gray-800 hover:bg-gray-100 hover:text-gray-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                    } ${
                      hourDisabled
                        ? "text-gray-200 after:absolute after:inset-0 after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-gray-200)_calc(50%-1px),var(--color-gray-200)_50%,transparent_50%)] dark:text-neutral-700 dark:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%-1px),var(--color-neutral-700)_calc(50%-1px),var(--color-neutral-700)_50%,transparent_50%)]"
                        : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => !hourDisabled && handleHourSelect(hour)}
                      disabled={hourDisabled}
                    />
                    <span className="block">{String(hour).padStart(2, "0")}</span>
                  </label>
                );
              })}
            </div>

            {/* Minutes */}
            <div className="max-h-56 overflow-y-auto p-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-neutral-800">
              {minutes.map((minute) => {
                const isSelected = selectedMinute === minute;

                return (
                  <label
                    key={`minute-${minute}`}
                    className={`group relative flex w-10 cursor-pointer items-center justify-center rounded-md p-1.5 text-center text-sm ${
                      isSelected
                        ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500 border bg-white dark:bg-transparent"
                        : "text-gray-800 hover:bg-gray-100 hover:text-gray-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => handleMinuteSelect(minute)}
                    />
                    <span className="block">{String(minute).padStart(2, "0")}</span>
                  </label>
                );
              })}
            </div>

            {/* AM/PM for 12-hour format */}
            {use12Hour && (
              <div className="max-h-56 overflow-y-auto p-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-neutral-800">
                {["AM", "PM"].map((p) => {
                  const isSelected = period === p;

                  return (
                    <label
                      key={p}
                      className={`group relative flex w-10 cursor-pointer items-center justify-center rounded-md p-1.5 text-center text-sm ${
                        isSelected
                          ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500 border bg-white dark:bg-transparent"
                          : "text-gray-800 hover:bg-gray-100 hover:text-gray-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                      }`}
                    >
                      <input
                        type="radio"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => handlePeriodSelect(p as "AM" | "PM")}
                      />
                      <span className="block">{p}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 border-t border-gray-200 px-3 py-2 dark:border-neutral-700">
            <button
              type="button"
              className="cursor-pointer rounded-md px-2.5 py-1 text-[13px] font-medium text-gray-600 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 cursor-pointer rounded-md px-2.5 py-1 text-[13px] font-medium text-white focus:ring-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              onClick={handleOk}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
