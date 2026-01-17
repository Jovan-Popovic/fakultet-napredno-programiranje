import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { DialogContent } from "./components/content";
import { DialogDescription } from "./components/description";
import { DialogFooter } from "./components/footer";
import { DialogHeader } from "./components/header";
import { DialogTitle } from "./components/title";
import { DialogTrigger } from "./components/trigger";

import { Dialog } from ".";

import { Button } from "@/components/ui/button";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Basic Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Basic Dialog</DialogTitle>
          <DialogDescription>A short description can live here.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog with Footer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you absolutely sure? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Controlled Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog&apos;s open state is fully controlled.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const Small: Story = {
  name: "Smaller",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Small Dialog</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Small Dialog</DialogTitle>
          <DialogDescription>
            A compact dialog for simple messages and confirmations.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm">
            This content is constrained to a narrow width, making it perfect for simple messages,
            alerts, or basic confirmations where you don&apos;t need much horizontal space.
          </p>
          <div className="rounded bg-gray-50 p-3 text-center text-xs dark:bg-gray-900">
            Compact width perfect for alerts and simple confirmations
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const Large: Story = {
  name: "Larger",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Large Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Large Dialog</DialogTitle>
          <DialogDescription>
            A wide dialog with plenty of space for complex content and layouts.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-sm">
            This content has much more horizontal space available, making it suitable for displaying
            richer content, data tables, or side-by-side layouts without feeling cramped.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded bg-gray-50 p-4 text-center dark:bg-gray-900">
              <h4 className="font-medium">Column 1</h4>
              <p className="mt-2 text-xs">
                Content can be organized in multiple columns when you have this much width
                available.
              </p>
            </div>
            <div className="rounded bg-gray-50 p-4 text-center dark:bg-gray-900">
              <h4 className="font-medium">Column 2</h4>
              <p className="mt-2 text-xs">
                Perfect for dashboards, data visualization, or complex layouts.
              </p>
            </div>
            <div className="rounded bg-gray-50 p-4 text-center dark:bg-gray-900">
              <h4 className="font-medium">Column 3</h4>
              <p className="mt-2 text-xs">
                The wider format allows for better content density and organization.
              </p>
            </div>
          </div>
          <div className="rounded bg-gray-50 p-3 text-center text-xs dark:bg-gray-900">
            Wide format for rich content and complex layouts
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const Scrollable: Story = {
  name: "Scrollable Content",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Scrollable Dialog</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scrollable Dialog</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>
              Line {i + 1}: Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const ScrollableFixedHeader: Story = {
  name: "Scrollable with Fixed Header",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Fixed Header Dialog</Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[70vh] flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Fixed Header Dialog</DialogTitle>
        </DialogHeader>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>
              Line {i + 1}: Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis
              nostrud exercitation.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Form Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to newsletter</DialogTitle>
          <DialogDescription>Enter your email below to receive our updates.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="border-input focus:ring-ring w-full rounded-md border bg-gray-50 px-3 py-2 text-sm focus:border-transparent focus:ring-2 dark:bg-gray-900"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input id="marketing" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="marketing" className="text-sm">
              I want to receive marketing emails
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  ),
};

export const Nested: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Parent Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parent Dialog</DialogTitle>
        </DialogHeader>
        <DialogDescription>Click below to open a nested dialog.</DialogDescription>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="solid" color="secondary">
              Open Nested
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nested Dialog</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              This is a dialog opened from inside another dialog.
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  ),
};

export const ResponsiveFullScreen: Story = {
  name: "Full Screen on Mobile",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Responsive Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:my-8 sm:max-w-lg sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle>Responsive Dialog</DialogTitle>
        </DialogHeader>
        <p className="text-sm">
          On mobile the dialog takes the full screen; on larger screens it is centered with rounded
          corners.
        </p>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  name: "Destructive Action",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="solid" color="danger">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-destructive/10 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-destructive text-sm font-medium">
                Warning: This is irreversible
              </h3>
              <div className="text-destructive/80 mt-2 text-sm">
                <ul className="list-disc space-y-1 pl-5">
                  <li>All your projects will be deleted</li>
                  <li>Your subscription will be cancelled</li>
                  <li>You will lose access to all shared content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="solid" color="danger">
            Yes, delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
