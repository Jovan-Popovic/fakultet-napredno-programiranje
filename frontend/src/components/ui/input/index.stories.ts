import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "number", "date", "time", "checkbox", "radio", "file", "search"],
    },
    // Hide these from the controls panel—they're derived from `variant` or are utility props
    type: { control: false },
    className: { control: false },
  },
  args: {
    placeholder: "Enter value…",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// ────────────────────────────────────────────────
//  Basic variants
// ────────────────────────────────────────────────

export const Text: Story = {
  args: {
    variant: "text",
    type: "text",
    placeholder: "Plain text input",
  },
};

export const Number: Story = {
  args: {
    variant: "number",
    type: "number",
    placeholder: "42",
  },
};

export const Date: Story = {
  args: {
    variant: "date",
    type: "date",
  },
};

export const Time: Story = {
  args: {
    variant: "time",
    type: "time",
  },
};

export const Checkbox: Story = {
  args: {
    variant: "checkbox",
    type: "checkbox",
  },
};

export const Radio: Story = {
  args: {
    variant: "radio",
    type: "radio",
  },
};

export const File: Story = {
  args: {
    variant: "file",
    type: "file",
  },
};

export const Search: Story = {
  args: {
    variant: "search",
    type: "text",
  },
};

// ────────────────────────────────────────────────
//  States
// ────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    variant: "text",
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
  },
};
