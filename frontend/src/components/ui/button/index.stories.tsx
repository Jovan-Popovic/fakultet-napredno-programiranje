import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Download,
  Edit,
  ExternalLink,
  Heart,
  Mail,
  Moon,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Sparkles,
  Star,
  Sun,
  Trash2,
  User,
  X,
  Zap,
} from "lucide-react";

import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "dashed", "text", "link", "gradient"],
      description: "Visual style variant of the button",
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "gray",
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
      ],
      description: "Color scheme of the button",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the button",
    },
    shape: {
      control: "select",
      options: ["default", "square", "rounded", "pill", "circle"],
      description: "Shape/border radius style",
    },
    loading: {
      control: "boolean",
      description: "Loading state of the button",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state of the button",
    },
    iconPosition: {
      control: "radio",
      options: ["start", "end"],
      description: "Position of the icon relative to text",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic Semantic Variants
export const Default: Story = {
  args: {
    children: "Button",
    variant: "solid",
    color: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "solid",
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "solid",
    color: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "Success Button",
    variant: "solid",
    color: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning Button",
    variant: "solid",
    color: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "solid",
    color: "danger",
  },
};

export const Info: Story = {
  args: {
    children: "Info Button",
    variant: "solid",
    color: "info",
  },
};

// Variant Styles
export const OutlineVariant: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    color: "primary",
  },
};

export const GhostVariant: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    color: "primary",
  },
};

export const DashedVariant: Story = {
  args: {
    children: "Dashed Button",
    variant: "dashed",
    color: "primary",
  },
};

export const TextVariant: Story = {
  args: {
    children: "Text Button",
    variant: "text",
    color: "primary",
  },
};

export const LinkVariant: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

export const GradientVariant: Story = {
  args: {
    children: "Gradient Button",
    variant: "gradient",
    color: "primary",
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    children: "Extra Small",
    size: "xs",
    color: "primary",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
    color: "primary",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "md",
    color: "primary",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
    color: "primary",
  },
};

export const ExtraLarge: Story = {
  args: {
    children: "Extra Large Button",
    size: "xl",
    color: "primary",
  },
};

// Shapes
export const SquareShape: Story = {
  args: {
    children: "Square",
    shape: "square",
    color: "primary",
  },
};

export const DefaultShape: Story = {
  args: {
    children: "Default Shape",
    shape: "default",
    color: "primary",
  },
};

export const RoundedShape: Story = {
  args: {
    children: "Rounded",
    shape: "rounded",
    color: "primary",
  },
};

export const PillShape: Story = {
  args: {
    children: "Pill Shape",
    shape: "pill",
    color: "primary",
  },
};

export const CircleShape: Story = {
  args: {
    icon: Plus,
    shape: "circle",
    color: "primary",
  },
};

// Icon Buttons
export const IconStart: Story = {
  args: {
    children: "Download",
    icon: Download,
    iconPosition: "start",
    color: "primary",
  },
};

export const IconEnd: Story = {
  args: {
    children: "Next",
    icon: ArrowRight,
    iconPosition: "end",
    color: "primary",
  },
};

export const IconOnly: Story = {
  args: {
    icon: Search,
    color: "primary",
  },
};

export const IconOnlyOutline: Story = {
  args: {
    icon: Settings,
    variant: "outline",
    color: "default",
  },
};

export const IconOnlyGhost: Story = {
  args: {
    icon: Heart,
    variant: "ghost",
    color: "danger",
  },
};

// Loading States
export const Loading: Story = {
  args: {
    children: "Loading...",
    loading: true,
    color: "primary",
  },
};

export const LoadingWithIconStart: Story = {
  args: {
    children: "Saving...",
    loading: true,
    iconPosition: "start",
    color: "primary",
  },
};

export const LoadingWithIconEnd: Story = {
  args: {
    children: "Processing",
    loading: true,
    iconPosition: "end",
    color: "primary",
  },
};

export const LoadingIconOnly: Story = {
  args: {
    loading: true,
    color: "primary",
  },
};

// Disabled States
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    color: "primary",
  },
};

export const DisabledWithIcon: Story = {
  args: {
    children: "Can't Delete",
    icon: Trash2,
    disabled: true,
    color: "danger",
  },
};

// Gradient Variations
export const GradientPrimary: Story = {
  args: {
    children: "Ocean Breeze",
    variant: "gradient",
    color: "primary",
    icon: Zap,
  },
};

export const GradientSecondary: Story = {
  args: {
    children: "Purple Dream",
    variant: "gradient",
    color: "secondary",
    icon: Sparkles,
  },
};

export const GradientSuccess: Story = {
  args: {
    children: "Forest Glow",
    variant: "gradient",
    color: "success",
  },
};

export const GradientWarning: Story = {
  args: {
    children: "Sunset Vibes",
    variant: "gradient",
    color: "warning",
  },
};

export const GradientDanger: Story = {
  args: {
    children: "Fire Storm",
    variant: "gradient",
    color: "danger",
  },
};

