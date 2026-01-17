import type { FC } from "react";
import type { Control, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import { Controller } from "react-hook-form";

import { ErrorMessage } from "@/components/form/error/message";
import { TimePicker, type TimePickerProps } from "@/components/ui/time-picker";

type TimePickerFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> &
    Omit<TimePickerProps, "value" | "onChange"> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      /** Optional custom onChange handler */
      onChange?: (value: string) => void;
    };

export const TimePickerFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
>({
  name,
  control,
  rules,
  defaultValue,
  onChange: customOnChange,
  ...timePickerProps
}: TimePickerFormFieldProps<TFieldValues, TName, TContext, TTransformed>): ReturnType<FC> => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div>
          <TimePicker
            value={field.value || ""}
            onChange={(value) => {
              field.onChange(value);
              customOnChange?.(value);
            }}
            {...timePickerProps}
          />
          <ErrorMessage error={error} />
        </div>
      )}
    />
  );
};
