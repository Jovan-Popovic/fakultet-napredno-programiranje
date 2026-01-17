import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { SwitchFormField } from ".";

type FormValues = {
  termsAccepted: boolean;
  notifications: boolean;
};

const meta: Meta<typeof SwitchFormField> = {
  title: "Form/Switch",
  component: SwitchFormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SwitchFormField>;

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      termsAccepted: false,
      notifications: true,
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="flex max-w-sm flex-col gap-6">{children}</form>
    </FormProvider>
  );
};

export const Basic: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { termsAccepted: false },
    });

    return (
      <FormWrapper>
        <SwitchFormField<FormValues> name="termsAccepted" control={control} />
      </FormWrapper>
    );
  },
};

export const WithLabelAndTooltip: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { termsAccepted: true },
    });

    return (
      <FormWrapper>
        <SwitchFormField<FormValues>
          name="termsAccepted"
          control={control}
          label="Accept Terms and Conditions"
          tooltip="You must accept to proceed."
        />
      </FormWrapper>
    );
  },
};

export const RequiredField: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { termsAccepted: false },
    });

    return (
      <FormWrapper>
        <SwitchFormField<FormValues>
          name="termsAccepted"
          control={control}
          label="I agree"
          rules={{ required: "You must agree before continuing" }}
        />
      </FormWrapper>
    );
  },
};

export const WithCustomOnChange: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { notifications: true },
    });

    return (
      <FormWrapper>
        <SwitchFormField<FormValues>
          name="notifications"
          control={control}
          label="Enable Notifications"
          //   onChange={(val) => console.log("Switched to:", val)}
        />
      </FormWrapper>
    );
  },
};
