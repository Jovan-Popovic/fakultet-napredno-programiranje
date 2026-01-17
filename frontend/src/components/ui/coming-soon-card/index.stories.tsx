import type { Meta, StoryObj } from "@storybook/react-vite";

import { ComingSoonCard, type Props } from ".";

/* ───────────────────────────── Storybook Metadata ─────────────────────────── */

const meta: Meta<Props> = {
  title: "UI/ComingSoonCard",
  component: ComingSoonCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A card component used to indicate features that are under development. Displays customizable content with animations and branding.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal", "elevated"],
      description: "Visual style variant of the card",
    },
    feature: {
      control: "text",
      description: "The name of the feature coming soon",
    },
    title: {
      control: "text",
      description: "Main title of the card",
    },
    description: {
      control: "text",
      description: "Description text below the title",
    },
    showLogo: {
      control: "boolean",
      description: "Whether to display the logo",
    },
    showAnimation: {
      control: "boolean",
      description: "Whether to show the bouncing animation dots",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  args: {
    feature: "Stripe payments",
    title: "Coming Soon",
    description: "We're working on something amazing!",
    showLogo: true,
    showAnimation: true,
    variant: "default",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/* ────────────────────────────────── Stories ───────────────────────────────── */

export const Default: Story = {
  args: {
    feature: "Stripe payments",
  },
};

export const WithoutLogo: Story = {
  args: {
    feature: "Analytics Dashboard",
    showLogo: false,
  },
};

export const WithoutAnimation: Story = {
  args: {
    feature: "Advanced Reporting",
    showAnimation: false,
  },
};

export const CustomContent: Story = {
  args: {
    feature: "PayPal Integration",
    title: "Under Development",
    description: "Our team is working hard to bring you this feature!",
  },
};

export const MinimalVariant: Story = {
  args: {
    feature: "Email Notifications",
    variant: "minimal",
  },
};

export const ElevatedVariant: Story = {
  args: {
    feature: "Social Media Integration",
    variant: "elevated",
  },
};

export const Minimal: Story = {
  args: {
    feature: "API Access",
    title: "Coming Soon",
    description: "Stay tuned!",
    showLogo: false,
    showAnimation: false,
    variant: "minimal",
  },
};

/* ────────────────────────────── Showcase Stories ──────────────────────────── */

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "500px" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "600" }}>Default</h3>
        <ComingSoonCard feature="Feature A" variant="default" />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "600" }}>Minimal</h3>
        <ComingSoonCard feature="Feature B" variant="minimal" />
      </div>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "600" }}>Elevated</h3>
        <ComingSoonCard feature="Feature C" variant="elevated" />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const FeatureShowcase: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
        maxWidth: "1000px",
      }}
    >
      <ComingSoonCard feature="Stripe payments" />
      <ComingSoonCard feature="PayPal Integration" variant="elevated" />
      <ComingSoonCard feature="Analytics Dashboard" showAnimation={false} />
      <ComingSoonCard feature="Email Templates" variant="minimal" showLogo={false} />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const UseCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "500px" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}>
          Payment Integration
        </h3>
        <ComingSoonCard
          feature="Stripe payments"
          title="Payment Processing"
          description="Secure payment integration is on its way!"
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}>
          Admin Features
        </h3>
        <ComingSoonCard
          feature="Advanced Analytics"
          title="Coming Soon"
          description="Powerful insights and reporting tools are in development."
          variant="elevated"
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}>
          Simple Placeholder
        </h3>
        <ComingSoonCard
          feature="API Documentation"
          variant="minimal"
          showLogo={false}
          showAnimation={false}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
