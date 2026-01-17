import type { Meta, StoryObj } from "@storybook/react-vite";
import { useCallback, useState } from "react";

import { NotificationProvider, useNotifications } from "./index";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";

const meta: Meta = {
  title: "UI/Notifications",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <NotificationProvider>
        <Story />
      </NotificationProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllNotificationTypes: Story = {
  render: () => {
    const { success, error, warning, info, loading, custom, dismiss, dismissAll, update } =
      useNotifications();
    const [lastId, setLastId] = useState<string>("");

    const handleSuccess = useCallback(() => {
      const id = success("Your changes have been saved successfully!");
      setLastId(id);
    }, [success]);

    const handleError = useCallback(() => {
      const id = error({
        message: "Something went wrong",
        description: "Please try again later or contact support if the problem persists.",
      });
      setLastId(id);
    }, [error]);

    const handleWarning = useCallback(() => {
      const id = warning({
        message: "Storage space running low",
        description: "Consider clearing some files to free up space.",
        autoClose: 8000,
      });
      setLastId(id);
    }, [warning]);

    const handleInfo = useCallback(() => {
      const id = info({
        message: "New features available",
        description: "Check out the latest updates in your dashboard.",
      });
      setLastId(id);
    }, [info]);

    const handleLoading = useCallback(() => {
      const id = loading({
        message: "Processing your request...",
        description: "This may take a few moments.",
      });
      setLastId(id);

      // Auto-dismiss after 3 seconds for demo
      setTimeout(() => {
        dismiss(id);
        success("Request completed successfully!");
      }, 3000);
    }, [loading, dismiss, success]);

    const handleCustom = useCallback(() => {
      const timestamp = new Date().toLocaleTimeString();
      const id = custom({
        message: "Custom notification",
        description: `Created at ${timestamp}`,
        variant: "info",
        autoClose: false,
        className: "border-2 border-purple-500",
      });
      setLastId(id);
    }, [custom]);

    const handlePersistent = useCallback(() => {
      const id = error({
        message: "Persistent error notification",
        description: "This notification won't auto-close. Click the X to dismiss.",
        autoClose: false,
      });
      setLastId(id);
    }, [error]);

    const handleMultiple = useCallback(() => {
      success("First notification");
      setTimeout(() => info("Second notification"), 500);
      setTimeout(() => warning("Third notification"), 1000);
      setTimeout(() => error("Fourth notification"), 1500);
    }, [success, info, warning, error]);

    const handleUpdate = useCallback(() => {
      if (lastId) {
        update(lastId, {
          message: "Updated notification!",
          description: "This notification was updated in place.",
        });
      } else {
        info("No notification to update. Create one first!");
      }
    }, [update, lastId, info]);

    const handleDismissLast = useCallback(() => {
      if (lastId) {
        dismiss(lastId);
        setLastId("");
      } else {
        dismiss(); // Dismiss latest notification
      }
    }, [dismiss, lastId]);

    return (
      <div className="max-w-2xl space-y-6 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notification Types</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="solid" color="default" onClick={handleSuccess}>
              Success
            </Button>
            <Button variant="solid" color="danger" onClick={handleError}>
              Error
            </Button>
            <Button variant="solid" color="secondary" onClick={handleWarning}>
              Warning
            </Button>
            <Button variant="outline" onClick={handleInfo}>
              Info
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Special Types</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleLoading}>
              Loading
            </Button>
            <Button variant="solid" color="secondary" onClick={handleCustom}>
              Custom
            </Button>
            <Button variant="solid" color="danger" onClick={handlePersistent}>
              Persistent
            </Button>
            <Button variant="solid" color="default" onClick={handleMultiple}>
              Multiple
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Control Actions</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" onClick={handleUpdate}>
              Update Last
            </Button>
            <Button variant="solid" color="secondary" onClick={handleDismissLast}>
              Dismiss Last
            </Button>
            <Button variant="solid" color="danger" onClick={dismissAll}>
              Dismiss All
            </Button>
          </div>
        </div>

        {lastId && (
          <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
            <p className="text-sm font-medium">Last Notification ID:</p>
            <p className="font-mono text-sm">{lastId}</p>
          </div>
        )}
      </div>
    );
  },
};

export const Success: Story = {
  render: () => {
    const { success } = useNotifications();

    return (
      <Button
        onClick={() => {
          success("Operation completed successfully!");
        }}
      >
        Show Success
      </Button>
    );
  },
};

