import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm, type Control, type FieldValues } from "react-hook-form";
import { object, type infer as inferType } from "zod";

import {
  zodDateRangeValue,
  zodDateRangeValueFormatted,
  zodOptionalDateRangeValue,
  zodOptionalDateRangeValueFormatted,
} from "./schemas";

import { DatePickerRangeFormField } from ".";

import type { DatePickerTypeRange } from "@/components/ui/date-picker/common/types/date-picker";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof DatePickerRangeFormField> = {
  title: "Form/DatePicker/Range",
  component: DatePickerRangeFormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field component for date range selection with react-hook-form integration.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePickerRangeFormField>;

/* ------------------------------------------------------------------ */
/*  Types + Form Wrapper                                              */
/* ------------------------------------------------------------------ */
type FormValues = {
  dateRange: DatePickerTypeRange;
  requiredDateRange: DatePickerTypeRange;
  defaultDateRange: DatePickerTypeRange;
  disabledDateRange: DatePickerTypeRange;
  tooltipDateRange: DatePickerTypeRange;
  validatedDateRange: DatePickerTypeRange;
};

/* ------------------------------------------------------------------ */
/*  Stories                                                           */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: {
        dateRange: undefined,
        requiredDateRange: undefined,
        defaultDateRange: undefined,
        disabledDateRange: undefined,
        tooltipDateRange: undefined,
        validatedDateRange: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerRangeFormField<FormValues>
            name="dateRange"
            control={control}
            label="Select Date Range"
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
        dateRange: undefined,
        requiredDateRange: undefined,
        defaultDateRange: undefined,
        disabledDateRange: undefined,
        tooltipDateRange: undefined,
        validatedDateRange: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerRangeFormField<FormValues>
            name="requiredDateRange"
            control={control}
            label="Required Date Range"
            rules={{ required: "Date range is required" }}
          />
        </form>
      </FormProvider>
    );
  },
};

