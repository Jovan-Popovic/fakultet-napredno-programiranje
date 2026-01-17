import type { Meta, StoryObj } from "@storybook/react-vite";

import { DotsBackground } from ".";

const meta: Meta<typeof DotsBackground> = {
  title: "UI/Backgrounds/DotsBackground",
  component: DotsBackground,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A reusable animated dots background container that creates a starfield-like effect.
Perfect for wrapping content with subtle visual interest for hero sections, landing pages, or containers.

The component renders randomly positioned dots behind any content you provide as children.
Each dot has random positioning, animation timing, and opacity for a dynamic effect.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Content to render above the dots background",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    count: {
      control: { type: "range", min: 5, max: 200, step: 5 },
      description: "Number of dots to generate",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "40" },
      },
    },
    color: {
      control: { type: "color" },
      description: "Color of the dots - supports any valid CSS color",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"white"' },
      },
    },
    size: {
      control: { type: "select" },
      options: ["w-0.5 h-0.5", "w-1 h-1", "w-1.5 h-1.5", "w-2 h-2", "w-3 h-3"],
      description: "Size of each dot using Tailwind classes",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"w-1 h-1"' },
      },
    },
    animation: {
      control: { type: "select" },
      options: ["animate-pulse", "animate-bounce", "animate-ping", "animate-spin", "animate-none"],
      description: "Animation type using Tailwind animation classes",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"animate-pulse"' },
      },
    },
    maxDelay: {
      control: { type: "range", min: 1, max: 15, step: 0.5 },
      description: "Maximum animation delay in seconds",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "5" },
      },
    },
    minOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Minimum opacity value (0-1)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0.5" },
      },
    },
    maxOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Maximum opacity value (0-1)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1.0" },
      },
    },
    position: {
      control: { type: "select" },
      options: ["relative", "absolute", "fixed"],
      description: "Container positioning",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"relative"' },
      },
    },
    padContent: {
      control: { type: "boolean" },
      description: "Whether to add default padding to content",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    contentZIndex: {
      control: { type: "number" },
      description: "Custom z-index for content layer",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "10" },
      },
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes for the container",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    zIndex: {
      control: { type: "number" },
      description: "Z-index value for layering",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DotsBackground>;

/**
 * Basic container with sample content
 */
export const Default: Story = {
  args: {
    className: "min-h-96 bg-slate-900",
    children: (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center text-white">
          <h2 className="mb-2 text-2xl font-bold">Welcome</h2>
          <p className="text-slate-300">Content with dots background</p>
        </div>
      </div>
    ),
  },
};

/**
 * Hero section with centered content
 */
export const HeroSection: Story = {
  args: {
    className: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800",
    count: 80,
    padContent: false,
    children: (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="max-w-2xl text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">Build Something Amazing</h1>
          <p className="mb-8 text-xl text-slate-300">
            Create beautiful applications with our component library
          </p>
          <button className="rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Full-screen hero section with gradient background and centered content.",
      },
    },
  },
};

/**
 * Card container with dots background
 */
export const CardContainer: Story = {
  args: {
    className:
      "max-w-md rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 bg-slate-900",
    count: 25,
    minOpacity: 0.2,
    maxOpacity: 0.5,
    children: (
      <div className="text-white">
        <h3 className="mb-3 text-xl font-bold">Feature Card</h3>
        <p className="mb-4 text-slate-300">
          This card has an animated dots background that adds visual interest without overwhelming
          the content.
        </p>
        <button className="rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600">
          Learn More
        </button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-96 items-center justify-center bg-slate-800 p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Card component with subtle dots background for enhanced visual appeal.",
      },
    },
  },
};

/**
 * Dense starfield effect with navigation
 */
export const DenseStarfield: Story = {
  args: {
    className: "min-h-96 bg-slate-900",
    count: 120,
    size: "w-0.5 h-0.5",
    maxDelay: 8,
    children: (
      <div className="text-white">
        <nav className="flex items-center justify-between p-6">
          <div className="text-xl font-bold">Brand</div>
          <div className="space-x-6">
            <a href="#" className="transition-colors hover:text-blue-400">
              Home
            </a>
            <a href="#" className="transition-colors hover:text-blue-400">
              About
            </a>
            <a href="#" className="transition-colors hover:text-blue-400">
              Contact
            </a>
          </div>
        </nav>
        <div className="py-20 text-center">
          <h2 className="mb-4 text-3xl font-bold">Starfield Navigation</h2>
          <p className="text-slate-300">Dense dots create an immersive background</p>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Dense starfield effect perfect for immersive navigation areas.",
      },
    },
  },
};