// All Extended Colors - Solid
export const ExtendedColorsSolid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h3>Extended Color Palette - Solid</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
        <Button color="gray">Gray</Button>
        <Button color="red">Red</Button>
        <Button color="orange">Orange</Button>
        <Button color="amber">Amber</Button>
        <Button color="yellow">Yellow</Button>
        <Button color="lime">Lime</Button>
        <Button color="green">Green</Button>
        <Button color="emerald">Emerald</Button>
        <Button color="teal">Teal</Button>
        <Button color="cyan">Cyan</Button>
        <Button color="sky">Sky</Button>
        <Button color="blue">Blue</Button>
        <Button color="indigo">Indigo</Button>
        <Button color="violet">Violet</Button>
        <Button color="purple">Purple</Button>
        <Button color="fuchsia">Fuchsia</Button>
        <Button color="pink">Pink</Button>
        <Button color="rose">Rose</Button>
      </div>
    </div>
  ),
};

// All Extended Colors - Outline
export const ExtendedColorsOutline: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h3>Extended Color Palette - Outline</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
        <Button variant="outline" color="gray">
          Gray
        </Button>
        <Button variant="outline" color="red">
          Red
        </Button>
        <Button variant="outline" color="orange">
          Orange
        </Button>
        <Button variant="outline" color="amber">
          Amber
        </Button>
        <Button variant="outline" color="yellow">
          Yellow
        </Button>
        <Button variant="outline" color="lime">
          Lime
        </Button>
        <Button variant="outline" color="green">
          Green
        </Button>
        <Button variant="outline" color="emerald">
          Emerald
        </Button>
        <Button variant="outline" color="teal">
          Teal
        </Button>
        <Button variant="outline" color="cyan">
          Cyan
        </Button>
        <Button variant="outline" color="sky">
          Sky
        </Button>
        <Button variant="outline" color="blue">
          Blue
        </Button>
        <Button variant="outline" color="indigo">
          Indigo
        </Button>
        <Button variant="outline" color="violet">
          Violet
        </Button>
        <Button variant="outline" color="purple">
          Purple
        </Button>
        <Button variant="outline" color="fuchsia">
          Fuchsia
        </Button>
        <Button variant="outline" color="pink">
          Pink
        </Button>
        <Button variant="outline" color="rose">
          Rose
        </Button>
      </div>
    </div>
  ),
};

// All Extended Colors - Ghost
export const ExtendedColorsGhost: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h3>Extended Color Palette - Ghost</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
        <Button variant="ghost" color="gray">
          Gray
        </Button>
        <Button variant="ghost" color="red">
          Red
        </Button>
        <Button variant="ghost" color="orange">
          Orange
        </Button>
        <Button variant="ghost" color="amber">
          Amber
        </Button>
        <Button variant="ghost" color="yellow">
          Yellow
        </Button>
        <Button variant="ghost" color="lime">
          Lime
        </Button>
        <Button variant="ghost" color="green">
          Green
        </Button>
        <Button variant="ghost" color="emerald">
          Emerald
        </Button>
        <Button variant="ghost" color="teal">
          Teal
        </Button>
        <Button variant="ghost" color="cyan">
          Cyan
        </Button>
        <Button variant="ghost" color="sky">
          Sky
        </Button>
        <Button variant="ghost" color="blue">
          Blue
        </Button>
        <Button variant="ghost" color="indigo">
          Indigo
        </Button>
        <Button variant="ghost" color="violet">
          Violet
        </Button>
        <Button variant="ghost" color="purple">
          Purple
        </Button>
        <Button variant="ghost" color="fuchsia">
          Fuchsia
        </Button>
        <Button variant="ghost" color="pink">
          Pink
        </Button>
        <Button variant="ghost" color="rose">
          Rose
        </Button>
      </div>
    </div>
  ),
};

// Icon Only Sizes
export const IconOnlySizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Button size="xs" icon={Star} color="primary" />
      <Button size="sm" icon={Star} color="primary" />
      <Button size="md" icon={Star} color="primary" />
      <Button size="lg" icon={Star} color="primary" />
      <Button size="xl" icon={Star} color="primary" />
    </div>
  ),
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button variant="solid" color="primary">
          Solid
        </Button>
        <Button variant="outline" color="primary">
          Outline
        </Button>
        <Button variant="ghost" color="primary">
          Ghost
        </Button>
        <Button variant="dashed" color="primary">
          Dashed
        </Button>
        <Button variant="text" color="primary">
          Text
        </Button>
        <Button variant="link">Link</Button>
        <Button variant="gradient" color="primary">
          Gradient
        </Button>
      </div>
    </div>
  ),
};

// All Semantic Colors Showcase
export const AllSemanticColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <Button color="info">Info</Button>
      </div>
    </div>
  ),
};

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
      <Button size="xs" color="primary">
        XS
      </Button>
      <Button size="sm" color="primary">
        SM
      </Button>
      <Button size="md" color="primary">
        MD
      </Button>
      <Button size="lg" color="primary">
        LG
      </Button>
      <Button size="xl" color="primary">
        XL
      </Button>
    </div>
  ),
};

