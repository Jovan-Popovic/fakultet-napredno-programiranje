import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FormProvider,
  useForm,
  type Control,
  type FieldValues,
  type RegisterOptions,
  type SubmitHandler,
} from "react-hook-form";

import { RadioGroupFormField } from ".";

import { Badge } from "@/components/ui/badge";
import type { Option } from "@/components/ui/radio/types";

const meta: Meta<typeof RadioGroupFormField> = {
  title: "Form/RadioGroup",
  component: RadioGroupFormField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RadioGroupFormField>;

type FormValues = {
  fruit: string;
};

const sampleOptions: Option[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

// Default
export const Default: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { fruit: "" } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);
    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <RadioGroupFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="fruit"
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
  args: { label: "Choose a fruit", options: sampleOptions },
};

// With default value
export const WithDefaultValue: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { fruit: "banana" } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);

    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <RadioGroupFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="fruit"
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
  args: { label: "Choose a fruit", options: sampleOptions },
};

// Required field
export const RequiredField: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { fruit: "" } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);

    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <RadioGroupFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="fruit"
            rules={
              { required: "Please choose a fruit" } satisfies RegisterOptions<FormValues, "fruit">
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
  args: { label: "Required fruit", options: sampleOptions },
};

// Horizontal layout
export const HorizontalLayout: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { fruit: "" } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);
    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <RadioGroupFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="fruit"
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
  args: { label: "Horizontal layout", options: sampleOptions, orientation: "horizontal" },
};

// Different color schemes
export const DifferentColorSchemes: Story = {
  render: (args) => {
    const schemes: Array<"blue" | "red" | "green" | "gradient_light_blue" | "gray"> = [
      "blue",
      "red",
      "green",
      "gradient_light_blue",
      "gray",
    ];
    return (
      <div className="space-y-6">
        {schemes.map((scheme) => {
          const methods = useForm<FormValues>({ defaultValues: { fruit: "" } });
          const onSubmit: SubmitHandler<FormValues> = (data) =>
            alert(`Scheme: ${scheme}\n${JSON.stringify(data, null, 2)}`);
          const { control } = methods;
          return (
            <FormProvider {...methods} key={scheme}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <RadioGroupFormField
                  {...args}
                  control={control as unknown as Control<FieldValues>}
                  name="fruit"
                  colorScheme={scheme}
                  label={scheme}
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
  args: { options: sampleOptions },
};

// Different sizes & shapes
export const DifferentSizesAndShapes: Story = {
  render: (args) => {
    const configs = [
      { size: "sm", shape: "pill", label: "Small Pill" },
      { size: "md", shape: "rounded", label: "Medium Rounded" },
      { size: "lg", shape: "square", label: "Large Square" },
    ] as const;
    return (
      <div className="space-y-6">
        {configs.map(({ size, shape, label }) => {
          const methods = useForm<FormValues>({ defaultValues: { fruit: "" } });
          const onSubmit: SubmitHandler<FormValues> = (data) =>
            alert(`Size/Shape: ${label}\n${JSON.stringify(data, null, 2)}`);
          const { control } = methods;
          return (
            <FormProvider {...methods} key={label}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <RadioGroupFormField
                  {...args}
                  control={control as unknown as Control<FieldValues>}
                  name="fruit"
                  size={size}
                  shape={shape}
                  label={label}
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
  args: { options: sampleOptions },
};

// With disabled option
export const WithDisabledOption: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { fruit: "" } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);
    const { control } = methods;
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <RadioGroupFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="fruit"
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
  args: {
    label: "Choose a fruit",
    options: [
      { value: "apple", label: "Apple", disabled: true },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
  },
};

export const Tabs: Story = {
  render: (args) => {
    const methods = useForm<FormValues>({ defaultValues: { fruit: "apple" } });
    const onSubmit: SubmitHandler<FormValues> = (data) =>
      alert(`Form data:\n${JSON.stringify(data, null, 2)}`);
    const { control } = methods;

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-3xl space-y-4">
          <RadioGroupFormField
            {...args}
            control={control as unknown as Control<FieldValues>}
            name="fruit"
            orientation="horizontal"
            layout="tabs"
            colorScheme="gray"
            showIndicator={false}
            shape="rounded"
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
  args: {
    options: [
      { value: "apple", label: "Apple" },
      {
        value: "orange",
        label: (
          <span className="flex items-center gap-2">
            Requests
            <Badge variant="red">12</Badge>
          </span>
        ),
      },
    ] as Option[],
  },
};
