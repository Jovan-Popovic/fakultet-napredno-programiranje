import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from ".";

import type { Spacing, Size } from "@/components/ui/select/common/types/options";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320, minHeight: 250, padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isMulti: { control: "boolean" },
    isSearchable: { control: "boolean" },
    isClearable: { control: "boolean" },
    isLoading: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["default", "md", "lg"] satisfies Size[],
    },
    spacing: {
      control: { type: "select" },
      options: ["default", "sm", "md", "lg"] satisfies Spacing[],
    },
  },
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
      { value: "pear", label: "Pear" },
    ],
    isSearchable: false,
    isClearable: true,
    isMulti: false,
    isLoading: false,
    size: "default",
    spacing: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Single: Story = {
  name: "Single select",
};

export const Multi: Story = {
  name: "Multi select",
  args: {
    isMulti: true,
  },
};

export const Loading: Story = {
  name: "Loading state",
  args: {
    isLoading: true,
    placeholder: "Fetching…",
  },
};

export const Grouped: Story = {
  name: "Grouped options",
  args: {
    options: [
      {
        label: "Fruits",
        options: [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ],
      },
      {
        label: "Citrus",
        isDisabled: true,
        options: [
          { value: "orange", label: "Orange", isDisabled: true },
          { value: "lemon", label: "Lemon" },
        ],
      },
    ],
  },
};

export const Disabled: Story = {
  name: "Disabled select",
  args: {
    isDisabled: true,
  },
};

export const SomeOptionsDisabled: Story = {
  name: "Some options disabled",
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", isDisabled: true },
      { value: "orange", label: "Orange" },
    ],
  },
};

export const Sizes: Story = {
  name: "Large size",
  args: {
    size: "lg",
  },
};

export const SpacingVariants: Story = {
  name: "With large spacing",
  args: {
    spacing: "lg",
  },
};

export const Playground: Story = {
  name: "Playground select",
};

export const Searchable: Story = {
  name: "Searchable select",
  args: {
    isSearchable: true,
    placeholder: "Search for a fruit...",
  },
};

export const Clearable: Story = {
  name: "Clearable select",
  args: {
    isClearable: true,
    placeholder: "Select a fruit (can clear)",
  },
};

export const SearchableAndClearable: Story = {
  name: "Searchable & Clearable",
  args: {
    isSearchable: true,
    isClearable: true,
    placeholder: "Search & clear option",
  },
};
