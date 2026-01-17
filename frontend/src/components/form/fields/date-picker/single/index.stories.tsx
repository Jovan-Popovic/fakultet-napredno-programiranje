import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm, type Control, type FieldValues } from "react-hook-form";
import { object, type infer as inferType } from "zod";

import { zodDateValue, zodDateValueFormatted, zodDateValueWithTimezone } from "./schemas";

import { DatePickerSingleFormField } from ".";

import type { DatePickerTypeSingle } from "@/components/ui/date-picker/common/types/date-picker";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof DatePickerSingleFormField> = {
  title: "Form/DatePicker/Single",
  component: DatePickerSingleFormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field component for single date selection with react-hook-form integration.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePickerSingleFormField>;

/* ------------------------------------------------------------------ */
/*  Types + Form Wrapper                                              */
/* ------------------------------------------------------------------ */
type FormValues = {
  date: DatePickerTypeSingle;
  dateTime: DatePickerTypeSingle;
  requiredDate: DatePickerTypeSingle;
  defaultDate: DatePickerTypeSingle;
  disabledDate: DatePickerTypeSingle;
  tooltipDate: DatePickerTypeSingle;
  customDate: DatePickerTypeSingle;
};

/* ------------------------------------------------------------------ */
/*  Stories                                                           */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: {
        date: undefined,
        dateTime: undefined,
        requiredDate: undefined,
        defaultDate: undefined,
        disabledDate: undefined,
        tooltipDate: undefined,
        customDate: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerSingleFormField<FormValues>
            name="date"
            control={control}
            label="Select Date"
          />
        </form>
      </FormProvider>
    );
  },
};

export const WithTime: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: {
        date: undefined,
        dateTime: undefined,
        requiredDate: undefined,
        defaultDate: undefined,
        disabledDate: undefined,
        tooltipDate: undefined,
        customDate: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerSingleFormField<FormValues>
            name="dateTime"
            control={control}
            label="Select Date & Time"
            showTime={true}
          />
        </form>
      </FormProvider>
    );
  },
};

export const Required: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: {
        date: undefined,
        dateTime: undefined,
        requiredDate: undefined,
        defaultDate: undefined,
        disabledDate: undefined,
        tooltipDate: undefined,
        customDate: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerSingleFormField<FormValues>
            name="requiredDate"
            control={control}
            label="Required Date"
            rules={{ required: "Date is required" }}
          />
        </form>
      </FormProvider>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const today = new Date();

    const formMethods = useForm<FormValues>({
      defaultValues: {
        date: undefined,
        dateTime: undefined,
        requiredDate: undefined,
        defaultDate: today,
        disabledDate: undefined,
        tooltipDate: undefined,
        customDate: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerSingleFormField<FormValues>
            name="defaultDate"
            control={control}
            label="Date with Default Value"
          />
        </form>
      </FormProvider>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const today = new Date();

    const formMethods = useForm<FormValues>({
      defaultValues: {
        date: undefined,
        dateTime: undefined,
        requiredDate: undefined,
        defaultDate: undefined,
        disabledDate: today,
        tooltipDate: undefined,
        customDate: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerSingleFormField<FormValues>
            name="disabledDate"
            control={control}
            label="Disabled Date"
            disabled={true}
          />
        </form>
      </FormProvider>
    );
  },
};

export const WithTooltip: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: {
        date: undefined,
        dateTime: undefined,
        requiredDate: undefined,
        defaultDate: undefined,
        disabledDate: undefined,
        tooltipDate: undefined,
        customDate: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerSingleFormField<FormValues>
            name="tooltipDate"
            control={control}
            label="Date with Tooltip"
            tooltip="This is a helpful tooltip explaining the date field"
          />
        </form>
      </FormProvider>
    );
  },
};

export const CustomClassName: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: {
        date: undefined,
        dateTime: undefined,
        requiredDate: undefined,
        defaultDate: undefined,
        disabledDate: undefined,
        tooltipDate: undefined,
        customDate: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerSingleFormField<FormValues>
            name="customDate"
            control={control}
            label="Custom Styled Date"
            className="rounded-lg bg-gray-50 p-4"
            labelClassName="text-blue-600 font-semibold"
          />
        </form>
      </FormProvider>
    );
  },
};