export const WithDefaultRange: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const formMethods = useForm<FormValues>({
      defaultValues: {
        dateRange: undefined,
        requiredDateRange: undefined,
        defaultDateRange: { from: today, to: nextWeek },
        disabledDateRange: undefined,
        tooltipDateRange: undefined,
        validatedDateRange: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerRangeFormField<FormValues>
            name="defaultDateRange"
            control={control}
            label="Date Range with Default Value"
          />
        </form>
      </FormProvider>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const formMethods = useForm<FormValues>({
      defaultValues: {
        dateRange: undefined,
        requiredDateRange: undefined,
        defaultDateRange: undefined,
        disabledDateRange: { from: today, to: nextMonth },
        tooltipDateRange: undefined,
        validatedDateRange: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerRangeFormField<FormValues>
            name="disabledDateRange"
            control={control}
            label="Disabled Date Range"
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
        dateRange: undefined,
        requiredDateRange: undefined,
        defaultDateRange: undefined,
        disabledDateRange: undefined,
        tooltipDateRange: undefined,
        validatedDateRange: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerRangeFormField<FormValues>
            name="tooltipDateRange"
            control={control}
            label="Date Range with Tooltip"
            tooltip="Select a start date and end date to define your range"
          />
        </form>
      </FormProvider>
    );
  },
};

const defaultRange = {
  from: new Date(),
  to: new Date(new Date().setDate(new Date().getDate() + 7)),
};

export const BaseSchema: Story = {
  render: () => {
    type Form = { dateRange?: { from: Date; to: Date } };
    const schemaRequired = object({
      dateRange: zodDateRangeValue(),
    });
    type BaseSchema = inferType<typeof schemaRequired>;

    const formMethods = useForm<Form, void, BaseSchema>({
      defaultValues: { dateRange: defaultRange },
      resolver: zodResolver(schemaRequired),
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
          <DatePickerRangeFormField name="dateRange" control={control} label="Select Date Range" />
          {errors.dateRange && (
            <p style={{ color: "red" }}>
              {errors.dateRange.message || JSON.stringify(errors.dateRange, null, 2)}
            </p>
          )}
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(watch("dateRange"), null, 2)}
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

export const FormatValueSchema: StoryObj = {
  render: () => {
    type Form = { dateRange?: { from: Date; to: Date } };
    const schemaFormatRequired = object({
      dateRange: zodDateRangeValueFormatted(),
    });
    type FormatSchema = inferType<typeof schemaFormatRequired>;

    const formMethods = useForm<Form, void, FormatSchema>({
      defaultValues: { dateRange: defaultRange },
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
          <DatePickerRangeFormField
            name="dateRange"
            control={control as unknown as Control<FieldValues>}
            label="Select Date Range"
          />
          {errors.dateRange && (
            <p style={{ color: "red" }}>
              {errors.dateRange.message || JSON.stringify(errors.dateRange, null, 2)}
            </p>
          )}
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(watch("dateRange"), null, 2)}
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

export const FormatWithTimezoneSchema: StoryObj = {
  render: () => {
    type Form = { dateRange?: { from: Date; to: Date } };
    const schemaFormatWithTimezoneRequired = object({
      dateRange: zodDateRangeValueFormatted("MM-dd-yyyy XXX"),
    });
    type FormatSchemaWithTimezone = inferType<typeof schemaFormatWithTimezoneRequired>;

    const formMethods = useForm<Form, void, FormatSchemaWithTimezone>({
      defaultValues: { dateRange: defaultRange },
      resolver: zodResolver(schemaFormatWithTimezoneRequired),
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
          <DatePickerRangeFormField
            name="dateRange"
            control={control as unknown as Control<FieldValues>}
            label="Select Date Range"
          />
          {errors.dateRange && (
            <p style={{ color: "red" }}>
              {errors.dateRange.message || JSON.stringify(errors.dateRange, null, 2)}
            </p>
          )}
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(watch("dateRange"), null, 2)}
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

export const BaseSchemaNotRequired: StoryObj = {
  render: () => {
    type Form = { dateRange?: { from: Date; to: Date } };
    const schemaNotRequired = object({
      dateRange: zodOptionalDateRangeValue(),
    });
    type BaseSchemaNotRequired = inferType<typeof schemaNotRequired>;

    const formMethods = useForm<Form, void, BaseSchemaNotRequired>({
      defaultValues: { dateRange: defaultRange },
      resolver: zodResolver(schemaNotRequired),
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
          <DatePickerRangeFormField name="dateRange" control={control} label="Select Date Range" />
          {errors.dateRange && (
            <p style={{ color: "red" }}>
              {errors.dateRange.message || JSON.stringify(errors.dateRange, null, 2)}
            </p>
          )}
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(watch("dateRange"), null, 2)}
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

export const FormatValueSchemaNotRequired: StoryObj = {
  render: () => {
    type Form = { dateRange?: { from: Date; to: Date } };
    const schemaFormatNotRequired = object({
      dateRange: zodOptionalDateRangeValueFormatted(),
    });
    type FormatSchemaNotRequired = inferType<typeof schemaFormatNotRequired>;

    const formMethods = useForm<Form, void, FormatSchemaNotRequired>({
      defaultValues: { dateRange: defaultRange },
      resolver: zodResolver(schemaFormatNotRequired),
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
          <DatePickerRangeFormField
            name="dateRange"
            control={control as unknown as Control<FieldValues>}
            label="Select Date Range"
          />
          {errors.dateRange && (
            <p style={{ color: "red" }}>
              {errors.dateRange.message || JSON.stringify(errors.dateRange, null, 2)}
            </p>
          )}
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(watch("dateRange"), null, 2)}
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

export const FormatWithTimezoneSchemaNotRequired: StoryObj = {
  render: () => {
    type Form = { dateRange?: { from: Date; to: Date } };
    const schemaFormatWithTimezoneNotRequired = object({
      dateRange: zodOptionalDateRangeValueFormatted("MM-dd-yyyy XXX"),
    });
    type FormatSchemaWithTimezoneNotRequired = inferType<
      typeof schemaFormatWithTimezoneNotRequired
    >;

    const formMethods = useForm<Form, void, FormatSchemaWithTimezoneNotRequired>({
      defaultValues: { dateRange: defaultRange },
      resolver: zodResolver(schemaFormatWithTimezoneNotRequired),
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
          <DatePickerRangeFormField
            name="dateRange"
            control={control as unknown as Control<FieldValues>}
            label="Select Date Range"
          />
          {errors.dateRange && (
            <p style={{ color: "red" }}>
              {errors.dateRange.message || JSON.stringify(errors.dateRange, null, 2)}
            </p>
          )}
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(watch("dateRange"), null, 2)}
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
