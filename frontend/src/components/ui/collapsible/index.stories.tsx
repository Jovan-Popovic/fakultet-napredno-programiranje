import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Filter,
  Heart,
  Info,
  Mail,
  MessageSquare,
  Settings,
  Share,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";

import { CollapsibleContent } from "./content";
import { CollapsibleTrigger } from "./trigger";

import { Collapsible } from "./index";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card/content";
import { CardDescription } from "@/components/ui/card/description";
import { CardHeader } from "@/components/ui/card/header";
import { Card } from "@/components/ui/card/index";
import { CardTitle } from "@/components/ui/card/title";
import { Checkbox } from "@/components/ui/checkbox/index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A collapsible component that can hide and show content with smooth animations.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the collapsible is open",
    },
    onOpenChange: {
      description: "Callback fired when the open state changes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the collapsible is disabled",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="flex w-64 items-center justify-between"
            icon={ChevronDown}
            iconClassName={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            Toggle Content
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <p className="text-sm">This is the collapsible content that can be hidden or shown.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const WithCard: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Card className="w-96">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Dark Mode</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Marketing Emails</Label>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  },
};

export const FAQ: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (item: string) => {
      setOpenItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };

    const faqs = [
      {
        id: "billing",
        question: "How does billing work?",
        answer:
          "We bill monthly based on your usage. You can upgrade or downgrade your plan at any time, and changes will be reflected in your next billing cycle.",
      },
      {
        id: "support",
        question: "What kind of support do you offer?",
        answer:
          "We offer 24/7 email support for all plans, with priority phone support available for Pro and Enterprise customers.",
      },
      {
        id: "data",
        question: "How is my data protected?",
        answer:
          "Your data is encrypted at rest and in transit. We use industry-standard security practices and undergo regular security audits.",
      },
      {
        id: "integration",
        question: "Can I integrate with other tools?",
        answer:
          "Yes! We offer integrations with popular tools like Slack, GitHub, Jira, and many others. You can also use our API for custom integrations.",
      },
    ];

    return (
      <div className="w-full max-w-2xl space-y-2">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <Collapsible open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-left">{faq.question}</CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${openItems.includes(faq.id) ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    );
  },
};

