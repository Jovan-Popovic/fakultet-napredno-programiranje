import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string, type infer as inferType } from "zod";

import { TimePickerFormField } from ".";

/* ------------------------------------------------------------------ */
/*  Storybook metadata                                                */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof TimePickerFormField> = {
  title: "Form/TimePicker",
  component: TimePickerFormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TimePickerFormField>;

/* ------------------------------------------------------------------ */
/*  Example Form Wrapper                                              */
/* ------------------------------------------------------------------ */
type FormValues = {
  startTime: string;
  endTime: string;
};

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="flex max-w-md flex-col gap-6">{children}</form>
    </FormProvider>
  );
};

/* ------------------------------------------------------------------ */
/*  Stories                                                           */
/* ------------------------------------------------------------------ */

export const Playground: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { startTime: "" },
    });

    return (
      <FormWrapper>
        <TimePickerFormField<FormValues>
          name="startTime"
          control={control}
          placeholder="Select time"
          rules={{ required: "Time is required" }}
        />
      </FormWrapper>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { startTime: "14:30" },
    });

    return (
      <FormWrapper>
        <TimePickerFormField<FormValues>
          name="startTime"
          control={control}
          placeholder="Select time"
        />
      </FormWrapper>
    );
  },
};

export const WithDisabledHours: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { startTime: "" },
    });

    return (
      <FormWrapper>
        <TimePickerFormField<FormValues>
          name="startTime"
          control={control}
          placeholder="Select time"
          disabledHours={[0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23]}
        />
      </FormWrapper>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { startTime: "10:00" },
    });

    return (
      <FormWrapper>
        <TimePickerFormField<FormValues>
          name="startTime"
          control={control}
          placeholder="Select time"
          disabled
        />
      </FormWrapper>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const timeSchema = object({
      startTime: string().min(1, "Start time is required"),
      endTime: string().min(1, "End time is required"),
    });
    type TimeFormValues = inferType<typeof timeSchema>;

    const methods = useForm<TimeFormValues>({
      resolver: zodResolver(timeSchema),
      defaultValues: { startTime: "", endTime: "" },
    });
    const { control, handleSubmit } = methods;

    const onSubmit = (data: TimeFormValues) => alert(JSON.stringify(data, null, 2));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
          <TimePickerFormField name="startTime" control={control} placeholder="Select start time" />
          <TimePickerFormField name="endTime" control={control} placeholder="Select end time" />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const TwelveHourFormat: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { startTime: "" },
    });

    return (
      <FormWrapper>
        <TimePickerFormField<FormValues>
          name="startTime"
          control={control}
          placeholder="Select time"
          use12Hour
        />
      </FormWrapper>
    );
  },
};