export const Error: Story = {
  render: () => {
    const { error } = useNotifications();

    return (
      <Button
        variant="solid"
        color="danger"
        onClick={() => {
          error({
            message: "Something went wrong",
            description: "An unexpected error occurred. Please try again later.",
          });
        }}
      >
        Show Error
      </Button>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const { warning } = useNotifications();

    return (
      <Button
        variant="solid"
        color="secondary"
        onClick={() => {
          warning({
            message: "Warning: Action cannot be undone",
            description: "Please review your changes before proceeding.",
            autoClose: 8000,
          });
        }}
      >
        Show Warning
      </Button>
    );
  },
};

export const Info: Story = {
  render: () => {
    const { info } = useNotifications();

    return (
      <Button
        variant="outline"
        onClick={() => {
          info({
            message: "Did you know?",
            description:
              "You can use keyboard shortcuts to navigate faster through the application.",
          });
        }}
      >
        Show Info
      </Button>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const { loading, success, dismiss } = useNotifications();
    const [isLoading, setIsLoading] = useState(false);

    const handleAsyncOperation = async () => {
      setIsLoading(true);
      const loadingId = loading({
        message: "Processing your request...",
        description: "Please wait while we handle your request.",
      });

      // Simulate async operation
      setTimeout(() => {
        dismiss(loadingId);
        success("Request completed successfully!");
        setIsLoading(false);
      }, 3000);
    };

    return (
      <Button onClick={handleAsyncOperation} disabled={isLoading}>
        {isLoading ? "Processing..." : "Start Loading"}
      </Button>
    );
  },
};

export const PersistentNotifications: Story = {
  render: () => {
    const { error, warning, info, dismiss } = useNotifications();
    const [persistentIds, setPersistentIds] = useState<string[]>([]);

    const addPersistentError = () => {
      const id = error({
        message: "Critical system error",
        description: "This error requires immediate attention and won't auto-dismiss.",
        autoClose: false,
      });
      setPersistentIds((prev) => [...prev, id]);
    };

    const addPersistentWarning = () => {
      const id = warning({
        message: "Important maintenance notice",
        description: "System maintenance scheduled for this weekend.",
        autoClose: false,
      });
      setPersistentIds((prev) => [...prev, id]);
    };

    const addPersistentInfo = () => {
      const id = info({
        message: "New feature announcement",
        description: "Check out our latest feature updates in the changelog.",
        autoClose: false,
      });
      setPersistentIds((prev) => [...prev, id]);
    };

    const dismissAllPersistent = () => {
      persistentIds.forEach((id) => dismiss(id));
      setPersistentIds([]);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="solid" color="danger" onClick={addPersistentError}>
            Critical Error
          </Button>
          <Button variant="solid" color="secondary" onClick={addPersistentWarning}>
            Maintenance
          </Button>
          <Button variant="outline" onClick={addPersistentInfo}>
            Feature News
          </Button>
        </div>
        {persistentIds.length > 0 && (
          <Button variant="outline" onClick={dismissAllPersistent}>
            {`Dismiss All (${persistentIds.length})`}
          </Button>
        )}
      </div>
    );
  },
};

export const PositionDemo: Story = {
  render: () => {
    const { success, error, warning, info } = useNotifications();

    const showPositionedNotifications = () => {
      success({
        message: "Top-right notification",
        position: "top-right",
      });

      setTimeout(() => {
        error({
          message: "Bottom-right notification",
          position: "bottom-right",
        });
      }, 500);

      setTimeout(() => {
        warning({
          message: "Top-left notification",
          position: "top-left",
        });
      }, 1000);

      setTimeout(() => {
        info({
          message: "Bottom-left notification",
          position: "bottom-left",
        });
      }, 1500);
    };

    return <Button onClick={showPositionedNotifications}>Show All Positions</Button>;
  },
};

export const NotificationSequence: Story = {
  render: () => {
    const { info, warning, success } = useNotifications();

    const showSequence = () => {
      info({
        message: "Step 1: Preparing...",
        description: "Initializing the process",
        autoClose: 2000,
      });

      setTimeout(() => {
        warning({
          message: "Step 2: In Progress...",
          description: "Processing your request",
          autoClose: 2000,
        });
      }, 2000);

      setTimeout(() => {
        success({
          message: "Step 3: Complete!",
          description: "Process finished successfully",
          autoClose: 3000,
        });
      }, 4000);
    };

    return <Button onClick={showSequence}>Start Process Sequence</Button>;
  },
};

export const DataCapture: Story = {
  render: () => {
    const { custom } = useNotifications();
    const [counter, setCounter] = useState(0);

    const showDataNotification = () => {
      const currentCounter = counter;
      const timestamp = new Date().toLocaleTimeString();
      const randomValue = Math.random().toFixed(4);

      custom({
        message: "Data Capture Test",
        description: (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Captured Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-xs">
                <strong>Counter:</strong> {currentCounter}
              </p>
              <p className="text-xs">
                <strong>Time:</strong> {timestamp}
              </p>
              <p className="text-xs">
                <strong>Random:</strong> {randomValue}
              </p>
            </CardContent>
          </Card>
        ),
        variant: "info",
        autoClose: 8000,
      });

      // Update counter after showing notification to test data capture
      setTimeout(() => setCounter((prev) => prev + 1), 100);
    };

    return (
      <div className="space-y-4">
        <div className="rounded border p-4">
          <p className="text-sm font-medium">Current Counter: {counter}</p>
        </div>
        <Button onClick={showDataNotification}>Capture Current Data</Button>
      </div>
    );
  },
};
