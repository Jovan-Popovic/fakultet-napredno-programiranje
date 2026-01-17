import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  Calendar,
  Edit3,
  FileText,
  Filter,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Settings as SettingsIcon,
  ShoppingCart as ShoppingCartIcon,
  User,
} from "lucide-react";

import { SheetContent } from "./content";
import { SheetDescription } from "./description";
import { SheetFooter } from "./footer";
import { SheetHeader } from "./header";
import { SheetTitle } from "./title";
import { SheetTrigger } from "./trigger";

import { Sheet } from ".";

import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar/fallback";
import { AvatarImage } from "@/components/ui/avatar/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A sheet component that displays content that complements the main content of the screen, sliding in from the edge.",
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This is a description of what the sheet contains.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Sheet content goes here. This is a simple example of a sheet component.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" icon={Menu} iconClassName="h-4 w-4 mr-2">
          Open Left Sheet
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Navigate through different sections of the application.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              icon={User}
              iconClassName="h-4 w-4 mr-2"
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              icon={SettingsIcon}
              iconClassName="h-4 w-4 mr-2"
            >
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              icon={Mail}
              iconClassName="h-4 w-4 mr-2"
            >
              Messages
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              icon={Bell}
              iconClassName="h-4 w-4 mr-2"
            >
              Notifications
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Announcement</SheetTitle>
          <SheetDescription>Important information and updates.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:bg-gray-800">
            <h4 className="font-semibold text-blue-600">New Feature Available!</h4>
            <p className="mt-2 text-sm text-blue-500">
              We&apos;ve just released a new feature that will help you manage your tasks more
              efficiently.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Frequently used actions and shortcuts.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex h-16 flex-col text-xs"
              icon={Plus}
              iconClassName="h-5 w-5 mb-1"
            >
              New Item
            </Button>
            <Button
              variant="outline"
              className="flex h-16 flex-col text-xs"
              icon={Search}
              iconClassName="h-5 w-5 mb-1"
            >
              Search
            </Button>
            <Button
              variant="outline"
              className="flex h-16 flex-col text-xs"
              icon={Edit3}
              iconClassName="h-5 w-5 mb-1"
            >
              Edit
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// Real-world use cases
export const UserProfile: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" icon={User} iconClassName="h-4 w-4 mr-2">
          View Profile
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>User Profile</SheetTitle>
          <SheetDescription>View and edit your profile information.</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">john.doe@example.com</p>
              <Badge variant="outline" className="mt-1">
                Premium
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm">john.doe@example.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm">San Francisco, CA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm">Joined March 2023</span>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Edit Profile</Button>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const EditForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button icon={Edit3} iconClassName="h-4 w-4 mr-2">
          Edit Item
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Item</SheetTitle>
          <SheetDescription>
            Make changes to your item here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Product Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue="Product description goes here..."
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" defaultValue="29.99" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" defaultValue="Electronics" />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const ShoppingCart: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" icon={ShoppingCartIcon} iconClassName="h-4 w-4 mr-2">
          Cart (3)
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>Review your items before checkout.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-4 border-b pb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                <span className="text-xs text-gray-500">IMG</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Product {item}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Color: Black, Size: M</p>
                <div className="mt-2 flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    -
                  </Button>
                  <span className="text-sm">1</span>
                  <Button variant="outline" size="sm">
                    +
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">$29.99</p>
                <Button variant="ghost" size="sm" color="red">
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="space-y-2 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$89.97</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$95.96</span>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Continue Shopping</Button>
          <Button>Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FilterPanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" icon={Filter} iconClassName="h-4 w-4 mr-2">
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Options</SheetTitle>
          <SheetDescription>Refine your search results with these filters.</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Price Range</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="under-25" />
                <Label htmlFor="under-25">Under $25</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="25-50" />
                <Label htmlFor="25-50">$25 - $50</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="50-100" />
                <Label htmlFor="50-100">$50 - $100</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="over-100" />
                <Label htmlFor="over-100">Over $100</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Category</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="electronics" />
                <Label htmlFor="electronics">Electronics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="clothing" />
                <Label htmlFor="clothing">Clothing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="books" />
                <Label htmlFor="books">Books</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="home" />
                <Label htmlFor="home">Home & Garden</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Rating</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="5-stars" />
                <Label htmlFor="5-stars">5 Stars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="4-stars" />
                <Label htmlFor="4-stars">4 Stars & Up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="3-stars" />
                <Label htmlFor="3-stars">3 Stars & Up</Label>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Clear All</Button>
          <Button>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Settings: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" icon={SettingsIcon} iconClassName="h-4 w-4 mr-2">
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Manage your account settings and preferences.</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Account</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Email Notifications</Label>
                <input type="checkbox" id="notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing">Marketing Emails</Label>
                <input type="checkbox" id="marketing" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <input type="checkbox" id="two-factor" defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Appearance</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <input type="checkbox" id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compact">Compact View</Label>
                <input type="checkbox" id="compact" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Privacy</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="profile-public">Public Profile</Label>
                <input type="checkbox" id="profile-public" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="search-engines">Search Engine Indexing</Label>
                <input type="checkbox" id="search-engines" />
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save Settings</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const MessageCenter: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" icon={MessageSquare} iconClassName="h-4 w-4 mr-2">
          <div>
            <span>Messages</span>
            <Badge variant="red" className="ml-2">
              3
            </Badge>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Messages</SheetTitle>
          <SheetDescription>Your recent conversations and notifications.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          {[
            {
              name: "Alice Johnson",
              message: "Hey, how's the project going?",
              time: "2m ago",
              unread: true,
            },
            { name: "Bob Smith", message: "Meeting moved to 3 PM", time: "1h ago", unread: true },
            {
              name: "Carol Davis",
              message: "Thanks for the feedback!",
              time: "3h ago",
              unread: false,
            },
            {
              name: "David Wilson",
              message: "Can you review this document?",
              time: "1d ago",
              unread: false,
            },
          ].map((msg, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-start space-x-3 rounded-lg p-3 hover:bg-gray-50"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {msg.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm font-medium ${msg.unread ? "text-foreground" : "text-gray-600 dark:text-gray-300"}`}
                  >
                    {msg.name}
                  </p>
                  <span className="text-xs text-gray-600 dark:text-gray-300">{msg.time}</span>
                </div>
                <p
                  className={`text-sm ${msg.unread ? "text-foreground" : "text-gray-600 dark:text-gray-300"} truncate`}
                >
                  {msg.message}
                </p>
                {msg.unread && <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>}
              </div>
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button variant="outline">Mark All Read</Button>
          <Button>View All Messages</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const DocumentViewer: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" icon={FileText} iconClassName="h-4 w-4 mr-2">
          View Document
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Document: Project Proposal</SheetTitle>
          <SheetDescription>Last modified: March 15, 2024 by John Doe</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="min-h-[400px] rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">Executive Summary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This document outlines the proposed project scope, timeline, and budget for the
                  upcoming initiative...
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Project Goals</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Increase user engagement by 25%</li>
                  <li>• Improve system performance</li>
                  <li>• Enhance user experience</li>
                  <li>• Reduce operational costs</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Timeline</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The project is expected to take 6 months, with major milestones at 2, 4, and 6
                  month intervals...
                </p>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Download PDF</Button>
          <Button variant="outline">Share</Button>
          <Button>Edit Document</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Demo with all sides
export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left Side</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>This sheet opens from the left side.</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Content for left side sheet.</p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right Side</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>This sheet opens from the right side.</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Content for right side sheet.
            </p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top Side</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>This sheet opens from the top.</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Content for top side sheet.</p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom Side</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>This sheet opens from the bottom.</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Content for bottom side sheet.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