export const BaseSchema: Story = {
  render: () => {
    type FormRecord = {
      dateSingle?: Date;
    };

    const schemaFormatRequired = object({
      dateSingle: zodDateValue(),
    });

    type TransformedFormRecord = inferType<typeof schemaFormatRequired>;

    const myDefaultDate: FormRecord = {
      dateSingle: new Date("2025-01-01"),
    };

    const formMethods = useForm<FormRecord, void, TransformedFormRecord>({
      defaultValues: myDefaultDate,
      resolver: zodResolver(schemaFormatRequired),
    });

    const { control, handleSubmit, watch, formState } = formMethods;
    const { errors } = formState;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data, null, 2));
          })}
        >
          <DatePickerSingleFormField
            name="dateSingle"
            control={control}
            label="Select Date Single"
          />
          {errors.dateSingle && (
            <p style={{ color: "red" }}>
              {errors.dateSingle.message || JSON.stringify(errors.dateSingle, null, 2)}
            </p>
          )}
          <pre className="rounded-s bg-gray-50 p-1 dark:bg-gray-900">
            {JSON.stringify(watch("dateSingle"), null, 2)}
          </pre>
          <button
            type="submit"
            className="z-50 cursor-pointer"
            style={{ padding: "0.5rem", background: "#333", color: "#fff" }}
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const FormattedSchema: Story = {
  render: () => {
    type FormRecord = {
      dateSingle?: Date;
    };

    const schemaFormatted = object({
      dateSingle: zodDateValueFormatted(),
    });
    type TransformedFormRecord = inferType<typeof schemaFormatted>;

    const formMethods = useForm<FormRecord, void, TransformedFormRecord>({
      defaultValues: { dateSingle: undefined },
      resolver: zodResolver(schemaFormatted),
    });

    const { control, handleSubmit, watch, formState } = formMethods;
    const { errors } = formState;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
        >
          <DatePickerSingleFormField
            name="dateSingle"
            control={control as unknown as Control<FieldValues>}
            label="Select Date Single (Formatted)"
          />
          {errors.dateSingle && <p style={{ color: "red" }}>{errors.dateSingle.message}</p>}
          <pre style={{ background: "#f5f5f5", padding: "0.5rem", borderRadius: "4px" }}>
            {JSON.stringify(watch("dateSingle"), null, 2)}
          </pre>
          <button type="submit" style={{ padding: "0.5rem", background: "#333", color: "#fff" }}>
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const FormattedSchemaWithTimezone: Story = {
  render: () => {
    type FormRecord = {
      dateSingle?: Date;
    };

    const schemaFormattedWithTimezone = object({
      dateSingle: zodDateValueWithTimezone(),
    });
    type TransformedFormRecord = inferType<typeof schemaFormattedWithTimezone>;

    const formMethods = useForm<FormRecord, void, TransformedFormRecord>({
      defaultValues: { dateSingle: undefined },
      resolver: zodResolver(schemaFormattedWithTimezone),
    });

    const { control, handleSubmit, watch, formState } = formMethods;
    const { errors } = formState;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
        >
          <DatePickerSingleFormField
            name="dateSingle"
            control={control as unknown as Control<FieldValues>}
            label="Select Date Single (Formatted)"
          />
          {errors.dateSingle && <p style={{ color: "red" }}>{errors.dateSingle.message}</p>}
          <pre style={{ background: "#f5f5f5", padding: "0.5rem", borderRadius: "4px" }}>
            {JSON.stringify(watch("dateSingle"), null, 2)}
          </pre>
          <button type="submit" style={{ padding: "0.5rem", background: "#333", color: "#fff" }}>
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};
