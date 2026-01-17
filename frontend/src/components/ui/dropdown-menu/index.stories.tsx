import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertCircle,
  Archive,
  Bell,
  Briefcase,
  Camera,
  CheckCircle,
  Cloud,
  Code,
  Copy,
  CreditCard,
  Database,
  Download,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  HelpCircle,
  Home,
  Image,
  Info,
  Laptop,
  LogOut,
  Mail,
  MessageSquare,
  Minus,
  MoreHorizontal,
  Music,
  Package,
  Palette,
  RefreshCw,
  Settings,
  Share,
  Smartphone,
  Star,
  Tag,
  Trash2,
  Upload,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";

import { DropdownMenuCheckboxItem } from "./checkbox-item";
import { DropdownMenuContent } from "./content";
import { DropdownMenuGroup } from "./group";
import { DropdownMenuItem } from "./item";
import { DropdownMenuLabel } from "./label";
import { DropdownMenuRadioGroup } from "./radio-group";
import { DropdownMenuRadioItem } from "./radio-item";
import { DropdownMenuSeparator } from "./separator";
import { DropdownMenuShortcut } from "./shortcut";
import { DropdownMenuSub } from "./sub";
import { DropdownMenuSubContent } from "./sub/content";
import { DropdownMenuSubTrigger } from "./sub/trigger";
import { DropdownMenuTrigger } from "./trigger";

import { DropdownMenu } from ".";

import { AvatarFallback } from "@/components/ui/avatar/fallback";
import { AvatarImage } from "@/components/ui/avatar/image";
import { Avatar } from "@/components/ui/avatar/index";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A dropdown menu component built on Radix UI with customizable items, separators, and submenus.",
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">File Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <FileText className="mr-2 h-4 w-4" />
          New File
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Save as...
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [checked, setChecked] = useState({
      notifications: true,
      marketing: false,
      updates: true,
    });

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" icon={Settings} iconClassName="mr-2 h-4 w-4">
            Preferences
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={checked.notifications}
            onCheckedChange={(value) => setChecked((prev) => ({ ...prev, notifications: value }))}
          >
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked.marketing}
            onCheckedChange={(value) => setChecked((prev) => ({ ...prev, marketing: value }))}
          >
            Marketing emails
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked.updates}
            onCheckedChange={(value) => setChecked((prev) => ({ ...prev, updates: value }))}
          >
            Product updates
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [theme, setTheme] = useState("light");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" icon={Palette} iconClassName="mr-2 h-4 w-4">
            Theme
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithSubmenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">More Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ExternalLink className="mr-2 h-4 w-4" />
              Social media
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Download className="mr-2 h-4 w-4" />
            Export
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF</DropdownMenuItem>
            <DropdownMenuItem>CSV</DropdownMenuItem>
            <DropdownMenuItem>Excel</DropdownMenuItem>
            <DropdownMenuItem>JSON</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// Real-world examples
export const UserProfileMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">John Doe</p>
            <p className="text-xs leading-none text-gray-600 dark:text-gray-300">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          Support
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          API
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const TableRowActions: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">john.doe@example.com</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            icon={MoreHorizontal}
            iconClassName="h-4 w-4"
          >
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText("john.doe@example.com")}>
            <Copy className="mr-2 h-4 w-4" />
            Copy email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit user
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            Send message
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const FileContextMenu: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Document.pdf", type: "PDF", size: "2.4 MB", icon: FileText },
          { name: "Image.jpg", type: "Image", size: "1.8 MB", icon: Image },
          { name: "Video.mp4", type: "Video", size: "45.2 MB", icon: Video },
          { name: "Music.mp3", type: "Audio", size: "3.7 MB", icon: Music },
        ].map((file) => (
          <div key={file.name} className="flex items-center space-x-3 rounded-lg border p-3">
            <file.icon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {file.type} • {file.size}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  icon={MoreHorizontal}
                  iconClassName="h-4 w-4"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const NavigationMenu: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" icon={Home} iconClassName="mr-2 h-4 w-4">
            Products
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Laptop className="mr-2 h-4 w-4" />
            Computers
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Smartphone className="mr-2 h-4 w-4" />
            Mobile Devices
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Camera className="mr-2 h-4 w-4" />
            Photography
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Package className="mr-2 h-4 w-4" />
              Accessories
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Cases & Covers</DropdownMenuItem>
              <DropdownMenuItem>Chargers</DropdownMenuItem>
              <DropdownMenuItem>Cables</DropdownMenuItem>
              <DropdownMenuItem>Screen Protectors</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Star className="mr-2 h-4 w-4" />
            Featured
            <Badge variant="outline" className="ml-auto">
              New
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" icon={Briefcase} iconClassName="mr-2 h-4 w-4">
            Company
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <Info className="mr-2 h-4 w-4" />
            About Us
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Team
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Briefcase className="mr-2 h-4 w-4" />
            Careers
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            Press
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const StatusSelector: Story = {
  render: () => {
    const [status, setStatus] = useState("active");

    const statusConfig = {
      active: { label: "Active", color: "bg-green-500", icon: CheckCircle },
      pending: { label: "Pending", color: "bg-yellow-500", icon: AlertCircle },
      inactive: { label: "Inactive", color: "bg-gray-500", icon: Minus },
      error: { label: "Error", color: "bg-red-500", icon: AlertCircle },
    };

    const currentStatus = statusConfig[status as keyof typeof statusConfig];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-32">
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${currentStatus.color}`} />
              <span>{currentStatus.label}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Set Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
            {Object.entries(statusConfig).map(([key, config]) => (
              <DropdownMenuRadioItem key={key} value={key}>
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${config.color}`} />
                  <span>{config.label}</span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const BulkActions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">3 items selected</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Bulk Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy all
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Export selected
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive selected
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Tag className="mr-2 h-4 w-4" />
                Add tags
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Important</DropdownMenuItem>
                <DropdownMenuItem>Urgent</DropdownMenuItem>
                <DropdownMenuItem>Review</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <User className="mr-2 h-4 w-4" />
                Assign to
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>John Doe</DropdownMenuItem>
                <DropdownMenuItem>Jane Smith</DropdownMenuItem>
                <DropdownMenuItem>Bob Johnson</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Unassign</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete selected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
};

export const ComplexMenu: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      notifications: true,
      autoSave: false,
      darkMode: true,
    });

    const [language, setLanguage] = useState("en");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button icon={Settings} variant="outline" iconClassName="mr-2 h-4 w-4">
            Advanced Settings
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuLabel>Application Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Preferences Section */}
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Preferences</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={preferences.notifications}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, notifications: checked }))
              }
            >
              <Bell className="mr-2 h-4 w-4" />
              Enable notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={preferences.autoSave}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, autoSave: checked }))
              }
            >
              <Download className="mr-2 h-4 w-4" />
              Auto-save documents
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={preferences.darkMode}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, darkMode: checked }))
              }
            >
              <Palette className="mr-2 h-4 w-4" />
              Dark mode
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Language Section */}
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Language</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
              <DropdownMenuRadioItem value="en">
                <Globe className="mr-2 h-4 w-4" />
                English
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="es">
                <Globe className="mr-2 h-4 w-4" />
                Español
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="fr">
                <Globe className="mr-2 h-4 w-4" />
                Français
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Tools Section */}
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Tools</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Database className="mr-2 h-4 w-4" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Code className="mr-2 h-4 w-4" />
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Import from CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Code className="mr-2 h-4 w-4" />
                  Import from JSON
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Cloud className="mr-2 h-4 w-4" />
                  Import from cloud
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Account Section */}
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
            <DropdownMenuShortcut>⌘?</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to defaults
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
