import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlarmClock, CheckCircle, Coffee } from "lucide-react";

import { List } from ".";

const meta: Meta<typeof List> = {
  title: "UI/Typography/List",
  component: List,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 450,
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["ul", "ol"],
    },
    itemClassName: {
      control: "text",
    },
  },
  args: {
    type: "ul",
    items: ["First", "Second", "Third"].map((text, index) => <span key={index}>{text}</span>),
  },
};

export default meta;

// strongly-typed Story helper
type Story = StoryObj<typeof List>;

/**
 * Fully-interactive story – use **Controls** to try different list
 * types, custom classes, or even swap the `items` array in ArgsTable.
 */
export const Playground: Story = {
  name: "Playground list",
  parameters: {
    docs: {
      description: {
        story:
          "Use the **Controls** panel to switch between ordered / unordered " +
          "lists, edit the `items` array, or add a custom `itemClassName`.",
      },
    },
  },
};

/** Simple unordered bullet list (default). */
export const Unordered: Story = {
  name: "Unordered list",
  args: {
    type: "ul",
  },
};

/** Standard ordered (numbered) list. */
export const Ordered: Story = {
  name: "Ordered list",
  args: {
    type: "ol",
  },
};

/** Show that list items can hold any JSX – here we add icons + inline styling. */
export const RichContent: Story = {
  name: "Rich content list",
  args: {
    type: "ul",
    items: [
      <>
        <CheckCircle className="mr-2 inline text-green-600 dark:text-green-400" />
        <strong className="text-text-blue-500">Install dependencies</strong>
      </>,
      <>
        <AlarmClock className="mr-2 inline text-yellow-500" />
        Run <code>npm run dev</code>
      </>,
      <>
        <Coffee className="mr-2 inline text-purple-500" />
        Enjoy your break ☕
      </>,
    ],
    itemClassName: "flex items-center gap-1 py-1",
  },
};
