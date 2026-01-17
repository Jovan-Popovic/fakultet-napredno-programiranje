import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { TextareaFormField } from ".";

import { NotificationProvider } from "@/components/ui/notifications/context";

type FormValues = {
  description: string;
};

const meta: Meta<typeof TextareaFormField> = {
  title: "Form/Textarea",
  component: TextareaFormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextareaFormField>;

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      description: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="flex max-w-md flex-col gap-6">{children}</form>
    </FormProvider>
  );
};

export const Playground: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: {
        description: "",
      },
    });

    return (
      <FormWrapper>
        <TextareaFormField<FormValues>
          name="description"
          control={control}
          label="Description"
          placeholder="Type something..."
          showCount
          rules={{ required: "Description is required", maxLength: 200 }}
        />
      </FormWrapper>
    );
  },
};

export const WithCopyButton: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: {
        description: "Copy this text if you want!",
      },
    });

    return (
      <NotificationProvider>
        <FormWrapper>
          <TextareaFormField<FormValues>
            name="description"
            control={control}
            label="Copyable Field"
            placeholder="This is copyable"
            copyable
          />
        </FormWrapper>
      </NotificationProvider>
    );
  },
};
