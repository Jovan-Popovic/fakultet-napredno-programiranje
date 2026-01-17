import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";

import { TripleDatePickerFormField } from ".";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof TripleDatePickerFormField> = {
  title: "Form/DatePicker/Triple",
  component: TripleDatePickerFormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field wrapper around TripleSelectDatePicker with react-hook-form integration.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TripleDatePickerFormField>;

type FormValues = {
  birthdate: Date | undefined;
};

export const Default: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: { birthdate: undefined },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[420px] max-w-lg flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <TripleDatePickerFormField<FormValues>
            name="birthdate"
            control={control}
            label="Birth date"
            startYear={1900}
            endYear={2035}
            showCalendar={false}
          />
        </form>
      </FormProvider>
    );
  },
};

export const WithCalendar: Story = {
  render: () => {
    const formMethods = useForm<FormValues>({
      defaultValues: { birthdate: new Date() },
    });
    const { control } = formMethods;

    return (
      <FormProvider {...formMethods}>
        <form
          className="flex min-h-[620px] max-w-xl flex-col justify-start gap-6"
          style={{ padding: "2rem", overflow: "visible" }}
        >
          <TripleDatePickerFormField<FormValues>
            name="birthdate"
            control={control}
            label="Birth date (with calendar)"
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date(2035, 11, 31)}
            startYear={1900}
            endYear={2035}
            showCalendar={true}
          />
        </form>
      </FormProvider>
    );
  },
};
