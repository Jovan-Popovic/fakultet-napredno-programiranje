import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { NumberInput } from "./index";

const meta: Meta<typeof NumberInput> = {
  title: "Components/UI/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A number input component with validation and optional stepper controls.",
      },
    },
  },
  argTypes: {
    value: { control: "number" },
    defaultValue: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    precision: { control: "number" },
    allowDecimals: { control: "boolean" },
    showControls: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter a number",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 42,
    placeholder: "Enter a number",
  },
};

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    placeholder: "0-100",
  },
};

export const NoControls: Story = {
  args: {
    showControls: false,
    placeholder: "No stepper controls",
  },
};

export const Decimals: Story = {
  args: {
    allowDecimals: true,
    precision: 2,
    step: 0.1,
    placeholder: "Decimal values allowed",
  },
};

export const WithStep: Story = {
  args: {
    step: 10,
    min: 0,
    max: 1000,
    placeholder: "Step by 10",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 100,
  },
};

export const Controlled: Story = {
  render: (args: typeof Controlled.args) => {
    const [value, setValue] = useState<number | null>(args?.value as number);

    return (
      <div className="space-y-4">
        <NumberInput
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          placeholder="Controlled input"
        />
        <div className="text-sm text-gray-500">
          Current value: {value !== null ? value : "null"}
        </div>
      </div>
    );
  },
  args: {
    value: 25,
  },
};

export const CustomFormatter: Story = {
  render: (args: typeof Controlled.args) => {
    const [value, setValue] = useState<number | null>(1000);

    return (
      <div className="space-y-4">
        <NumberInput
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          formatter={(val) => {
            const num = typeof val === "string" ? parseFloat(val) : val;
            if (isNaN(num)) return "";
            return new Intl.NumberFormat("en-US").format(num);
          }}
          parser={(val) => val.replace(/,/g, "")}
          placeholder="Formatted with commas"
        />
        <div className="text-sm text-gray-500">Raw value: {value !== null ? value : "null"}</div>
      </div>
    );
  },
};

export const IntegersOnly: Story = {
  args: {
    allowDecimals: false,
    min: 0,
    max: 999,
    placeholder: "Integers only (0-999)",
  },
};

export const Currency: Story = {
  render: (args: typeof Controlled.args) => {
    const [value, setValue] = useState<number | null>(29.99);

    return (
      <div className="space-y-4">
        <NumberInput
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          allowDecimals
          precision={2}
          step={0.01}
          min={0}
          formatter={(val) => {
            const num = typeof val === "string" ? parseFloat(val) : val;
            if (isNaN(num)) return "";
            return `$${num.toFixed(2)}`;
          }}
          parser={(val) => val.replace(/^\$/, "")}
          placeholder="$0.00"
        />
        <div className="text-sm text-gray-500">Value: ${value?.toFixed(2) ?? "0.00"}</div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Default</label>
        <NumberInput placeholder="Default variant" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Number variant</label>
        <NumberInput variant="number" placeholder="Number variant" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">With custom class</label>
        <NumberInput
          placeholder="Custom styling"
          className="border-red-300 focus:border-red-500 focus:ring-red-500"
        />
      </div>
    </div>
  ),
};
