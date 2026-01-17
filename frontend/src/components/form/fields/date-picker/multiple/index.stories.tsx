import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm, type Control, type FieldValues } from "react-hook-form";
import { object, type infer as inferType } from "zod";

import { zodMultipleDatesValue, zodMultipleDatesValueFormatted } from "./schemas";

import { DatePickerMultipleFormField } from ".";

import type { DatePickerTypeMultiple } from "@/components/ui/date-picker/common/types/date-picker";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof DatePickerMultipleFormField> = {
  title: "Form/DatePicker/Multiple",
  component: DatePickerMultipleFormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field component for multiple date selection with react-hook-form integration.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePickerMultipleFormField>;

/* ------------------------------------------------------------------ */
/*  Types + Form Wrapper                                              */
/* ------------------------------------------------------------------ */
type FormValues = {
  multipleDates: DatePickerTypeMultiple;
  requiredMultipleDates: DatePickerTypeMultiple;
  defaultMultipleDates: DatePickerTypeMultiple;
  disabledMultipleDates: DatePickerTypeMultiple;
  tooltipMultipleDates: DatePickerTypeMultiple;
  validatedMultipleDates: DatePickerTypeMultiple;
};

/* ------------------------------------------------------------------ */
/*  Stories                                                           */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: {
        multipleDates: undefined,
        requiredMultipleDates: undefined,
        defaultMultipleDates: undefined,
        disabledMultipleDates: undefined,
        tooltipMultipleDates: undefined,
        validatedMultipleDates: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerMultipleFormField<FormValues>
            name="multipleDates"
            control={control}
            label="Select Multiple Dates"
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
        multipleDates: undefined,
        requiredMultipleDates: undefined,
        defaultMultipleDates: undefined,
        disabledMultipleDates: undefined,
        tooltipMultipleDates: undefined,
        validatedMultipleDates: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerMultipleFormField<FormValues>
            name="requiredMultipleDates"
            control={control}
            label="Required Multiple Dates"
            rules={{ required: "Please select at least one date" }}
          />
        </form>
      </FormProvider>
    );
  },
};

export const WithDefaultValues: Story = {
  render: () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const formMethods = useForm<FormValues>({
      defaultValues: {
        multipleDates: undefined,
        requiredMultipleDates: undefined,
        defaultMultipleDates: [today, tomorrow, nextWeek],
        disabledMultipleDates: undefined,
        tooltipMultipleDates: undefined,
        validatedMultipleDates: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerMultipleFormField<FormValues>
            name="defaultMultipleDates"
            control={control}
            label="Multiple Dates with Default Values"
          />
        </form>
      </FormProvider>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const selectedDates = [new Date(), new Date(Date.now() + 86400000)];

    const formMethods = useForm<FormValues>({
      defaultValues: {
        multipleDates: undefined,
        requiredMultipleDates: undefined,
        defaultMultipleDates: undefined,
        disabledMultipleDates: selectedDates,
        tooltipMultipleDates: undefined,
        validatedMultipleDates: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerMultipleFormField<FormValues>
            name="disabledMultipleDates"
            control={control}
            label="Disabled Multiple Dates"
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
        multipleDates: undefined,
        requiredMultipleDates: undefined,
        defaultMultipleDates: undefined,
        disabledMultipleDates: undefined,
        tooltipMultipleDates: undefined,
        validatedMultipleDates: undefined,
      },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[600px] max-w-md flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <DatePickerMultipleFormField<FormValues>
            name="tooltipMultipleDates"
            control={control}
            label="Multiple Dates with Tooltip"
            tooltip="Select multiple dates by clicking on different days in the calendar"
          />
        </form>
      </FormProvider>
    );
  },
};

export const MultipleBaseSchema: Story = {
  render: () => {
    type Form = {
      dates?: Date[];
    };

    const schemaBase = object({
      dates: zodMultipleDatesValue(),
    });
    type SchemaBase = inferType<typeof schemaBase>;

    const defaultBaseValues: Form = {
      dates: [new Date("2025-01-01"), new Date("2025-02-01")],
    };
    const formMethods = useForm<Form, void, SchemaBase>({
      defaultValues: defaultBaseValues,
      resolver: zodResolver(schemaBase),
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
          <DatePickerMultipleFormField
            name="dates"
            control={control}
            label="Select Multiple Dates"
          />
          {errors && <p style={{ color: "red" }}>{JSON.stringify(errors, null, 2)}</p>}
          <pre style={{ background: "#f5f5f5", padding: "0.5rem", borderRadius: "4px" }}>
            {JSON.stringify(watch("dates"), null, 2)}
          </pre>
          <button type="submit" style={{ padding: "0.5rem", background: "#333", color: "#fff" }}>
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const MultipleFormattedSchema: Story = {
  render: () => {
    type Form = {
      dates?: Date[];
    };

    const schemaFormatted = object({ dates: zodMultipleDatesValueFormatted() });
    type SchemaFormatted = inferType<typeof schemaFormatted>;

    const formMethods = useForm<Form, void, SchemaFormatted>({
      defaultValues: { dates: undefined },
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
          <DatePickerMultipleFormField
            name="dates"
            control={control as unknown as Control<FieldValues>}
            label="Select Multiple Dates (Formatted)"
          />
          {errors && <p style={{ color: "red" }}></p>}
          <pre style={{ background: "#f5f5f5", padding: "0.5rem", borderRadius: "4px" }}>
            {JSON.stringify(watch("dates"), null, 2)}
          </pre>
          <button type="submit" style={{ padding: "0.5rem", background: "#333", color: "#fff" }}>
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const MultipleFormattedSchemaWithTimezone: Story = {
  render: () => {
    type Form = {
      dates?: Date[];
    };

    const schemaFormattedWithTimezone = object({
      dates: zodMultipleDatesValueFormatted("MM-dd-yyyy XXX"),
    });
    type SchemaFormattedWithTimezone = inferType<typeof schemaFormattedWithTimezone>;

    const formMethods = useForm<Form, void, SchemaFormattedWithTimezone>({
      defaultValues: { dates: undefined },
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
          <DatePickerMultipleFormField
            name="dates"
            control={control as unknown as Control<FieldValues>}
            label="Select Multiple Dates (Formatted + Timezone)"
          />
          {errors && <p style={{ color: "red" }}>{}</p>}
          <pre style={{ background: "#f5f5f5", padding: "0.5rem", borderRadius: "4px" }}>
            {JSON.stringify(watch("dates"), null, 2)}
          </pre>
          <button type="submit" style={{ padding: "0.5rem", background: "#333", color: "#fff" }}>
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};
