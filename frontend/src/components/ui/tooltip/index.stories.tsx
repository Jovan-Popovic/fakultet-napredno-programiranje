import type { Meta, StoryObj } from "@storybook/react-vite";

import { TooltipPosition, TooltipTriggerEvent } from "./enums";

import { Tooltip } from ".";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile tooltip component that supports both hover and click triggers with customizable positioning.",
      },
    },
  },
  argTypes: {
    content: {
      control: "text",
      description: "The content to display in the tooltip",
    },
    position: {
      control: "select",
      options: Object.values(TooltipPosition),
      description: "Position of the tooltip relative to the trigger",
    },
    trigger: {
      control: "select",
      options: Object.values(TooltipTriggerEvent),
      description: "Event that triggers the tooltip",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the tooltip content",
    },
    childrenClassName: {
      control: "text",
      description: "Additional CSS classes for the trigger wrapper",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic stories
export const Default: Story = {
  args: {
    content: "This is a helpful tooltip",
    children: <button className="rounded bg-blue-500 px-4 py-2 text-white">Hover me</button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    content: "Click to toggle this tooltip",
    trigger: TooltipTriggerEvent.CLICK,
    children: <button className="rounded bg-green-500 px-4 py-2 text-white">Click me</button>,
  },
};

// Position variants
export const TopPosition: Story = {
  args: {
    content: "Tooltip positioned at the top",
    position: TooltipPosition.TOP,
    children: <span className="cursor-pointer rounded bg-gray-200 px-3 py-2">Top</span>,
  },
};

export const RightPosition: Story = {
  args: {
    content: "Tooltip positioned to the right",
    position: TooltipPosition.RIGHT,
    children: <span className="cursor-pointer rounded bg-gray-200 px-3 py-2">Right</span>,
  },
};

export const BottomPosition: Story = {
  args: {
    content: "Tooltip positioned at the bottom",
    position: TooltipPosition.BOTTOM,
    children: <span className="cursor-pointer rounded bg-gray-200 px-3 py-2">Bottom</span>,
  },
};

export const LeftPosition: Story = {
  args: {
    content: "Tooltip positioned to the left",
    position: TooltipPosition.LEFT,
    children: <span className="cursor-pointer rounded bg-gray-200 px-3 py-2">Left</span>,
  },
};

// Content variants
export const LongContent: Story = {
  args: {
    content:
      "This is a very long tooltip content that should wrap properly within the maximum width constraints of the tooltip container.",
    children: <button className="rounded bg-purple-500 px-4 py-2 text-white">Long content</button>,
  },
};

export const ReactNodeContent: Story = {
  args: {
    content: (
      <div>
        <strong>Rich Content</strong>
        <p className="mt-1">This tooltip contains JSX elements with formatting.</p>
      </div>
    ),
    children: <button className="rounded bg-indigo-500 px-4 py-2 text-white">Rich content</button>,
  },
};

// Interactive examples
export const WithIcon: Story = {
  args: {
    content: "This icon provides additional information",
    children: (
      <span className="inline-flex items-center gap-2">
        <span>Settings</span>
        <svg className="h-4 w-4 cursor-help text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    ),
  },
};

export const WithCustomStyling: Story = {
  args: {
    content: "Custom styled tooltip",
    className: "bg-red-500 text-white border-red-600",
    childrenClassName: "border-2 border-dashed border-gray-300 p-2",
    children: <span>Custom styled</span>,
  },
};

// All positions demo
export const AllPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div className="space-y-4">
        <h3 className="font-semibold">Hover Triggers</h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Top tooltip" position={TooltipPosition.TOP}>
            <button className="rounded bg-blue-100 px-3 py-2">Top</button>
          </Tooltip>
          <Tooltip content="Right tooltip" position={TooltipPosition.RIGHT}>
            <button className="rounded bg-blue-100 px-3 py-2">Right</button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position={TooltipPosition.BOTTOM}>
            <button className="rounded bg-blue-100 px-3 py-2">Bottom</button>
          </Tooltip>
          <Tooltip content="Left tooltip" position={TooltipPosition.LEFT}>
            <button className="rounded bg-blue-100 px-3 py-2">Left</button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Click Triggers</h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip
            content="Top popover"
            position={TooltipPosition.TOP}
            trigger={TooltipTriggerEvent.CLICK}
          >
            <button className="rounded bg-green-100 px-3 py-2">Top</button>
          </Tooltip>
          <Tooltip
            content="Right popover"
            position={TooltipPosition.RIGHT}
            trigger={TooltipTriggerEvent.CLICK}
          >
            <button className="rounded bg-green-100 px-3 py-2">Right</button>
          </Tooltip>
          <Tooltip
            content="Bottom popover"
            position={TooltipPosition.BOTTOM}
            trigger={TooltipTriggerEvent.CLICK}
          >
            <button className="rounded bg-green-100 px-3 py-2">Bottom</button>
          </Tooltip>
          <Tooltip
            content="Left popover"
            position={TooltipPosition.LEFT}
            trigger={TooltipTriggerEvent.CLICK}
          >
            <button className="rounded bg-green-100 px-3 py-2">Left</button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
