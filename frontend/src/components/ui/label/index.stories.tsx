import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertTriangle,
  Calendar,
  Eye,
  EyeOff,
  Heart,
  Info,
  Lock,
  Mail,
  Phone,
  Star,
  User,
} from "lucide-react";

import { Label } from ".";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A label component that provides accessible labels for form controls with proper association and styling.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the label",
    },
    htmlFor: {
      control: "text",
      description: "Associates the label with a form control",
    },
    children: {
      control: "text",
      description: "Content of the label",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    children: "Default Label",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <User className="h-4 w-4" />
        Username
      </>
    ),
  },
};

export const Required: Story = {
  args: {
    children: (
      <>
        Email Address
        <span className="text-red-500">*</span>
      </>
    ),
  },
};

export const Optional: Story = {
  args: {
    children: (
      <>
        Phone Number
        <span className="text-gray-600 dark:text-gray-300">(optional)</span>
      </>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    children: (
      <>
        Premium Feature
        <Badge variant="blue" className="text-xs">
          Pro
        </Badge>
      </>
    ),
  },
};

// Form field examples
export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">
        <Mail className="h-4 w-4" />
        Email Address
        <span className="text-red-500">*</span>
      </Label>
      <Input id="email" type="email" placeholder="Enter your email" required />
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="description">
        Description
        <span className="text-gray-600 dark:text-gray-300">(optional)</span>
      </Label>
      <Textarea id="description" placeholder="Enter a description..." rows={3} />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">
        I agree to the terms and conditions
        <span className="text-red-500">*</span>
      </Label>
    </div>
  ),
};

// export const WithRadioGroup: Story = {
//   render: () => (
//     <div className="space-y-3">
//       <Label>
//         <CreditCard className="h-4 w-4" />
//         Payment Method
//       </Label>
//       <RadioGroup defaultValue="card" className="space-y-2">
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value="card" id="card" />
//           <Label htmlFor="card">Credit Card</Label>
//         </div>
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value="paypal" id="paypal" />
//           <Label htmlFor="paypal">PayPal</Label>
//         </div>
//         <div className="flex items-center space-x-2">
//           <RadioGroupItem value="bank" id="bank" />
//           <Label htmlFor="bank">Bank Transfer</Label>
//         </div>
//       </RadioGroup>
//     </div>
//   ),
// };

export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
};

// State examples
export const DisabledField: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled-input">
        <Lock className="h-4 w-4" />
        Disabled Field
      </Label>
      <Input id="disabled-input" placeholder="This field is disabled" disabled />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="error-input" className="text-red-500">
        <AlertTriangle className="h-4 w-4" />
        Email Address
        <span className="text-red-500">*</span>
      </Label>
      <Input
        id="error-input"
        type="email"
        placeholder="Enter your email"
        className="border-red-500"
      />
      <p className="text-sm text-red-500">Please enter a valid email address</p>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="password">
        <Lock className="h-4 w-4" />
        Password
      </Label>
      <Input id="password" type="password" placeholder="Enter your password" />
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Must be at least 8 characters with uppercase, lowercase, and numbers
      </p>
    </div>
  ),
};

export const WithInfoIcon: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="api-key">
        <Info className="h-4 w-4" />
        API Key
        <span className="text-gray-600 dark:text-gray-300">(optional)</span>
      </Label>
      <Input id="api-key" placeholder="Enter your API key" />
      <p className="text-sm text-gray-600 dark:text-gray-300">
        You can find your API key in your account settings
      </p>
    </div>
  ),
};

// Complex form examples
export const LoginForm: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">
          <User className="h-4 w-4" />
          Email Address
        </Label>
        <Input id="login-email" type="email" placeholder="Enter your email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">
          <Lock className="h-4 w-4" />
          Password
        </Label>
        <Input id="login-password" type="password" placeholder="Enter your password" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      <Button className="w-full">Sign In</Button>
    </div>
  ),
};

export const ProfileForm: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">
            First Name
            <span className="text-red-500">*</span>
          </Label>
          <Input id="first-name" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">
            Last Name
            <span className="text-red-500">*</span>
          </Label>
          <Input id="last-name" placeholder="Doe" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-email">
          <Mail className="h-4 w-4" />
          Email Address
        </Label>
        <Input id="profile-email" type="email" placeholder="john.doe@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-phone">
          <Phone className="h-4 w-4" />
          Phone Number
          <span className="text-gray-600 dark:text-gray-300">(optional)</span>
        </Label>
        <Input id="profile-phone" type="tel" placeholder="+1 (555) 123-4567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birth-date">
          <Calendar className="h-4 w-4" />
          Date of Birth
        </Label>
        <Input id="birth-date" type="date" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          About Me
          <span className="text-gray-600 dark:text-gray-300">(optional)</span>
        </Label>
        <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
      </div>

      <div className="flex space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  ),
};

export const SettingsForm: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notifications</h3>

        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">
            <Mail className="h-4 w-4" />
            Email Notifications
          </Label>
          <Switch id="email-notifications" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">
            <Info className="h-4 w-4" />
            Push Notifications
          </Label>
          <Switch id="push-notifications" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="marketing-emails">
            <Star className="h-4 w-4" />
            Marketing Emails
          </Label>
          <Switch id="marketing-emails" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Privacy</h3>

        <div className="flex items-center justify-between">
          <Label htmlFor="profile-visibility">
            <Eye className="h-4 w-4" />
            Public Profile
          </Label>
          <Switch id="profile-visibility" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="activity-status">
            <Heart className="h-4 w-4" />
            Show Activity Status
          </Label>
          <Switch id="activity-status" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="search-visibility">
            <EyeOff className="h-4 w-4" />
            Hide from Search
          </Label>
          <Switch id="search-visibility" />
        </div>
      </div>

      <Button className="w-full">Save Settings</Button>
    </div>
  ),
};

// Different styling examples
export const StyledLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-lg font-bold">Large Bold Label</Label>
        <Input placeholder="Large label example" />
      </div>

      <div className="space-y-2">
        <Label className="text-blue-600">Colored Label</Label>
        <Input placeholder="Colored label example" />
      </div>

      <div className="space-y-2">
        <Label className="text-xs tracking-wide text-gray-600 uppercase dark:text-gray-300">
          Uppercase Label
        </Label>
        <Input placeholder="Uppercase label example" />
      </div>

      <div className="space-y-2">
        <Label className="italic">Italic Label</Label>
        <Input placeholder="Italic label example" />
      </div>
    </div>
  ),
};

export const LabelSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs">Extra Small Label</Label>
        <Input placeholder="XS label" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Small Label (Default)</Label>
        <Input placeholder="Small label" />
      </div>

      <div className="space-y-2">
        <Label className="text-base">Medium Label</Label>
        <Input placeholder="Medium label" />
      </div>

      <div className="space-y-2">
        <Label className="text-lg">Large Label</Label>
        <Input placeholder="Large label" />
      </div>
    </div>
  ),
};
