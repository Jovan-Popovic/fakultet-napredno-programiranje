import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  Bookmark,
  Download,
  Eye,
  Flag,
  Mail,
  MessageSquare,
  Settings,
  Share,
  Shield,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";
import { useState } from "react";

import { Checkbox } from ".";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card/content";
import { CardDescription } from "@/components/ui/card/description";
import { CardHeader } from "@/components/ui/card/header";
import { Card } from "@/components/ui/card/index";
import { CardTitle } from "@/components/ui/card/title";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A checkbox component with multiple variants, sizes, and customization options built on Radix UI.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "success", "warning", "outline"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
      description: "Size of the checkbox",
    },
    shape: {
      control: "select",
      options: ["square", "rounded", "circle"],
      description: "Shape of the checkbox",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in indeterminate state",
    },
    icon: {
      control: "select",
      options: ["check", "minus", "x"],
      description: "Icon to display when checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

// Variant examples
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="space-y-3">
        <h3 className="font-medium">Default</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-unchecked" />
          <Label htmlFor="default-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-checked" checked />
          <Label htmlFor="default-checked">Checked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="default-indeterminate" indeterminate checked />
          <Label htmlFor="default-indeterminate">Indeterminate</Label>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Secondary</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="secondary-unchecked" variant="secondary" />
          <Label htmlFor="secondary-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="secondary-checked" variant="secondary" checked />
          <Label htmlFor="secondary-checked">Checked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="secondary-indeterminate" variant="secondary" indeterminate checked />
          <Label htmlFor="secondary-indeterminate">Indeterminate</Label>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Destructive</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="destructive-unchecked" variant="destructive" />
          <Label htmlFor="destructive-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="destructive-checked" variant="destructive" checked />
          <Label htmlFor="destructive-checked">Checked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="destructive-indeterminate" variant="destructive" indeterminate checked />
          <Label htmlFor="destructive-indeterminate">Indeterminate</Label>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Success</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="success-unchecked" variant="success" />
          <Label htmlFor="success-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="success-checked" variant="success" checked />
          <Label htmlFor="success-checked">Checked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="success-indeterminate" variant="success" indeterminate checked />
          <Label htmlFor="success-indeterminate">Indeterminate</Label>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Warning</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="warning-unchecked" variant="warning" />
          <Label htmlFor="warning-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="warning-checked" variant="warning" checked />
          <Label htmlFor="warning-checked">Checked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="warning-indeterminate" variant="warning" indeterminate checked />
          <Label htmlFor="warning-indeterminate">Indeterminate</Label>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Outline</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="outline-unchecked" variant="outline" />
          <Label htmlFor="outline-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="outline-checked" variant="outline" checked />
          <Label htmlFor="outline-checked">Checked</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="outline-indeterminate" variant="outline" indeterminate checked />
          <Label htmlFor="outline-indeterminate">Indeterminate</Label>
        </div>
      </div>
    </div>
  ),
};

// Size examples
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Checkbox id="size-sm" size="sm" checked />
        <Label htmlFor="size-sm">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="size-default" size="default" checked />
        <Label htmlFor="size-default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="size-lg" size="lg" checked />
        <Label htmlFor="size-lg">Large</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="size-xl" size="xl" checked />
        <Label htmlFor="size-xl">Extra Large</Label>
      </div>
    </div>
  ),
};

// Shape examples
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Checkbox id="shape-square" shape="square" checked />
        <Label htmlFor="shape-square">Square</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="shape-rounded" shape="rounded" checked />
        <Label htmlFor="shape-rounded">Rounded</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="shape-circle" shape="circle" checked />
        <Label htmlFor="shape-circle">Circle</Label>
      </div>
    </div>
  ),
};

// Icon examples
export const Icons: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Checkbox id="icon-check" icon="check" checked />
        <Label htmlFor="icon-check">Check</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="icon-minus" icon="minus" checked />
        <Label htmlFor="icon-minus">Minus</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="icon-x" icon="x" checked />
        <Label htmlFor="icon-x">X</Label>
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="interactive"
            checked={checked}
            indeterminate={indeterminate}
            onCheckedChange={(value) => setChecked(value as boolean)}
          />
          <Label htmlFor="interactive">Interactive Checkbox</Label>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setChecked(!checked)}>
            Toggle Checked
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIndeterminate(!indeterminate)}>
            Toggle Indeterminate
          </Button>
        </div>
      </div>
    );
  },
};

