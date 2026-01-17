import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import type { DropzoneFile } from "./thumbnails";

import type { Props as FileInputProps } from ".";
import { FileInput } from ".";

import { NotificationProvider } from "@/components/ui/notifications/context";

const meta: Meta<typeof FileInput> = {
  title: "UI/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NotificationProvider>
        <Story />
      </NotificationProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FileInput>;

const mockOptions = {
  accept: {
    "image/*": [".png", ".jpeg", ".jpg"],
  },
  maxFiles: 5,
};

export const Uncontrolled: Story = {
  args: {
    options: mockOptions,
    textPlaceholder: "Drag and drop files here",
    multiple: true,
  },
};

export const Controlled: Story = {
  render: (args: FileInputProps) => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    return (
      <div className="mx-auto max-w-md">
        <FileInput
          {...args}
          value={files}
          onChange={setFiles}
          renderFile={({ file }) => {
            const isImage = file.type.startsWith("image/");
            return (
              <div className="flex w-full items-center gap-2 rounded border p-2">
                {isImage ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="h-12 w-12 flex-shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-300">
                    <span className="truncate text-xs text-gray-600">No preview</span>
                  </div>
                )}
                <span className="flex-1 truncate">{file.name}</span>
              </div>
            );
          }}
        />
      </div>
    );
  },
  args: {
    options: mockOptions,
    multiple: true,
    textPlaceholder: "Controlled input with preview",
  },
};

export const SingleFile: Story = {
  render: (args: FileInputProps) => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    return (
      <FileInput
        {...args}
        value={files}
        onChange={setFiles}
        multiple={false}
        renderFile={({ file }) => {
          const isImage = file.type.startsWith("image/");
          return (
            <div className="flex w-full items-center gap-2 rounded border p-2">
              {isImage ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-16 w-16 flex-shrink-0 rounded object-cover"
                  onLoad={() => URL.revokeObjectURL(file.preview)}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-300">
                  <span className="truncate text-xs text-gray-600">No preview</span>
                </div>
              )}
              <span className="flex-1 truncate">{file.name}</span>
            </div>
          );
        }}
      />
    );
  },
  args: {
    options: { ...mockOptions, maxFiles: 1 },
    multiple: false,
    textPlaceholder: "Upload a single file",
  },
};

export const LoadingState: Story = {
  args: {
    options: mockOptions,
    loading: true,
    textPlaceholder: "Uploading...",
    multiple: true,
  },
};

export const Disabled: Story = {
  args: {
    options: { ...mockOptions, disabled: true },
    textPlaceholder: "This input is disabled",
    multiple: true,
  },
};

export const WithCustomPreview: Story = {
  render: (args: FileInputProps) => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    return (
      <div className="mx-auto max-w-xl">
        <FileInput
          {...args}
          value={files}
          onChange={setFiles}
          renderFile={({ file }) => {
            return (
              <img
                src={file.preview}
                alt={file.name}
                className="h-32 w-32 flex-shrink-0 rounded object-cover"
                onLoad={() => URL.revokeObjectURL(file.preview)}
              />
            );
          }}
        />
      </div>
    );
  },
  args: {
    options: mockOptions,
    multiple: true,
    textPlaceholder: "Custom preview layout (large image)",
  },
};