export const NavigationMenu: Story = {
  render: () => {
    const [openSections, setOpenSections] = useState<string[]>(["dashboard"]);

    const toggleSection = (section: string) => {
      setOpenSections((prev) =>
        prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
      );
    };

    const menuItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Settings className="h-4 w-4" />,
        items: ["Overview", "Analytics", "Reports", "Export"],
      },
      {
        id: "users",
        label: "User Management",
        icon: <User className="h-4 w-4" />,
        items: ["All Users", "Roles", "Permissions", "Invitations"],
      },
      {
        id: "content",
        label: "Content",
        icon: <FileText className="h-4 w-4" />,
        items: ["Posts", "Pages", "Media Library", "Categories"],
      },
      {
        id: "settings",
        label: "Settings",
        icon: <Settings className="h-4 w-4" />,
        items: ["General", "Security", "Integrations", "Billing"],
      },
    ];

    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
          <CardDescription>Main menu sections</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {menuItems.map((section) => (
              <div key={section.id}>
                <Collapsible
                  open={openSections.includes(section.id)}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-10 w-full justify-between px-4"
                      icon={ChevronRight}
                      iconClassName={`h-4 w-4 transition-transform ${openSections.includes(section.id) ? "rotate-90" : ""}`}
                    >
                      <div className="flex items-center space-x-2">
                        {section.icon}
                        <span>{section.label}</span>
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-6 space-y-1 pb-2">
                      {section.items.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          className="hover:text-foreground h-8 w-full justify-start px-4 text-sm text-gray-600 dark:text-gray-300"
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                {section.id !== "settings" && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const AdvancedFilters: Story = {
  render: () => {
    const [filtersOpen, setFiltersOpen] = useState(false);

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search Filters</span>
          </CardTitle>
          <CardDescription>Refine your search results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Search Query</Label>
            <Input placeholder="Enter your search..." />
          </div>

          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex-row-reverse justify-between"
                icon={ChevronDown}
                iconClassName={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
              >
                <div className="flex flex-1 items-center justify-between">
                  <span>Advanced Filters</span>
                  <Badge variant="outline">3 active</Badge>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Categories</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tech" defaultChecked />
                      <Label htmlFor="tech">Technology</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="business" defaultChecked />
                      <Label htmlFor="business">Business</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="design" />
                      <Label htmlFor="design">Design</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" defaultChecked />
                      <Label htmlFor="marketing">Marketing</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Price Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min price" type="number" />
                    <Input placeholder="Max price" type="number" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="active" defaultChecked />
                      <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pending" />
                      <Label htmlFor="pending">Pending</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="archived" />
                      <Label htmlFor="archived">Archived</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
            <Button className="flex-1">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const ProjectDetails: Story = {
  render: () => {
    const [sectionsOpen, setSectionsOpen] = useState({
      overview: true,
      team: false,
      tasks: false,
      files: false,
    });

    const toggleSection = (section: keyof typeof sectionsOpen) => {
      setSectionsOpen((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    return (
      <div className="w-full max-w-4xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Website Redesign Project</CardTitle>
            <CardDescription>Complete overhaul of company website and branding</CardDescription>
          </CardHeader>
        </Card>

        {/* Project Overview */}
        <Card>
          <Collapsible open={sectionsOpen.overview} onOpenChange={() => toggleSection("overview")}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <CardTitle>Project Overview</CardTitle>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      sectionsOpen.overview ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="mt-1">
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Priority</Label>
                    <div className="mt-1">
                      <Badge variant="red">High</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Start Date</Label>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">March 1, 2024</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">June 15, 2024</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    A comprehensive redesign of our corporate website including new branding,
                    improved user experience, and modern responsive design. The project includes
                    content strategy, visual design, development, and SEO optimization.
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Team Members */}
        <Card>
          <Collapsible open={sectionsOpen.team} onOpenChange={() => toggleSection("team")}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <CardTitle>Team Members</CardTitle>
                    <Badge variant="outline">5 members</Badge>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      sectionsOpen.team ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {[
                    "Alice Johnson - Project Manager",
                    "Bob Smith - Lead Developer",
                    "Carol Davis - UI Designer",
                    "David Wilson - Content Writer",
                    "Eve Brown - QA Tester",
                  ].map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                        <span className="text-sm font-medium">{member.charAt(0)}</span>
                      </div>
                      <span className="text-sm">{member}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Tasks */}
        <Card>
          <Collapsible open={sectionsOpen.tasks} onOpenChange={() => toggleSection("tasks")}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <CardTitle>Tasks</CardTitle>
                    <Badge variant="outline">12 of 20 completed</Badge>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      sectionsOpen.tasks ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {[
                    { name: "Create wireframes", completed: true },
                    { name: "Design homepage", completed: true },
                    { name: "Develop responsive layout", completed: false },
                    { name: "Content writing", completed: false },
                    { name: "SEO optimization", completed: false },
                  ].map((task, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2">
                      <Checkbox checked={task.completed} />
                      <span
                        className={`text-sm ${task.completed ? "text-gray-600 line-through dark:text-gray-300" : ""}`}
                      >
                        {task.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Files */}
        <Card>
          <Collapsible open={sectionsOpen.files} onOpenChange={() => toggleSection("files")}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <CardTitle>Project Files</CardTitle>
                    <Badge variant="outline">15 files</Badge>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      sectionsOpen.files ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {[
                    { name: "wireframes.sketch", type: "design", size: "2.4 MB" },
                    { name: "homepage-mockup.psd", type: "design", size: "15.7 MB" },
                    { name: "brand-guidelines.pdf", type: "document", size: "1.2 MB" },
                    { name: "content-strategy.docx", type: "document", size: "856 KB" },
                    { name: "responsive-layout.html", type: "code", size: "45 KB" },
                  ].map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <FileText className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{file.size}</p>
                      </div>
                      <Button variant="ghost" size="sm" icon={Download} iconClassName="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const NotificationCenter: Story = {
  render: () => {
    const [sectionsOpen, setSectionsOpen] = useState({
      today: true,
      yesterday: false,
      older: false,
    });

    const toggleSection = (section: keyof typeof sectionsOpen) => {
      setSectionsOpen((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    return (
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Stay updated with latest activity</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Today */}
          <div className="border-b">
            <Collapsible open={sectionsOpen.today} onOpenChange={() => toggleSection("today")}>
              <CollapsibleTrigger asChild>
                <div className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Today</span>
                    <Badge variant="red">3</Badge>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      sectionsOpen.today ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-1 pb-2">
                  {[
                    {
                      icon: <MessageSquare className="h-4 w-4" />,
                      text: "New comment on your post",
                      time: "2 min ago",
                      unread: true,
                    },
                    {
                      icon: <Heart className="h-4 w-4" />,
                      text: "Someone liked your photo",
                      time: "1 hour ago",
                      unread: true,
                    },
                    {
                      icon: <Star className="h-4 w-4" />,
                      text: "You received a 5-star rating",
                      time: "3 hours ago",
                      unread: true,
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className={`mx-2 flex items-start space-x-3 rounded-lg p-3 ${
                        notification.unread
                          ? "bg-blue-50"
                          : "hover:bg-gray-50 dark:hover:bg-gray-900/50"
                      }`}
                    >
                      <div className="mt-0.5 text-gray-600 dark:text-gray-300">
                        {notification.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Yesterday */}
          <div className="border-b">
            <Collapsible
              open={sectionsOpen.yesterday}
              onOpenChange={() => toggleSection("yesterday")}
            >
              <CollapsibleTrigger asChild>
                <div className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <span className="font-medium">Yesterday</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      sectionsOpen.yesterday ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-1 pb-2">
                  {[
                    {
                      icon: <Share className="h-4 w-4" />,
                      text: "Your post was shared 5 times",
                      time: "Yesterday",
                      unread: false,
                    },
                    {
                      icon: <User className="h-4 w-4" />,
                      text: "3 new followers",
                      time: "Yesterday",
                      unread: false,
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className="mx-2 flex items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <div className="mt-0.5 text-gray-600 dark:text-gray-300">
                        {notification.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Older */}
          <div>
            <Collapsible open={sectionsOpen.older} onOpenChange={() => toggleSection("older")}>
              <CollapsibleTrigger asChild>
                <div className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <span className="font-medium">Older</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      sectionsOpen.older ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-1 pb-2">
                  {[
                    {
                      icon: <CheckCircle className="h-4 w-4" />,
                      text: "Task completed successfully",
                      time: "2 days ago",
                      unread: false,
                    },
                    {
                      icon: <AlertCircle className="h-4 w-4" />,
                      text: "Security alert resolved",
                      time: "3 days ago",
                      unread: false,
                    },
                    {
                      icon: <Mail className="h-4 w-4" />,
                      text: "Weekly report is ready",
                      time: "1 week ago",
                      unread: false,
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className="mx-2 flex items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <div className="mt-0.5 text-gray-600 dark:text-gray-300">
                        {notification.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>
    );
  },
};