// All Shapes Showcase
export const AllShapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
      <Button shape="square" color="primary">
        Square
      </Button>
      <Button shape="default" color="primary">
        Default
      </Button>
      <Button shape="rounded" color="primary">
        Rounded
      </Button>
      <Button shape="pill" color="primary">
        Pill
      </Button>
      <Button shape="circle" color="primary" icon={Plus} />
    </div>
  ),
};

// Common Use Cases
export const CommonUseCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3 style={{ marginBottom: "12px" }}>Form Actions</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button color="primary" icon={Check}>
            Submit
          </Button>
          <Button variant="outline" color="default" icon={X}>
            Cancel
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px" }}>CRUD Operations</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button color="success" icon={Plus}>
            Create
          </Button>
          <Button color="primary" icon={Edit}>
            Edit
          </Button>
          <Button color="danger" icon={Trash2}>
            Delete
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px" }}>Navigation</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="link" icon={ExternalLink} iconPosition="end">
            External Link
          </Button>
          <Button variant="ghost" icon={ChevronRight} iconPosition="end">
            Next Page
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px" }}>Icon Only Actions</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button icon={Bell} variant="ghost" color="default" />
          <Button icon={Mail} variant="ghost" color="default" />
          <Button icon={Settings} variant="ghost" color="default" />
          <Button icon={User} variant="ghost" color="default" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px" }}>Loading States</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button loading color="primary">
            Saving...
          </Button>
          <Button loading variant="outline" color="default">
            Loading...
          </Button>
          <Button loading icon={RefreshCw} color="success">
            Updating
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px" }}>Theme Toggle</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button icon={Sun} variant="ghost" color="amber" />
          <Button icon={Moon} variant="ghost" color="indigo" />
        </div>
      </div>
    </div>
  ),
};

// Semantic Colors Matrix - All Variants
export const SemanticColorMatrix: Story = {
  render: () => {
    const variants = ["solid", "outline", "ghost", "dashed", "text", "gradient"] as const;
    const colors = [
      "default",
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "info",
    ] as const;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "100px repeat(7, 1fr)",
          gap: "8px",
          fontSize: "12px",
        }}
      >
        <div></div>
        {colors.map((color) => (
          <div
            key={color}
            style={{ textAlign: "center", fontWeight: "bold", textTransform: "capitalize" }}
          >
            {color}
          </div>
        ))}

        {variants.map((variant) => (
          <>
            <div
              key={variant}
              style={{ fontWeight: "bold", alignSelf: "center", textTransform: "capitalize" }}
            >
              {variant}
            </div>
            {colors.map((color) => (
              <Button key={`${variant}-${color}`} variant={variant} color={color} size="sm">
                Button
              </Button>
            ))}
          </>
        ))}
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

// Extended Color Palette Grid
export const ExtendedColorGrid: Story = {
  render: () => {
    const colors = [
      "gray",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ marginBottom: "12px" }}>Solid Variant</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
            {colors.map((color) => (
              <Button key={`solid-${color}`} color={color} size="sm">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "12px" }}>Outline Variant</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
            {colors.map((color) => (
              <Button key={`outline-${color}`} variant="outline" color={color} size="sm">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "12px" }}>Ghost Variant</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
            {colors.map((color) => (
              <Button key={`ghost-${color}`} variant="ghost" color={color} size="sm">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

// Complex Loading States
export const LoadingStatesShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Button loading size="xs" color="primary">
          XS Loading
        </Button>
        <Button loading size="sm" color="primary">
          SM Loading
        </Button>
        <Button loading size="md" color="primary">
          MD Loading
        </Button>
        <Button loading size="lg" color="primary">
          LG Loading
        </Button>
        <Button loading size="xl" color="primary">
          XL Loading
        </Button>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button loading iconPosition="start" color="success">
          Start Icon
        </Button>
        <Button loading iconPosition="end" color="warning">
          End Icon
        </Button>
        <Button loading icon={Save} color="info">
          Icon Only
        </Button>
      </div>
    </div>
  ),
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3 style={{ marginBottom: "12px" }}>Long Text Truncation</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button style={{ maxWidth: "200px" }}>
            This is a very long button text that should truncate
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px" }}>Icon Only Auto Circle</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button icon={Plus} size="xs" color="primary" />
          <Button icon={Edit} size="sm" color="secondary" />
          <Button icon={Trash2} size="md" color="danger" />
          <Button icon={Settings} size="lg" color="info" />
          <Button icon={Star} size="xl" color="warning" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px" }}>Disabled States</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button disabled>Solid Disabled</Button>
          <Button disabled variant="outline">
            Outline Disabled
          </Button>
          <Button disabled variant="ghost">
            Ghost Disabled
          </Button>
          <Button disabled loading>
            Loading Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};
