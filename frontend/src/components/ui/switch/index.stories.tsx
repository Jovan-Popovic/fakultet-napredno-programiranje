import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Switch, type Props } from ".";

/* ───────────────────────────── Storybook Metadata ───────────────────────────── */

const meta: Meta<Props> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "radio" },
      options: ["primary", "success", "danger"],
    },
    checked: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    className: { table: { disable: true } }, // not relevant for docs
  },
  args: {
    size: "md",
    variant: "primary",
    loading: false,
    disabled: false,
    checked: false,
  },
};

export default meta;

const ControlledTemplate = (args: Props) => {
  const [checked, setChecked] = useState(args.checked ?? false);

  return (
    <Switch
      {...args}
      checked={checked}
      onCheckedChange={(v) => {
        setChecked(v);
        args.onCheckedChange?.(v); // forward to SB action if provided
      }}
    />
  );
};

export const Playground: StoryObj<Props> = {
  render: ControlledTemplate,
};

export const Sizes: StoryObj<Props> = {
  render: (args) => (
    <div className="flex items-center gap-6">
      <ControlledTemplate {...args} size="sm" />
      <ControlledTemplate {...args} size="md" />
      <ControlledTemplate {...args} size="lg" />
    </div>
  ),
  parameters: { controls: { exclude: ["size"] } },
};

export const Variants: StoryObj<Props> = {
  render: (args) => (
    <div className="flex items-center gap-6">
      <ControlledTemplate {...args} variant="primary" />
      <ControlledTemplate {...args} variant="success" />
      <ControlledTemplate {...args} variant="danger" />
    </div>
  ),
  parameters: { controls: { exclude: ["variant"] } },
};

export const Loading: StoryObj<Props> = {
  args: { loading: true },
  render: ControlledTemplate,
};

export const Disabled: StoryObj<Props> = {
  args: { disabled: true },
  render: ControlledTemplate,
};
