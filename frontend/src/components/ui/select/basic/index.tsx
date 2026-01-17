import { forwardRef, useCallback, useMemo } from "react";
import { type ControllerRenderProps, type FieldValues } from "react-hook-form";
import ReactSelect, { type SelectInstance, type Props as SelectProps } from "react-select";

import { SelectClearIndicator } from "@/components/ui/select/common/components/clear";
import { SelectDropdownIndicator } from "@/components/ui/select/common/components/dropdown";
import { SelectLoadingIndicator } from "@/components/ui/select/common/components/loading";
import { CustomOption } from "@/components/ui/select/common/components/option";
import {
  type SelectGroup,
  type SelectOption,
  type Size,
  type Spacing,
} from "@/components/ui/select/common/types/options";
import { preventSelectEnterKeySubmit } from "@/components/ui/select/common/utils/events";
import { processSelectOptions } from "@/components/ui/select/common/utils/options";
import {
  generateSelectClassNames,
  generateSelectTheme,
} from "@/components/ui/select/common/utils/styles";

export type Props = Omit<
  SelectProps<SelectOption, boolean, SelectGroup<SelectOption>>,
  "size" | "variant"
> & {
  spacing?: Spacing;
  size?: Size;
  field?: ControllerRenderProps<FieldValues, string>;

  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
};

// TODO(META-59): Make multi-select resizable
export const Select = forwardRef<
  SelectInstance<SelectOption, boolean, SelectGroup<SelectOption>>,
  Props
>(
  (
    {
      spacing = "default",
      size = "default",
      classNames,
      components,
      field,
      options,
      value,
      isSearchable,
      isMulti,

      // infinite scroll props
      hasMore = false,
      isLoadingMore = false,
      onLoadMore,

      onMenuScrollToBottom: userOnMenuScrollToBottom,

      ...props
    },
    ref
  ) => {
    const processedOptions = useMemo(() => processSelectOptions(options), [options]);

    const handleMenuScrollToBottom = useCallback(
      (event: WheelEvent | TouchEvent) => {
        userOnMenuScrollToBottom?.(event);

        if (!hasMore || isLoadingMore) return;
        onLoadMore?.();
      },
      [userOnMenuScrollToBottom, onLoadMore, hasMore, isLoadingMore]
    );

    return (
      <ReactSelect
        ref={ref}
        theme={(theme) => generateSelectTheme(theme)}
        isSearchable={isSearchable || false}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        classNames={generateSelectClassNames(classNames, spacing, size)}
        options={processedOptions}
        value={value}
        onMenuScrollToBottom={handleMenuScrollToBottom}
        onKeyDown={(event) =>
          preventSelectEnterKeySubmit(event, isSearchable || false, value, options)
        }
        components={{
          ClearIndicator: SelectClearIndicator,
          DropdownIndicator: SelectDropdownIndicator,
          LoadingIndicator: SelectLoadingIndicator,
          IndicatorSeparator: () => null,
          Option: (props) => <CustomOption {...props} size={size} />,
          ...components,
        }}
        {...field}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";
