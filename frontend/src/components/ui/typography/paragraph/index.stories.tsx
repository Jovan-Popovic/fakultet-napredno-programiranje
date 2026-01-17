import type { Meta, StoryObj } from "@storybook/react-vite";

import { Paragraph } from ".";

const meta: Meta<typeof Paragraph> = {
  title: "UI/Typography/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600, padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      control: "text",
      table: { category: "Content" },
    },
    className: {
      control: "text",
      table: { category: "Styling" },
    },
  },
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula quam at libero consectetur, in mattis velit iaculis.",
  },
};

export default meta;

// Typed Story helper
export type Story = StoryObj<typeof Paragraph>;

/** Base example */
export const Default: Story = {
  name: "Default paragraph",
};

/** Demonstrates supplying a custom Tailwind class via `className`. */
export const CustomClass: Story = {
  name: "Custom class",
  args: {
    className: "text-blue-600 dark:text-blue-400 font-semibold",
  },
};

/** Playground with full controls */
export const Playground: Story = {
  name: "Playground paragraph",
  parameters: {
    docs: {
      description: {
        story: "Use **Controls** to tweak the text and `className` props.",
      },
    },
  },
};
