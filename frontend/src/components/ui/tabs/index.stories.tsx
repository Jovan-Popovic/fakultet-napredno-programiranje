import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useState } from "react";

import { TabsContent } from "./components/content";
import { TabsList } from "./components/list";
import { TabsTrigger } from "./components/trigger";

import { Tabs } from ".";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-96">
      <TabsList>
        <TabsTrigger value="home">
          <HomeIcon />
          Home
        </TabsTrigger>
        <TabsTrigger value="profile">
          <UserIcon />
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings">
          <SettingsIcon />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Home Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Welcome to your dashboard! Here you can see an overview of your account.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="profile" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Manage your profile information and preferences.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Configure your application settings and preferences.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-4xl">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,234</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$12,345</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Detailed analytics and insights about your application usage.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Generate and view various reports about your business metrics.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Manage your notification preferences and settings.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="general" className="flex w-96" orientation="vertical">
      <TabsList className="h-fit w-32 flex-col">
        <TabsTrigger value="general" className="w-full">
          General
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full">
          Security
        </TabsTrigger>
        <TabsTrigger value="billing" className="w-full">
          Billing
        </TabsTrigger>
      </TabsList>
      <div className="ml-4 flex-1">
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Configure your general account settings.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Manage your security preferences and two-factor authentication.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">View and update your billing information and subscription.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="available" className="w-96">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
      </TabsList>
      <TabsContent value="available" className="mt-4">
        <p className="text-sm">This tab is available and can be clicked.</p>
      </TabsContent>
      <TabsContent value="disabled" className="mt-4">
        <p className="text-sm">This content won&apos;t be shown because the tab is disabled.</p>
      </TabsContent>
      <TabsContent value="active" className="mt-4">
        <p className="text-sm">Another available tab with content.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-2xl">
      <TabsList className="overflow-x-auto">
        {Array.from({ length: 8 }, (_, i) => (
          <TabsTrigger key={`tab${i + 1}`} value={`tab${i + 1}`}>
            Tab {i + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      {Array.from({ length: 8 }, (_, i) => (
        <TabsContent key={`tab${i + 1}`} value={`tab${i + 1}`} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tab {i + 1} Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">This is the content for tab {i + 1}.</p>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" className="w-full max-w-3xl">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>Add New</Button>
        </div>
      </div>
      <TabsContent value="dashboard" className="mt-4">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">847</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Orders Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">23</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$5,432</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="users" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Manage your application users, roles, and permissions.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="products" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Manage your product inventory and catalog.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
      <div className="w-96">
        <div className="mb-4 flex gap-2">
          <Button
            variant={activeTab === "tab1" ? "solid" : "outline"}
            color={activeTab === "tab1" ? "default" : "default"}
            onClick={() => setActiveTab("tab1")}
          >
            Go to Tab 1
          </Button>

          <Button
            variant={activeTab === "tab2" ? "solid" : "outline"}
            color={activeTab === "tab2" ? "default" : "default"}
            onClick={() => setActiveTab("tab2")}
          >
            Go to Tab 2
          </Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-sm">Controlled Tab 1 content. Active tab: {activeTab}</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-sm">Controlled Tab 2 content. Active tab: {activeTab}</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-sm">Controlled Tab 3 content. Active tab: {activeTab}</p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};
