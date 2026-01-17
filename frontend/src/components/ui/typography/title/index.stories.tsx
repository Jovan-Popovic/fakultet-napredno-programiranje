import type { Meta, StoryObj } from "@storybook/react-vite";

import { Title } from ".";

const meta: Meta<typeof Title> = {
  title: "UI/Typography/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    children: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
  args: {
    level: 1,
    children: "Heading text",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Playground: Story = {
  name: "Playground title",
  parameters: {
    docs: {
      description: {
        story: "Select a level (1-6) and edit the text inline.",
      },
    },
  },
};

export const H1: Story = {
  name: "H1",
  args: { level: 1, children: "Heading 1" },
};

export const H2: Story = {
  name: "H2",
  args: { level: 2, children: "Heading 2" },
};

export const H3: Story = {
  name: "H3",
  args: { level: 3, children: "Heading 3" },
};

export const H4: Story = {
  name: "H4",
  args: { level: 4, children: "Heading 4" },
};

export const H5: Story = {
  name: "H5",
  args: { level: 5, children: "Heading 5" },
};

export const H6: Story = {
  name: "H6",
  args: { level: 6, children: "Heading 6" },
};
