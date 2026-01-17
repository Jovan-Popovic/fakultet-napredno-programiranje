import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, type Props as BadgeProps } from ".";

/* ───────────────────────────── Storybook Metadata ─────────────────────────── */

const meta: Meta<BadgeProps> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "theme", "red", "yellow", "green", "blue", "indigo", "purple", "pink"],
    },
    children: { control: "text" },
    className: { table: { disable: true } },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
};

export default meta;

/* ────────────────────────────── Helper Template ───────────────────────────── */

const Template = (props: BadgeProps) => <Badge {...props} />;

/* ────────────────────────────────── Stories ───────────────────────────────── */

export const Playground: StoryObj<BadgeProps> = {
  render: Template,
};

export const Variants: StoryObj<BadgeProps> = {
  render: (props) => (
    <div className="flex flex-wrap gap-3">
      <Badge {...props} variant="default">
        Default
      </Badge>
      <Badge {...props} variant="red">
        Red
      </Badge>
      <Badge {...props} variant="yellow">
        Yellow
      </Badge>
      <Badge {...props} variant="green">
        Green
      </Badge>
      <Badge {...props} variant="blue">
        Blue
      </Badge>
      <Badge {...props} variant="indigo">
        Indigo
      </Badge>
      <Badge {...props} variant="purple">
        Purple
      </Badge>
      <Badge {...props} variant="pink">
        Pink
      </Badge>
    </div>
  ),
  parameters: { controls: { exclude: ["variant"] } },
};
