import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FormProvider,
  useForm,
  type Control,
  type FieldValues,
  type RegisterOptions,
  type SubmitHandler,
} from "react-hook-form";

import { CheckboxFormField } from ".";

const meta: Meta<typeof CheckboxFormField> = {
  title: "Form/Checkbox",
  component: CheckboxFormField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CheckboxFormField>;

type FormValues = {
  terms: boolean;
};

// Default
export const Default: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { terms: false } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);
    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <CheckboxFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="terms"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
  args: { label: "I agree to the terms and conditions" },
};

// With default checked
export const WithDefaultChecked: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { terms: true } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);

    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <CheckboxFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="terms"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
  args: { label: "I agree to the terms and conditions" },
};

// Required field
export const RequiredField: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { terms: false } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);

    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <CheckboxFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="terms"
            rules={
              {
                required: "You must agree to the terms",
                validate: (value) => value === true || "You must agree to the terms",
              } satisfies RegisterOptions<FormValues, "terms">
            }
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
  args: { label: "Required agreement" },
};

// Different variants
export const DifferentVariants: Story = {
  render: (args) => {
    const variants: Array<
      "default" | "secondary" | "destructive" | "success" | "warning" | "outline"
    > = ["default", "secondary", "destructive", "success", "warning", "outline"];
    return (
      <div className="space-y-6">
        {variants.map((variant) => {
          const methods = useForm<FormValues>({ defaultValues: { terms: false } });
          const onSubmit: SubmitHandler<FormValues> = (data) =>
            alert(`Variant: ${variant}\n${JSON.stringify(data, null, 2)}`);
          const { control } = methods;
          return (
            <FormProvider {...methods} key={variant}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <CheckboxFormField
                  {...args}
                  control={control as unknown as Control<FieldValues>}
                  name="terms"
                  variant={variant}
                  label={`${variant} variant`}
                />
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </FormProvider>
          );
        })}
      </div>
    );
  },
  args: {},
};

// Different sizes
export const DifferentSizes: Story = {
  render: (args) => {
    const sizes: Array<"sm" | "default" | "lg" | "xl"> = ["sm", "default", "lg", "xl"];
    return (
      <div className="space-y-6">
        {sizes.map((size) => {
          const methods = useForm<FormValues>({ defaultValues: { terms: false } });
          const onSubmit: SubmitHandler<FormValues> = (data) =>
            alert(`Size: ${size}\n${JSON.stringify(data, null, 2)}`);
          const { control } = methods;
          return (
            <FormProvider {...methods} key={size}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <CheckboxFormField
                  {...args}
                  control={control as unknown as Control<FieldValues>}
                  name="terms"
                  size={size}
                  label={`${size} size`}
                />
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </FormProvider>
          );
        })}
      </div>
    );
  },
  args: {},
};

// Disabled state
export const DisabledState: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { terms: false } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);
    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <CheckboxFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="terms"
            disabled
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
  args: { label: "Disabled checkbox" },
};

// Indeterminate state
export const IndeterminateState: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { terms: false } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);
    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <CheckboxFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="terms"
            indeterminate
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
  args: { label: "Indeterminate checkbox" },
};