// Form examples
export const TermsAndConditions: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Terms and Conditions</CardTitle>
        <CardDescription>Please review and accept our terms before continuing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="terms" className="mt-1" />
          <Label htmlFor="terms" className="text-sm leading-5">
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="newsletter" className="mt-1" />
          <Label htmlFor="newsletter" className="text-sm leading-5">
            I would like to receive marketing emails about new products and features
          </Label>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="updates" className="mt-1" />
          <Label htmlFor="updates" className="text-sm leading-5">
            Send me important updates and security notifications
          </Label>
        </div>
      </CardContent>
    </Card>
  ),
};

export const TodoList: Story = {
  render: () => {
    const [todos, setTodos] = useState([
      { id: 1, text: "Review design mockups", completed: true },
      { id: 2, text: "Implement authentication", completed: false },
      { id: 3, text: "Write unit tests", completed: false },
      { id: 4, text: "Deploy to staging", completed: false },
      { id: 5, text: "Client presentation", completed: false },
    ]);

    const toggleTodo = (id: number) => {
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
      );
    };

    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalCount = todos.length;

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Todo List
            <Badge variant="outline">
              {completedCount}/{totalCount}
            </Badge>
          </CardTitle>
          <CardDescription>Keep track of your daily tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center space-x-2">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                variant={todo.completed ? "success" : "default"}
              />
              <Label
                htmlFor={`todo-${todo.id}`}
                className={`flex-1 ${todo.completed ? "text-gray-600 line-through dark:text-gray-300" : ""}`}
              >
                {todo.text}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  },
};

export const PreferencesForm: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>
          <Settings className="mr-2 inline h-5 w-5" />
          Preferences
        </CardTitle>
        <CardDescription>Customize your experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="email-notifications" checked />
              <Bell className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="email-notifications">Email notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="push-notifications" />
              <MessageSquare className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="push-notifications">Push notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sms-notifications" />
              <Mail className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="sms-notifications">SMS notifications</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Privacy</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="public-profile" checked />
              <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="public-profile">Public profile</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="show-activity" />
              <Eye className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="show-activity">Show activity status</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="data-collection" />
              <Shield className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="data-collection">Allow data collection</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Features</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-save" checked />
              <Download className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="auto-save">Auto-save documents</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="smart-suggestions" />
              <Star className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="smart-suggestions">Smart suggestions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="collaboration" checked />
              <Share className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Label htmlFor="collaboration">Real-time collaboration</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const PostActions: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Blog Post</CardTitle>
        <CardDescription>Managing your content and interactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
          <h3 className="mb-2 font-medium">How to Build Better UIs</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            A comprehensive guide to creating user interfaces that users love...
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="like-post" variant="success" icon="check" />
            <ThumbsUp className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <Label htmlFor="like-post">Like this post</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="bookmark-post" variant="warning" />
            <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <Label htmlFor="bookmark-post">Save to bookmarks</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="subscribe-author" />
            <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <Label htmlFor="subscribe-author">Subscribe to author</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="share-social" />
            <Share className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <Label htmlFor="share-social">Share on social media</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="report-content" variant="destructive" />
            <Flag className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <Label htmlFor="report-content">Report inappropriate content</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">All Variants</h3>

        <div className="grid grid-cols-2 gap-4">
          {(["default", "secondary", "destructive", "success", "warning", "outline"] as const).map(
            (variant) => (
              <div key={variant} className="space-y-2">
                <h4 className="font-medium capitalize">{variant}</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox variant={variant} />
                  <Checkbox variant={variant} checked />
                  <Checkbox variant={variant} indeterminate checked />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">All Sizes & Shapes</h3>

        <div className="space-y-4">
          {(["sm", "default", "lg", "xl"] as const).map((size) => (
            <div key={size} className="space-y-2">
              <h4 className="font-medium capitalize">{size}</h4>
              <div className="flex items-center space-x-4">
                <Checkbox size={size} shape="square" checked />
                <Checkbox size={size} shape="rounded" checked />
                <Checkbox size={size} shape="circle" checked />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
