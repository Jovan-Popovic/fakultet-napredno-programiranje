import type { Meta, StoryObj } from "@storybook/react-vite";

import { AvatarFallback } from "./fallback";
import { AvatarImage } from "./image";

import { Avatar } from "./index";

import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card/content";
import { CardDescription } from "@/components/ui/card/description";
import { CardHeader } from "@/components/ui/card/header";
import { Card } from "@/components/ui/card/index";
import { CardTitle } from "@/components/ui/card/title";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An avatar component for displaying user profile pictures with fallback support.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarDefault: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const AvatarFallbackOnly: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const AvatarSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar className="h-6 w-6">
        <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
        <AvatarFallback className="text-xs">XS</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="border-background border-2">
        <AvatarImage src="/placeholder-avatar.jpg" alt="@user1" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarImage src="/placeholder-avatar.jpg" alt="@user2" />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarImage src="/placeholder-avatar.jpg" alt="@user3" />
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const AvatarWithStatus: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="border-background absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 bg-green-500"></div>
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div className="border-background absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 bg-yellow-500"></div>
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <div className="border-background absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 bg-gray-400"></div>
      </div>
    </div>
  ),
};

export const AvatarVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Default Avatars</Label>
        <div className="flex space-x-2">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-blue-500 text-white">CD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Square Avatars</Label>
        <div className="flex space-x-2">
          <Avatar className="rounded-lg">
            <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="rounded-lg">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar className="rounded-lg">
            <AvatarFallback className="bg-green-500 text-white">CD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Colored Backgrounds</Label>
        <div className="flex space-x-2">
          <Avatar>
            <AvatarFallback className="bg-red-500 text-white">R</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-blue-500 text-white">B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-green-500 text-white">G</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-purple-500 text-white">P</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-orange-500 text-white">O</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
};

export const AvatarRealWorld: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt="@johndoe" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">john.doe@example.com</p>
              <Badge variant="outline">Premium Member</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Project contributors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="@alice" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div className="border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 bg-green-500"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Alice Johnson</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Project Manager</p>
              </div>
              <Badge variant="outline">Admin</Badge>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="@bob" />
                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <div className="border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 bg-yellow-500"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Bob Smith</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Developer</p>
              </div>
              <Badge variant="outline">Member</Badge>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="@carol" />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <div className="border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 bg-gray-400"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Carol Davis</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Designer</p>
              </div>
              <Badge variant="outline">Member</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="@alice" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <strong>Alice Johnson</strong> completed the design review
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="@bob" />
                <AvatarFallback>BS</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <strong>Bob Smith</strong> pushed new commits to main branch
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="@carol" />
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <strong>Carol Davis</strong> updated the project mockups
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">6 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
