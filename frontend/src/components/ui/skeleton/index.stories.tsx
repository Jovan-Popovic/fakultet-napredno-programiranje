import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from ".";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A skeleton component used to show loading states with a pulsing animation effect.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the skeleton",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic skeleton shapes
export const Default: Story = {
  args: {
    className: "h-4 w-32",
  },
};

export const Circle: Story = {
  args: {
    className: "h-12 w-12 rounded-full",
  },
};

export const Rectangle: Story = {
  args: {
    className: "h-20 w-48",
  },
};

export const Square: Story = {
  args: {
    className: "h-16 w-16",
  },
};

// Text loading patterns
export const TextLine: Story = {
  args: {
    className: "h-4 w-full max-w-sm",
  },
};

export const TextParagraph: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
};

export const TextWithTitle: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-6 w-48" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  ),
};

// Card loading patterns
export const CardWithAvatar: Story = {
  render: () => (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <div className="w-64 space-y-3 rounded-lg border p-4">
      <Skeleton className="h-48 w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  ),
};

export const BlogCard: Story = {
  render: () => (
    <div className="w-80 space-y-3 rounded-lg border p-4">
      <Skeleton className="h-40 w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  ),
};

// List loading patterns
export const ListItem: Story = {
  render: () => (
    <div className="flex items-center space-x-3 rounded-lg border p-3">
      <Skeleton className="h-10 w-10 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  ),
};

export const ListWithMultipleItems: Story = {
  render: () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 rounded-lg border p-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Table loading patterns
export const TableRow: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 rounded-lg border p-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-16" />
    </div>
  ),
};

export const TableWithHeader: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-4 rounded-lg bg-gray-50 p-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-14" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 rounded-lg border p-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  ),
};

// Form loading patterns
export const FormField: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  ),
};

export const FormWithMultipleFields: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>
  ),
};

// Navigation loading patterns
export const NavigationItem: Story = {
  render: () => (
    <div className="flex items-center space-x-3 p-2">
      <Skeleton className="h-5 w-5 rounded-sm" />
      <Skeleton className="h-4 w-24" />
    </div>
  ),
};

export const NavigationMenu: Story = {
  render: () => (
    <div className="w-64 space-y-2 rounded-lg border p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-2">
          <Skeleton className="h-5 w-5 rounded-sm" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  ),
};

// Profile loading patterns
export const ProfileHeader: Story = {
  render: () => (
    <div className="flex items-center space-x-4 rounded-lg border p-6">
      <Skeleton className="h-20 w-20 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <div className="w-72 space-y-4 rounded-lg border p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-16 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  ),
};

// Dashboard loading patterns
export const DashboardStats: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2 rounded-lg border p-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  ),
};

export const DashboardChart: Story = {
  render: () => (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
      <Skeleton className="h-64 w-full rounded-md" />
    </div>
  ),
};

// Sizes demonstration
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Heights</p>
        <div className="flex items-end space-x-2">
          <Skeleton className="h-2 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-12 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Widths</p>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Rounded Variations</p>
        <div className="flex space-x-2">
          <Skeleton className="h-12 w-12 rounded-none" />
          <Skeleton className="h-12 w-12 rounded-sm" />
          <Skeleton className="h-12 w-12 rounded-md" />
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
  ),
};
