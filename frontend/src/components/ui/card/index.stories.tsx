import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Activity,
  Battery,
  BookOpen,
  Calendar,
  CheckCircle,
  Edit,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Package,
  Phone,
  Play,
  Settings,
  Share,
  ShoppingCart,
  Signal,
  Star,
  TrendingUp,
  Truck,
  Users,
  Volume2,
  Wifi,
} from "lucide-react";

import { CardAction } from "./action";
import { CardContent } from "./content";
import { CardDescription } from "./description";
import { CardFooter } from "./footer";
import { CardHeader } from "./header";
import { CardTitle } from "./title";

import { Card } from "./index";

import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar/fallback";
import { AvatarImage } from "@/components/ui/avatar/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible card component for displaying content with header, body, and footer sections.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the card",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can put any content here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button in the header</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" icon={MoreHorizontal} iconClassName="h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Content with action button in header.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card includes a footer section</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const FullCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardDescription>This card uses all available components</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" icon={Settings} iconClassName="h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates all the card components working together.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Secondary</Button>
        <Button>Primary</Button>
      </CardFooter>
    </Card>
  ),
};

// Real-world examples
export const UserProfile: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account information</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" icon={Edit} iconClassName="h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">john.doe@example.com</p>
            <Badge variant="outline">Premium Member</Badge>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
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
        </div>
      </CardContent>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription>Wireless noise-cancelling headphones</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" icon={Heart} iconClassName="h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900">
          <Package className="h-12 w-12 text-gray-600 dark:text-gray-300" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">(128 reviews)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">$299</span>
            <Badge variant="outline">Free Shipping</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" icon={ShoppingCart} iconClassName="h-4 w-4 mr-2">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Total revenue for this month</CardDescription>
        <CardAction>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">$12,345</div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600">
              +12.5%
            </Badge>
            <span className="text-sm text-gray-600 dark:text-gray-300">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ProjectCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Website Redesign</CardTitle>
        <CardDescription>Complete overhaul of company website</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" icon={MoreHorizontal} iconClassName="h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>68%</span>
          </div>
          <Progress value={68} className="h-2" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <span className="text-sm">Due: Mar 15</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <span className="text-sm">5 members</span>
          </div>
        </div>
        <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <Avatar key={i} className="border-background h-8 w-8 border-2">
              <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View Details</Button>
        <Button>Update Status</Button>
      </CardFooter>
    </Card>
  ),
};

export const ArticleCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Building Better UIs</CardTitle>
        <CardDescription>A comprehensive guide to modern UI design</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" icon={BookOpen} iconClassName="h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900">
          <BookOpen className="h-12 w-12 text-gray-600 dark:text-gray-300" />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Learn the fundamentals of creating user interfaces that are both beautiful and
            functional...
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm">John Doe</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">5 min read</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" icon={Heart} iconClassName="h-4 w-4" />
          <Button variant="ghost" size="sm" icon={MessageSquare} iconClassName="h-4 w-4" />
          <Button variant="ghost" size="sm" icon={Share} iconClassName="h-4 w-4" />
        </div>
        <Button variant="outline" className="ml-auto">
          Read More
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const SettingsCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" icon={Settings} iconClassName="h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">Receive email updates</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Extra security for your account
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">Product updates and offers</p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Reset</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  ),
};

export const OrderCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Order #12345</CardTitle>
        <CardDescription>Placed on March 15, 2024</CardDescription>
        <CardAction>
          <Badge variant="outline">
            <Truck className="mr-1 h-3 w-3" />
            Shipped
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900">
                <Package className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium">Premium Headphones</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: 1</p>
              </div>
            </div>
            <span className="font-medium">$299</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900">
                <Package className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <p className="font-medium">USB Cable</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: 2</p>
              </div>
            </div>
            <span className="font-medium">$25</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$324</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>$324</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Track Order</Button>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  ),
};

export const MusicPlayer: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Now Playing</CardTitle>
        <CardDescription>Your music, your way</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" icon={MoreHorizontal} iconClassName="h-4 w-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900">
          <Play className="h-16 w-16 text-gray-600 dark:text-gray-300" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="font-semibold">Bohemian Rhapsody</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Queen</p>
        </div>
        <div className="space-y-2">
          <Progress value={45} className="h-2" />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>2:30</span>
            <span>5:55</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-center space-x-4">
          <Button variant="ghost" size="sm" icon={Heart} iconClassName="h-4 w-4" />
          <Button variant="ghost" size="sm" icon={Play} iconClassName="h-4 w-6" />
          <Button variant="ghost" size="sm" icon={Volume2} iconClassName="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  ),
};

export const SystemStatus: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current system performance</CardDescription>
        <CardAction>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-sm">Network</span>
            </div>
            <Badge variant="outline" className="text-green-600">
              Online
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">CPU Usage</span>
            </div>
            <span className="text-sm">45%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Battery className="h-4 w-4 text-green-500" />
              <span className="text-sm">Memory</span>
            </div>
            <span className="text-sm">2.1GB / 8GB</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Signal className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Uptime</span>
            </div>
            <span className="text-sm">7d 12h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const FormCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
        <CardDescription>Get in touch with our team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Input id="message" placeholder="How can we help you?" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Send Message</Button>
      </CardFooter>
    </Card>
  ),
};

// Layout examples
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Monthly overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231</div>
          <p className="text-sm text-gray-600 dark:text-gray-300">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New Customers</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2,350</div>
          <p className="text-sm text-gray-600 dark:text-gray-300">+180.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>Currently online</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,234</div>
          <p className="text-sm text-gray-600 dark:text-gray-300">+19% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const CardSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Small Card</CardTitle>
            <CardDescription>Compact layout</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is a smaller card for compact displays.</p>
          </CardContent>
        </Card>

        <Card className="w-96">
          <CardHeader>
            <CardTitle>Medium Card</CardTitle>
            <CardDescription>Standard layout</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is a medium-sized card for standard content.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>Full-width layout</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            This is a large card that spans the full width of its container.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
