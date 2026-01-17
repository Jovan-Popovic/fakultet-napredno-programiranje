import { ChevronDown } from "lucide-react";
import { useCallback, useMemo, type ChangeEvent, type FC, type SelectHTMLAttributes } from "react";
import type { ClassNames, DropdownOption } from "react-day-picker";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu/content";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu/item";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu/trigger";

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options?: DropdownOption[];
  classNames: ClassNames;
};

export const DatePickerDropdown: FC<Props> = (props) => {
  const { options = [], className = "", onChange, value } = props;

  const handleSelect = useCallback(
    (value: string) => {
      const syntheticEvent = {
        target: { value },
      } as ChangeEvent<HTMLSelectElement>;
      onChange?.(syntheticEvent);
    },
    [onChange]
  );

  // Sort years in descending order
  const sortedOptions = useMemo(() => {
    // Check if it's year dropdown
    const isYearDropdown = options.length > 0 && Number(options[0].value) > 1000;

    if (isYearDropdown) {
      return [...options].sort((a, b) => Number(b.value) - Number(a.value));
    }

    return options;
  }, [options]);

  const selectedLabel = useMemo(
    () => sortedOptions.find((opt) => String(opt.value) === String(value))?.label ?? "Select",
    [sortedOptions, value]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-0.5 rounded border bg-white px-1.5 py-1 text-sm dark:bg-transparent ${className}`}
        >
          {selectedLabel}
          <ChevronDown className="h-3 w-3" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={5}
        className="z-50 min-w-[180px] rounded-md border bg-white p-2 shadow-lg dark:bg-[#232e3e]"
      >
        {sortedOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onSelect={() => {
              handleSelect(String(opt.value));
            }}
            className={`cursor-pointer rounded px-2 py-1 text-sm hover:bg-gray-300 dark:hover:bg-gray-900 ${
              opt.value === value ? "font-bold text-gray-900" : ""
            }`}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
