import { Info } from "lucide-react";
import {
  forwardRef,
  useCallback,
  type FocusEvent,
  type JSX,
  type ReactNode,
  type Ref,
} from "react";
import type { Control, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import { ErrorMessage } from "@/components/form/error/message";
import { Label } from "@/components/form/label";
import { NumberInput, type Props as NumberInputProps } from "@/components/ui/number-input";
import { Paragraph } from "@/components/ui/typography/paragraph";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> &
    Omit<NumberInputProps, "value"> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      inputClassName?: string;
      label?: ReactNode;
      labelClassName?: string;
      tooltip?: ReactNode;
      helpText?: string | ReactNode;
      infoMessage?: string;
      /** Strictly enforce min/max bounds during input */
      strictBounds?: boolean;
    };

const NumberInputFormFieldInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
>(
  {
    id,
    name,
    className,
    inputClassName,
    variant,
    label,
    labelClassName,
    tooltip,
    control,
    rules,
    defaultValue,
    helpText,
    infoMessage,
    strictBounds,
    onChange: outerOnChange,
    ...rest
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLInputElement>
) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = useCallback(
    (value: number | null) => {
      onChange(value);
      outerOnChange?.(value, String(value));
    },
    [onChange, outerOnChange]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      // Get the current value from the input
      const inputValue = event.target.value;

      let finalValue: number | null = null;
      if (inputValue && inputValue.trim() !== "") {
        const parsed = parseFloat(inputValue);
        if (!isNaN(parsed)) {
          finalValue = parsed;
        }
      }

      // Check if input is empty and strictBounds is enabled
      if (strictBounds && finalValue === null && rest.min !== undefined) {
        finalValue = rest.min;
      }

      // Update value and trigger validation on blur
      handleChange(finalValue);
      onBlur();
      rest.onBlur?.(event);
    },
    [strictBounds, rest, handleChange, onBlur]
  );

  return (
    <div className={className}>
      <Label
        htmlFor={id}
        label={label}
        required={!!rules?.required}
        tooltip={tooltip}
        className={labelClassName || ""}
      />
      <div className={joinClasses(label ? "mt-2" : "", "relative")}>
        <NumberInput
          {...rest}
          ref={ref}
          id={id || name}
          className={inputClassName}
          variant={variant}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <ErrorMessage error={error} />
        {infoMessage && (
          <Paragraph className="mt-2 flex items-center gap-x-2 text-xs">
            <Info className="h-3 w-3" />
            <span>{infoMessage}</span>
          </Paragraph>
        )}
        {helpText && <Paragraph className="mt-1 text-xs text-gray-500">{helpText}</Paragraph>}
      </div>
    </div>
  );
};

export const NumberInputFormField = forwardRef(NumberInputFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & { ref?: Ref<HTMLInputElement> }
) => JSX.Element;
