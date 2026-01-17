import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dot, type Props as DotProps } from ".";

/* ───────────────────────────── Storybook Metadata ─────────────────────────── */

const meta: Meta<DotProps> = {
  title: "UI/Dot",
  component: Dot,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "red",
        "yellow",
        "green",
        "blue",
        "indigo",
        "purple",
        "pink",
        "orange",
        "teal",
        "cyan",
        "outline",
      ],
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    pulse: {
      control: { type: "boolean" },
    },
    ring: {
      control: { type: "boolean" },
    },
    className: { table: { disable: true } },
  },
  args: {
    variant: "default",
    size: "sm",
    pulse: false,
    ring: false,
  },
};

export default meta;

/* ────────────────────────────── Helper Template ───────────────────────────── */

const Template = (props: DotProps) => <Dot {...props} />;

/* ────────────────────────────────── Stories ───────────────────────────────── */

export const Playground: StoryObj<DotProps> = {
  render: Template,
};

export const Variants: StoryObj<DotProps> = {
  render: (props) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Dot {...props} variant="default" />
        <span className="text-sm">Default</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="red" />
        <span className="text-sm">Red</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="yellow" />
        <span className="text-sm">Yellow</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="green" />
        <span className="text-sm">Green</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="blue" />
        <span className="text-sm">Blue</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="indigo" />
        <span className="text-sm">Indigo</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="purple" />
        <span className="text-sm">Purple</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="pink" />
        <span className="text-sm">Pink</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="orange" />
        <span className="text-sm">Orange</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="teal" />
        <span className="text-sm">Teal</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="cyan" />
        <span className="text-sm">Cyan</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="outline" />
        <span className="text-sm">Outline</span>
      </div>
    </div>
  ),
  parameters: { controls: { exclude: ["variant"] } },
};

export const Sizes: StoryObj<DotProps> = {
  render: (props) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Dot {...props} size="xs" />
        <span className="text-sm">XS</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} size="sm" />
        <span className="text-sm">SM</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} size="md" />
        <span className="text-sm">MD</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} size="lg" />
        <span className="text-sm">LG</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} size="xl" />
        <span className="text-sm">XL</span>
      </div>
    </div>
  ),
  parameters: { controls: { exclude: ["size"] } },
  args: {
    variant: "blue",
  },
};

export const WithPulse: StoryObj<DotProps> = {
  render: (props) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Dot {...props} variant="green" pulse />
        <span className="text-sm">Active</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="yellow" pulse />
        <span className="text-sm">Warning</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="red" pulse />
        <span className="text-sm">Error</span>
      </div>
    </div>
  ),
  args: {
    pulse: true,
  },
};

export const WithRing: StoryObj<DotProps> = {
  render: (props) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Dot {...props} variant="green" ring />
        <span className="text-sm">Success</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="blue" ring />
        <span className="text-sm">Info</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="yellow" ring />
        <span className="text-sm">Warning</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="red" ring />
        <span className="text-sm">Error</span>
      </div>
    </div>
  ),
  args: {
    ring: true,
  },
};

export const RingWithPulse: StoryObj<DotProps> = {
  render: (props) => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Dot {...props} variant="green" ring pulse />
        <span className="text-sm">Live</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="red" ring pulse />
        <span className="text-sm">Recording</span>
      </div>
      <div className="flex items-center gap-2">
        <Dot {...props} variant="yellow" ring pulse />
        <span className="text-sm">Processing</span>
      </div>
    </div>
  ),
  args: {
    ring: true,
    pulse: true,
  },
};

export const StatusIndicators: StoryObj<DotProps> = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Dot variant="green" size="sm" ring />
        <span>Online</span>
      </div>
      <div className="flex items-center gap-3">
        <Dot variant="yellow" size="sm" />
        <span>Away</span>
      </div>
      <div className="flex items-center gap-3">
        <Dot variant="red" size="sm" />
        <span>Busy</span>
      </div>
      <div className="flex items-center gap-3">
        <Dot variant="default" size="sm" />
        <span>Offline</span>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const ListItems: StoryObj<DotProps> = {
  render: () => (
    <ul className="space-y-2">
      <li className="flex items-start gap-3">
        <Dot variant="blue" size="sm" className="mt-1.5" />
        <span>First item in the list with some longer text content</span>
      </li>
      <li className="flex items-start gap-3">
        <Dot variant="blue" size="sm" className="mt-1.5" />
        <span>Second item with different content</span>
      </li>
      <li className="flex items-start gap-3">
        <Dot variant="blue" size="sm" className="mt-1.5" />
        <span>Third item in the list</span>
      </li>
    </ul>
  ),
  parameters: { controls: { disable: true } },
};
