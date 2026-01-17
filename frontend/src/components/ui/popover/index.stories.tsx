import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, Settings, User, X } from "lucide-react";
import { useState } from "react";

import { PopoverAnchor } from "./components/anchor";
import { PopoverClose } from "./components/close";
import { PopoverContent } from "./components/content";
import { PopoverTrigger } from "./components/trigger";

import { Popover } from ".";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A popover component built on Radix UI that displays rich content in a portal, triggered by a button.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" icon={Settings} iconClassName="mr-2 h-4 w-4">
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-start justify-between">
          <div className="grid flex-1 gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Settings</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Configure your preferences.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@username" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="user@example.com" className="col-span-2 h-8" />
              </div>
            </div>
          </div>
          <PopoverClose asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithAnchor: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex items-center space-x-8">
        <Popover open={open} onOpenChange={setOpen}>
          <div className="space-y-4">
            <PopoverAnchor asChild>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900">
                <User className="h-6 w-6" />
              </div>
            </PopoverAnchor>
            <PopoverTrigger asChild>
              <Button variant="outline">Show Profile Info</Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="w-64" align="center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">john@example.com</p>
                </div>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <strong>Role:</strong> Developer
                </p>
                <p>
                  <strong>Team:</strong> Frontend
                </p>
                <p>
                  <strong>Location:</strong> New York
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Popover is {open ? "open" : "closed"}</span>
          <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Open"}
          </Button>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" icon={Calendar} iconClassName="mr-2 h-4 w-4">
              Schedule
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Schedule Meeting</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Choose a date and time for your meeting.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" defaultValue="1 hour" className="col-span-2 h-8" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <PopoverClose asChild>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </PopoverClose>
                <Button size="sm">Schedule</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const Positioning: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-8">
      {/* Top */}
      <div></div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-64">
          <p className="text-sm">This popover appears on top.</p>
        </PopoverContent>
      </Popover>
      <div></div>

      {/* Left and Right */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-64">
          <p className="text-sm">This popover appears on the left.</p>
        </PopoverContent>
      </Popover>
      <div></div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-64">
          <p className="text-sm">This popover appears on the right.</p>
        </PopoverContent>
      </Popover>

      {/* Bottom */}
      <div></div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-64">
          <p className="text-sm">This popover appears on the bottom.</p>
        </PopoverContent>
      </Popover>
      <div></div>
    </div>
  ),
};
