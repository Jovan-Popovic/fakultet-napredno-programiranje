import type { Meta, StoryObj } from "@storybook/react-vite";
import { Shield, Trash2, UserX } from "lucide-react";
import { useCallback, useState } from "react";

import { DialogProvider, useDialog } from "./index";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";

const meta: Meta = {
  title: "UI/Dialog/Hook",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <DialogProvider>
        <Story />
      </DialogProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllDialogTypes: Story = {
  render: () => {
    const { success, error, warning, info, confirm, setLoading, custom } = useDialog();
    const [result, setResult] = useState<string>("");

    const handleSuccess = useCallback(() => {
      success({
        title: "Success!",
        description: "Your action was completed successfully.",
        confirmText: "Great!",
        onConfirm: () => {
          setResult("Success dialog confirmed");
        },
      });
    }, [success]);

    const handleError = useCallback(() => {
      error({
        title: "Error occurred",
        description: "Something went wrong. Please try again.",
        confirmText: "Understood",
        onConfirm: () => {
          setResult("Error dialog confirmed");
        },
      });
    }, [error]);

    const handleWarning = useCallback(() => {
      warning({
        title: "Warning",
        description: "This action might have unintended consequences.",
        confirmText: "Proceed anyway",
        cancelText: "Cancel",
        showCancel: true,
        onConfirm: () => {
          setResult("Warning dialog confirmed");
        },
        onCancel: () => {
          setResult("Warning dialog cancelled");
        },
      });
    }, [warning]);

    const handleInfo = useCallback(() => {
      info({
        title: "Information",
        description: "Here's some important information you should know.",
        confirmText: "Got it",
        onConfirm: () => {
          setResult("Info dialog confirmed");
        },
      });
    }, [info]);

    const handleConfirm = useCallback(async () => {
      const confirmed = await confirm({
        title: "Confirm action",
        description: "Are you sure you want to proceed with this action?",
        confirmText: "Yes, proceed",
        cancelText: "Cancel",
      });

      setResult(confirmed ? "User confirmed" : "User cancelled");
    }, [confirm]);

    const handleAsyncConfirm = useCallback(async () => {
      const confirmed = await confirm({
        title: "Delete item",
        description: "This will permanently delete the item. This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Keep",
        destructive: true,
        onConfirm: async () => {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setLoading(false);
        },
      });

      setResult(confirmed ? "Item deleted" : "Deletion cancelled");
    }, [confirm, setLoading]);

    const handleCustom = useCallback(() => {
      custom({
        title: "Custom Dialog",
        content: (
          <div className="space-y-4">
            <p className="text-sm">This is a custom dialog with custom content.</p>
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
              <p className="text-xs">You can put any React content here!</p>
            </div>
            <ul className="space-y-1 text-sm">
              <li>• Custom components</li>
              <li>• Forms</li>
              <li>• Complex layouts</li>
            </ul>
          </div>
        ),
        confirmText: "Close",
        onConfirm: () => {
          setResult("Custom dialog closed");
        },
      });
    }, [custom]);

    const handleMultiple = useCallback(() => {
      info({
        title: "First Dialog",
        description: "This is the first dialog in a sequence.",
        confirmText: "Next",
        onConfirm: () => {
          warning({
            title: "Second Dialog",
            description: "This is the second ",
            confirmText: "Next",
            onConfirm: () => {
              success({
                title: "Final Dialog",
                description: "This is the last dialog in the sequence.",
                confirmText: "Done",
                onConfirm: () => {
                  setResult("Completed dialog sequence");
                },
              });
            },
          });
        },
      });
    }, [info, success, warning]);

    const handleDataRendering = useCallback(() => {
      const dynamicData = {
        user: "John Doe",
        timestamp: new Date().toLocaleString(),
        items: ["Item 1", "Item 2", "Item 3"],
      };

      custom({
        title: "Data Rendering Test",
        content: (
          <div className="space-y-3">
            <p className="text-sm">Testing dynamic data rendering in callbacks:</p>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">User Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs">
                  <strong>User:</strong> {dynamicData.user}
                </p>
                <p className="text-xs">
                  <strong>Time:</strong> {dynamicData.timestamp}
                </p>
                <p className="text-xs">
                  <strong>Items:</strong>
                </p>
                <ul className="pl-4 text-xs">
                  {dynamicData.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ),
        confirmText: "Verify Data",
        onConfirm: () => {
          setResult(`Data verified for ${dynamicData.user} at ${dynamicData.timestamp}`);
        },
      });
    }, [custom]);

    return (
      <div className="max-w-2xl space-y-6 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dialog Types</h3>
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
          <h3 className="text-lg font-semibold">Confirmation Dialogs</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleConfirm}>
              Simple Confirm
            </Button>
            <Button variant="solid" color="danger" onClick={handleAsyncConfirm}>
              Async Confirm
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Advanced Features</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="solid" color="secondary" onClick={handleCustom}>
              Custom Content
            </Button>
            <Button variant="outline" onClick={handleMultiple}>
              Multiple Dialogs
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Data Rendering Test</h3>
          <Button variant="solid" color="default" onClick={handleDataRendering}>
            Test Dynamic Data
          </Button>
        </div>

        {result && (
          <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
            <p className="text-sm font-medium">Last Result:</p>
            <p className="text-sm">{result}</p>
          </div>
        )}
      </div>
    );
  },
};

export const Success: Story = {
  render: () => {
    const { success } = useDialog();

    return (
      <Button
        onClick={() => {
          success({
            title: "Operation successful!",
            description: "Your changes have been saved successfully.",
            confirmText: "Continue",
          });
        }}
      >
        Show Success
      </Button>
    );
  },
};

export const Error: Story = {
  render: () => {
    const { error } = useDialog();

    return (
      <Button
        variant="solid"
        color="danger"
        onClick={() => {
          error({
            title: "Something went wrong",
            description: "An unexpected error occurred. Please try again later.",
            confirmText: "Retry",
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
    const { warning } = useDialog();

    return (
      <Button
        variant="solid"
        color="secondary"
        onClick={() => {
          warning({
            title: "Are you sure?",
            description: "This action will modify existing data and cannot be undone.",
            confirmText: "Continue",
            cancelText: "Cancel",
            showCancel: true,
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
    const { info } = useDialog();

    return (
      <Button
        variant="outline"
        onClick={() => {
          info({
            title: "Did you know?",
            description:
              "You can use keyboard shortcuts to navigate faster through the application.",
            confirmText: "Cool!",
          });
        }}
      >
        Show Info
      </Button>
    );
  },
};

export const Confirm: Story = {
  render: () => {
    const { confirm } = useDialog();
    const [result, setResult] = useState<string>("");

    const handleConfirm = async () => {
      const confirmed = await confirm({
        title: "Delete account",
        description: "This will permanently delete your account and all associated data.",
        confirmText: "Delete",
        cancelText: "Cancel",
        destructive: true,
      });

      setResult(confirmed ? "Account will be deleted" : "Action cancelled");
    };

    return (
      <div className="space-y-4">
        <Button variant="solid" color="danger" onClick={handleConfirm}>
          Delete Account
        </Button>
        {result && <p className="rounded bg-gray-50 p-2 text-sm dark:bg-gray-900">{result}</p>}
      </div>
    );
  },
};

export const RefinedConfirm: Story = {
  name: "Refined Confirm Dialogs",
  render: () => {
    const { confirm } = useDialog();
    const [result, setResult] = useState<string>("");

    const handleWorkspaceDeactivate = async () => {
      const confirmed = await confirm({
        title: (
          <>
            Are you sure you want to
            <br />
            deactivate{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400">My Workspace</span>?
          </>
        ),
        description:
          "This will remove all associated data from the platform. This cannot be undone.",
        confirmText: "Yes, Deactivate",
        cancelText: "Cancel",
        destructive: true,
      });

      setResult(confirmed ? "Workspace will be deactivated" : "Action cancelled");
    };

    const handleUserRemoval = async () => {
      const confirmed = await confirm({
        title: "Remove user from workspace?",
        description: "This user will lose access to all workspace resources and data.",
        confirmText: "Remove User",
        cancelText: "Keep User",
        destructive: true,
        icon: UserX,
      });

      setResult(confirmed ? "User will be removed" : "User kept in workspace");
    };

    const handleSecurityAction = async () => {
      const confirmed = await confirm({
        title: "Enable two-factor authentication",
        description: "This will require additional verification for sensitive actions.",
        confirmText: "Enable 2FA",
        cancelText: "Not now",
        icon: Shield,
      });

      setResult(confirmed ? "2FA will be enabled" : "2FA setup cancelled");
    };

    const handleCustomIcon = async () => {
      const confirmed = await confirm({
        title: "Delete all selected items?",
        description: "This action will permanently delete 5 selected items and cannot be undone.",
        confirmText: "Delete Items",
        cancelText: "Cancel",
        destructive: true,
        icon: Trash2,
        iconClassName: "h-12 w-12",
      });

      setResult(confirmed ? "Items will be deleted" : "Deletion cancelled");
    };

    return (
      <div className="max-w-2xl space-y-6 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Refined Confirm Dialog Examples</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            These dialogs use the refined UI with centered content, icons, and modern styling.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="solid" color="danger" onClick={handleWorkspaceDeactivate}>
            Deactivate Workspace
          </Button>

          <Button
            variant="outline"
            onClick={handleUserRemoval}
            className="border-red-200 text-red-600 hover:border-red-300 hover:text-red-700"
          >
            Remove User
          </Button>

          <Button variant="solid" color="secondary" onClick={handleSecurityAction}>
            Enable Security
          </Button>
          <Button variant="solid" color="danger" onClick={handleCustomIcon}>
            Delete Items
          </Button>
        </div>

        {result && (
          <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
            <p className="text-sm font-medium">Last Result:</p>
            <p className="text-sm">{result}</p>
          </div>
        )}
      </div>
    );
  },
};

export const AsyncConfirm: Story = {
  render: () => {
    const { confirm } = useDialog();
    const [result, setResult] = useState<string>("");

    const handleAsyncAction = async () => {
      const confirmed = await confirm({
        title: "Process large file",
        description: "This will take some time to complete. Do you want to continue?",
        confirmText: "Start processing",
        cancelText: "Cancel",
        onConfirm: async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        },
      });

      setResult(confirmed ? "File processing completed" : "Processing cancelled");
    };

    return (
      <div className="space-y-4">
        <Button onClick={handleAsyncAction}>Process File</Button>
        {result && <p className="rounded bg-gray-50 p-2 text-sm dark:bg-gray-900">{result}</p>}
      </div>
    );
  },
};

export const CustomContent: Story = {
  render: () => {
    const { custom } = useDialog();

    const showCustomDialog = () => {
      const currentDate = new Date().toLocaleDateString();

      custom({
        title: "System Status",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Server Status</h4>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Last Updated</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{currentDate}</p>
              </div>
            </div>
            <div className="rounded bg-gray-50 p-3 dark:bg-gray-900">
              <p className="text-xs">All systems are operating normally.</p>
            </div>
          </div>
        ),
        confirmText: "Close",
      });
    };

    return (
      <Button variant="outline" onClick={showCustomDialog}>
        Show System Status
      </Button>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const { info, warning, success } = useDialog();

    const showDialogSequence = () => {
      info({
        title: "Welcome!",
        description: "Let's walk through a quick setup process.",
        confirmText: "Start",
        onConfirm: () => {
          warning({
            title: "Important",
            description: "Please review these settings carefully.",
            confirmText: "Review",
            onConfirm: () => {
              success({
                title: "Setup Complete",
                description: "Your account has been configured successfully!",
                confirmText: "Get Started",
              });
            },
          });
        },
      });
    };

    return <Button onClick={showDialogSequence}>Start Setup Wizard</Button>;
  },
};

export const DataRendering: Story = {
  render: () => {
    const { custom } = useDialog();
    const [counter, setCounter] = useState(0);

    const showDataDialog = () => {
      const currentCounter = counter;
      const timestamp = new Date().toLocaleTimeString();

      custom({
        title: "Dynamic Data Test",
        content: (
          <div className="space-y-3">
            <p className="text-sm">Testing that data renders correctly in callbacks:</p>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs">
                  <strong>Counter:</strong> {currentCounter}
                </p>
                <p className="text-xs">
                  <strong>Timestamp:</strong> {timestamp}
                </p>
                <p className="text-xs">
                  <strong>Random:</strong> {Math.random().toFixed(4)}
                </p>
              </CardContent>
            </Card>
          </div>
        ),
        confirmText: "Increment & Close",
        onConfirm: () => {
          setCounter(currentCounter + 1);
        },
      });
    };

    return (
      <div className="space-y-4">
        <div className="rounded border p-4">
          <p className="text-sm font-medium">Counter: {counter}</p>
        </div>
        <Button onClick={showDataDialog}>Test Data Rendering</Button>
      </div>
    );
  },
};

export const DataRenderingTests: Story = {
  name: "Data Rendering Tests (Comprehensive)",
  render: () => {
    const { success, info, warning, custom, confirm } = useDialog();
    const [testData, setTestData] = useState({
      counter: 0,
      items: [] as string[],
      user: { name: "Test User", id: 1 },
    });

    const testStateClosure = useCallback(() => {
      const currentData = testData;
      const timestamp = Date.now();

      confirm({
        title: "State Closure Test",
        description: `Counter: ${currentData.counter}, Items: ${currentData.items.length}, Time: ${new Date(timestamp).toLocaleTimeString()}`,
        confirmText: "Update",
        onConfirm: () => {
          setTestData((prev) => ({
            ...prev,
            counter: currentData.counter + 1,
            items: [...prev.items, `Item ${timestamp}`],
          }));
        },
      });
    }, [confirm, testData]);

    const testAsyncDataHandling = useCallback(() => {
      const asyncData = {
        ...testData,
        timestamp: Date.now(),
      };

      confirm({
        title: "Async Data Test",
        description: "This tests async operations with captured data",
        confirmText: "Process",
        onConfirm: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          setTestData((prev) => ({
            ...prev,
            counter: asyncData.counter + 10,
            items: [...prev.items, `Async-${asyncData.timestamp}`],
          }));

          success({
            title: "Async Complete",
            description: `Processed data for timestamp: ${asyncData.timestamp}`,
          });
        },
      });
    }, [confirm, success, testData]);

    const testNestedCallbacks = useCallback(() => {
      const outerData = { ...testData, level: 1 };

      info({
        title: "Level 1",
        description: `Starting nested test with counter: ${outerData.counter}`,
        confirmText: "Next",
        onConfirm: () => {
          const innerData = { ...outerData, level: 2, counter: outerData.counter + 1 };

          warning({
            title: "Level 2",
            description: `Nested level with counter: ${innerData.counter}`,
            confirmText: "Finish",
            onConfirm: () => {
              setTestData((prev) => ({
                ...prev,
                counter: innerData.counter + 1,
                items: [...prev.items, `Nested-L${innerData.level}`],
              }));
            },
          });
        },
      });
    }, [info, testData, warning]);

    const testDynamicContent = useCallback(() => {
      const dynamicValues = {
        random: Math.random(),
        date: new Date().toISOString(),
        counter: testData.counter,
      };

      custom({
        title: "Dynamic Content Test",
        content: (
          <div className="space-y-2">
            <p className="text-sm">Values captured at dialog creation:</p>
            <ul className="space-y-1 rounded bg-gray-50 p-2 text-xs dark:bg-gray-900">
              <li>Random: {dynamicValues.random.toFixed(6)}</li>
              <li>Date: {dynamicValues.date}</li>
              <li>Counter: {dynamicValues.counter}</li>
            </ul>
          </div>
        ),
        confirmText: "Save Values",
        onConfirm: () => {
          setTestData((prev) => ({
            ...prev,
            items: [...prev.items, `Dynamic-${dynamicValues.random.toFixed(3)}`],
          }));
        },
      });
    }, [custom, testData]);

    const clearData = useCallback(() => {
      setTestData({
        counter: 0,
        items: [],
        user: { name: "Test User", id: 1 },
      });
    }, []);

    return (
      <div className="max-w-lg space-y-6 p-6">
        <div className="rounded border bg-gray-50 p-4 dark:bg-gray-900/50">
          <h3 className="mb-2 font-medium">Current State</h3>
          <p className="text-sm">Counter: {testData.counter}</p>
          <p className="text-sm">Items: {testData.items.length}</p>
          {testData.items.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium">Recent items:</p>
              <ul className="space-y-1 text-xs">
                {testData.items.slice(-3).map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Data Rendering Tests</h3>
          <div className="grid gap-2">
            <Button variant="outline" onClick={testStateClosure}>
              Test State Closure
            </Button>
            <Button variant="solid" color="secondary" onClick={testAsyncDataHandling}>
              Test Async Data
            </Button>
            <Button variant="solid" color="default" onClick={testNestedCallbacks}>
              Test Nested Callbacks
            </Button>
            <Button variant="outline" onClick={testDynamicContent}>
              Test Dynamic Content
            </Button>
          </div>
        </div>

        <Button variant="solid" color="danger" onClick={clearData}>
          Clear Data
        </Button>
      </div>
    );
  },
};