/**
 * Subtle overlay for content areas
 */
export const SubtleOverlay: Story = {
  args: {
    className: "min-h-96 bg-white",
    count: 30,
    color: "#64748b",
    minOpacity: 0.1,
    maxOpacity: 0.2,
    animation: "animate-none",
    children: (
      <div className="mx-auto max-w-2xl text-slate-900">
        <h2 className="mb-4 text-2xl font-bold">Article Title</h2>
        <p className="mb-4">
          This is an example of subtle dots behind text content. The dots are barely visible and
          don&apos;t interfere with readability.
        </p>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Subtle dots overlay that doesn't distract from text content.",
      },
    },
  },
};

/**
 * DotsHero - Pre-configured hero component pattern
 */
export const DotsHero: Story = {
  args: {
    count: 100,
    color: "#3B82F6",
    className: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800",
    padContent: false,
    children: (
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">DotsHero Pattern</h1>
          <p className="mb-8 text-lg text-slate-300 sm:text-xl">
            Pre-configured hero section with blue dots and gradient background
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600">
              Primary Action
            </button>
            <button className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
              Secondary
            </button>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "DotsHero pattern - pre-configured hero section with centered content, blue dots, and responsive design.",
      },
    },
  },
};

/**
 * DotsCard - Pre-styled card pattern
 */
export const DotsCard: Story = {
  render: () => (
    <div className="flex min-h-96 flex-col items-center gap-6 bg-slate-800 p-8 md:flex-row">
      <DotsBackground
        count={20}
        minOpacity={0.2}
        maxOpacity={0.4}
        className="max-w-sm flex-1 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg"
      >
        <div className="text-white">
          <h3 className="mb-3 text-xl font-bold">Premium Plan</h3>
          <p className="mb-4 text-slate-300">
            Everything you need to get started with our platform.
          </p>
          <div className="mb-4 text-2xl font-bold">$29/month</div>
          <button className="w-full rounded bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600">
            Choose Plan
          </button>
        </div>
      </DotsBackground>

      <DotsBackground
        count={25}
        minOpacity={0.1}
        maxOpacity={0.3}
        color="#8B5CF6"
        className="max-w-sm flex-1 rounded-lg border border-purple-400/20 bg-white/10 backdrop-blur-lg"
      >
        <div className="text-white">
          <h3 className="mb-3 text-xl font-bold">Enterprise</h3>
          <p className="mb-4 text-slate-300">Advanced features for larger organizations.</p>
          <div className="mb-4 text-2xl font-bold">$99/month</div>
          <button className="w-full rounded bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-white transition-colors hover:from-purple-600 hover:to-pink-600">
            Contact Sales
          </button>
        </div>
      </DotsBackground>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "DotsCard pattern - glassmorphism cards with subtle dots background, perfect for pricing or feature cards.",
      },
    },
  },
};

/**
 * Multi-layered rainbow effect
 */
export const Rainbow: Story = {
  args: {
    className: "min-h-96 bg-slate-900",
    children: (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Rainbow Dots</h2>
          <p className="text-slate-300">Multiple colored dot layers</p>
        </div>
      </div>
    ),
  },
  render: (args) => (
    <DotsBackground {...args} color="#EF4444" count={20}>
      <DotsBackground color="#F97316" count={20} className="">
        <DotsBackground color="#EAB308" count={20} className="">
          <DotsBackground color="#22C55E" count={20} className="">
            <DotsBackground color="#3B82F6" count={20} className="">
              <DotsBackground color="#8B5CF6" count={20} className="">
                {args.children}
              </DotsBackground>
            </DotsBackground>
          </DotsBackground>
        </DotsBackground>
      </DotsBackground>
    </DotsBackground>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple nested DotsBackground components creating a rainbow effect.",
      },
    },
  },
};

/**
 * Performance test with many dots
 */
export const PerformanceTest: Story = {
  args: {
    className: "min-h-96 bg-slate-900",
    count: 200,
    size: "w-0.5 h-0.5",
    maxDelay: 3,
    minOpacity: 0.2,
    maxOpacity: 0.6,
    children: (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center text-white">
          <h2 className="mb-2 text-2xl font-bold">Performance Test</h2>
          <p className="text-slate-300">200 animated dots</p>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Stress test with 200 dots to evaluate performance impact.",
      },
    },
  },
};
