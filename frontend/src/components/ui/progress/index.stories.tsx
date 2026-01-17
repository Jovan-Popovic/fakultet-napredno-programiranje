import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, Clock, Download, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Progress } from ".";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card/content";
import { CardDescription } from "@/components/ui/card/description";
import { CardHeader } from "@/components/ui/card/header";
import { Card } from "@/components/ui/card/index";
import { CardTitle } from "@/components/ui/card/title";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A progress component for showing completion progress of a task or process.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value from 0 to 100",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ProgressDefault: Story = {
  args: {
    value: 33,
  },
};

export const ProgressVariants: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <Label>Default Progress</Label>
        <Progress value={33} />
      </div>

      <div className="space-y-2">
        <Label>Medium Progress</Label>
        <Progress value={66} className="h-3" />
      </div>

      <div className="space-y-2">
        <Label>Large Progress</Label>
        <Progress value={80} className="h-4" />
      </div>

      <div className="space-y-2">
        <Label>Custom Color</Label>
        <Progress value={45} className="h-2 bg-red-100 [&>*]:bg-red-500" />
      </div>
    </div>
  ),
};

export const ProgressWithLabels: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Loading...</span>
          <span>33%</span>
        </div>
        <Progress value={33} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Upload Progress</span>
          <span>7 of 10 files</span>
        </div>
        <Progress value={70} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Installation</span>
          <span>Complete</span>
        </div>
        <Progress value={100} className="[&>*]:bg-green-500" />
      </div>
    </div>
  ),
};

export const ProgressInteractive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setProgress(0)}>
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProgress(Math.min(100, progress + 10))}
          >
            +10
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProgress(Math.max(0, progress - 10))}
          >
            -10
          </Button>
        </div>
      </div>
    );
  },
};

export const ProgressRealWorld: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>File Download</span>
          </CardTitle>
          <CardDescription>document.pdf (2.4 MB)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Downloading...</span>
              <span>1.8 MB / 2.4 MB</span>
            </div>
            <Progress value={75} />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4" />
            <span>30 seconds remaining</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Goal Progress</span>
          </CardTitle>
          <CardDescription>Monthly sales target</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">$8,500 / $10,000</span>
              <Badge variant="outline">85%</Badge>
            </div>
            <Progress value={85} className="h-3 [&>*]:bg-green-500" />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <TrendingUp className="h-4 w-4" />
            <span>On track to meet goal</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Health</span>
          </CardTitle>
          <CardDescription>Server performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2 [&>*]:bg-blue-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memory</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2 [&>*]:bg-yellow-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2 [&>*]:bg-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
