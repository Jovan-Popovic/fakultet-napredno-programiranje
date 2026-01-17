import type { Meta, StoryObj } from "@storybook/react-vite";

import { Span } from ".";

const meta: Meta<typeof Span> = {
  title: "UI/Typography/Span",
  component: Span,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
  args: {
    children: "inline text",
  },
};

export default meta;

type Story = StoryObj<typeof Span>;

export const Inline: Story = {
  name: "Inline usage",
  render: (args) => (
    <p>
      Regular paragraph with a <Span {...args} /> component in the middle.
    </p>
  ),
};

export const Highlight: Story = {
  name: "Highlighted",
  args: {
    children: "highlighted span",
    className: "bg-yellow-200 px-1 rounded",
  },
};

export const Playground: Story = {
  name: "Playground span",
};
