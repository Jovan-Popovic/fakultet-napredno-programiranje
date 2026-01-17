import { forwardRef, type ComponentProps, type JSX, type ReactNode, type Ref } from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { ErrorMessage } from "@/components/form/error/message";
import { Label } from "@/components/form/label";
import { Checkbox } from "@/components/ui/checkbox";

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
> =
  // Avoid conflicting 'control' by omitting it and re-declaring with precise generics
  Omit<UseControllerProps<TFieldValues, TName>, "control"> &
    ComponentProps<typeof Checkbox> & {
      /** Accept the exact Control, including context and transformed output types */
      control: Control<TFieldValues, TContext, TTransformed>;
      id?: string;
      className?: string;
      label?: ReactNode;
      labelClassName?: string;
      tooltip?: ReactNode;
      checkboxClassName?: string;
    };

const CheckboxFormFieldInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
>(
  {
    id,
    name,
    className,
    label,
    labelClassName,
    tooltip,
    control,
    rules,
    defaultValue,
    checkboxClassName,
    ...props
  }: Props<TFieldValues, TName, TContext, TTransformed>,
  ref: Ref<HTMLButtonElement>
) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController<TFieldValues, TName, TTransformed>({ name, control, rules, defaultValue });

  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <Checkbox
          ref={ref}
          id={id || name}
          checked={value}
          onCheckedChange={onChange}
          onBlur={onBlur}
          className={checkboxClassName}
          {...props}
        />
        <Label
          htmlFor={id || name}
          label={label}
          required={!!rules?.required}
          tooltip={tooltip}
          className={labelClassName}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export const CheckboxFormField = forwardRef(CheckboxFormFieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformed = unknown,
>(
  props: Props<TFieldValues, TName, TContext, TTransformed> & {
    ref?: Ref<HTMLButtonElement>;
  }
) => JSX.Element;
