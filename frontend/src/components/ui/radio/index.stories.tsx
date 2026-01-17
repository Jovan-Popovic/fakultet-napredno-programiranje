import type { Meta, StoryObj } from "@storybook/react-vite";

import { RadioGroup } from ".";

import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Custom RadioGroup with full variant support (orientation, colorScheme, size, shape)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    colorScheme: {
      control: { type: "select" },
      options: ["blue", "red", "green", "gradient_light_blue"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: { type: "radio" },
      options: ["rounded", "pill", "square"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
  { value: "option1", label: "Option One" },
  { value: "option2", label: "Option Two" },
  { value: "option3", label: "Option Three", disabled: true },
];

export const Default: Story = {
  args: {
    options,
    orientation: "vertical",
    colorScheme: "blue",
    size: "md",
    shape: "rounded",
    defaultValue: "option1",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="max-w-md space-y-12">
      <div>
        <h3 className="mb-2 font-semibold">Orientation</h3>
        <RadioGroup {...args} orientation="horizontal" />
        <RadioGroup {...args} orientation="vertical" className="mt-4" />
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Color Scheme</h3>
        <div className="flex space-x-4">
          <RadioGroup {...args} colorScheme="blue" orientation="horizontal" />
          <RadioGroup {...args} colorScheme="red" orientation="horizontal" />
          <RadioGroup {...args} colorScheme="green" orientation="horizontal" />
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Size</h3>
        <div className="flex flex-col space-y-4">
          <RadioGroup {...args} size="sm" />
          <RadioGroup {...args} size="md" />
          <RadioGroup {...args} size="lg" />
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Shape</h3>
        <div className="flex space-x-4">
          <RadioGroup {...args} shape="rounded" orientation="horizontal" />
          <RadioGroup {...args} shape="pill" orientation="horizontal" />
          <RadioGroup {...args} shape="square" orientation="horizontal" />
        </div>
      </div>
    </div>
  ),
  args: {
    options,
    defaultValue: "option2",
    colorScheme: "gradient_light_blue",
    size: "md",
    shape: "rounded",
  },
};

export const Segmented: Story = {
  args: {
    options: [
      { value: "ad_accounts", label: "Ad Accounts" },
      {
        value: "requests",
        label: (
          <span className="flex items-center gap-2">
            Requests
            <Badge variant="red">12</Badge>
          </span>
        ),
      },
    ],
    orientation: "horizontal",
    layout: "tabs",
    colorScheme: "gray",
    shape: "rounded",
    defaultValue: "ad_accounts",
    showIndicator: false,
  },
  render: (args) => (
    <div className="w-full space-y-12 md:w-[600px]">
      <div className="flex">
        <RadioGroup {...args} />
      </div>
    </div>
  ),
};
