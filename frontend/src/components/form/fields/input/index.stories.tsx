import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, type infer as inferType } from "zod";

import {
  zodInputValue,
  zodInputValueMax,
  zodInputValueMin,
  zodNumberInputValue,
  zodNumberInputValueMax,
  zodNumberInputValueMin,
} from "./schemas";

import { InputFormField } from ".";

import { NotificationProvider } from "@/components/ui/notifications/context";

/* ------------------------------------------------------------------ */
/*  Storybook metadata                                                */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof InputFormField> = {
  title: "Form/Input",
  component: InputFormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputFormField>;

/* ------------------------------------------------------------------ */
/*  Example Form Wrapper                                              */
/* ------------------------------------------------------------------ */
type FormValues = {
  email: string;
  password: string;
};

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
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
      defaultValues: { email: "" },
    });

    return (
      <FormWrapper>
        <InputFormField<FormValues>
          name="email"
          control={control}
          label="Email"
          placeholder="Enter your email"
          tooltip="This is your account email"
          rules={{ required: "Email is required" }}
        />
      </FormWrapper>
    );
  },
};

export const PasswordWithToggle: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { password: "" },
    });

    return (
      <FormWrapper>
        <InputFormField<FormValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          showPasswordToggle
          placeholder="••••••"
          rules={{ required: "Password is required" }}
        />
      </FormWrapper>
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { email: "" },
    });

    return (
      <FormWrapper>
        <InputFormField<FormValues>
          name="email"
          control={control}
          label="Email"
          showCount
          rules={{ maxLength: 20 }}
          placeholder="Max 20 characters"
        />
      </FormWrapper>
    );
  },
};

export const CopyableInput: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { email: "demo@example.com" },
    });

    return (
      <NotificationProvider>
        <FormWrapper>
          <InputFormField<FormValues> name="email" control={control} label="Email" copyable />
        </FormWrapper>
      </NotificationProvider>
    );
  },
};

export const StringRequired: Story = {
  render: () => {
    const stringRequiredSchema = object({ input: zodInputValue() });
    type StringRequired = inferType<typeof stringRequiredSchema>;
    const methods = useForm({
      resolver: zodResolver(stringRequiredSchema),
      defaultValues: { input: "" },
    });
    const { control, handleSubmit } = methods;

    const onSubmit = (data: StringRequired) => alert(JSON.stringify(data, null, 2));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
          <InputFormField
            name="input"
            control={control}
            label="Required String"
            placeholder="Type something"
          />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const StringMinLength: Story = {
  render: () => {
    const stringMinLengthSchema = object({ input: zodInputValueMin(5) });
    type MinLength = inferType<typeof stringMinLengthSchema>;
    const methods = useForm({
      resolver: zodResolver(stringMinLengthSchema),
      defaultValues: { input: "" },
    });
    const { control, handleSubmit } = methods;

    const onSubmit = (data: MinLength) => alert(JSON.stringify(data, null, 2));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
          <InputFormField
            name="input"
            control={control}
            label="Min Length 5"
            placeholder="Min 5 characters"
          />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const StringMaxLength: Story = {
  render: () => {
    const stringMaxLengthSchema = object({ input: zodInputValueMax(10) });
    type MaxLength = inferType<typeof stringMaxLengthSchema>;

    const methods = useForm({
      resolver: zodResolver(stringMaxLengthSchema),
      defaultValues: { input: "" },
    });
    const { control, handleSubmit } = methods;

    const onSubmit = (data: MaxLength) => alert(JSON.stringify(data, null, 2));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
          <InputFormField
            name="input"
            control={control}
            label="Max Length 10"
            placeholder="Max 10 characters"
          />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const NumberRequired: Story = {
  render: () => {
    const numberRequiredSchema = object({ input: zodNumberInputValue() });
    type NumberRequired = inferType<typeof numberRequiredSchema>;

    const methods = useForm({
      resolver: zodResolver(numberRequiredSchema),
      defaultValues: { input: undefined },
    });
    const { control, handleSubmit } = methods;

    const onSubmit = (data: NumberRequired) => alert(JSON.stringify(data, null, 2));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
          <InputFormField
            name="input"
            control={control}
            label="Required Number"
            placeholder="Enter number"
            type="number"
          />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const NumberMinValue: Story = {
  render: () => {
    const numberMinValueSchema = object({ input: zodNumberInputValueMin(10) });
    type NumberMinValue = inferType<typeof numberMinValueSchema>;

    const methods = useForm({
      resolver: zodResolver(numberMinValueSchema),
      defaultValues: { input: undefined },
    });
    const { control, handleSubmit } = methods;

    const onSubmit = (data: NumberMinValue) => alert(JSON.stringify(data, null, 2));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
          <InputFormField
            name="input"
            control={control}
            label="Min Value 10"
            placeholder="Min value 10"
            type="number"
          />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};

export const NumberMaxValue: Story = {
  render: () => {
    const numberMaxValueSchema = object({ input: zodNumberInputValueMax(100) });
    type NumberMaxValue = inferType<typeof numberMaxValueSchema>;

    const methods = useForm({
      resolver: zodResolver(numberMaxValueSchema),
      defaultValues: { input: undefined },
    });
    const { control, handleSubmit } = methods;

    const onSubmit = (data: NumberMaxValue) => alert(JSON.stringify(data, null, 2));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-4">
          <InputFormField
            name="input"
            control={control}
            label="Max Value 100"
            placeholder="Max value 100"
            type="number"
          />
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};
