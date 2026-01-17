import type { Meta, StoryObj } from "@storybook/react-vite";
import { type FC } from "react";
import { useForm, type Control, type FieldValues } from "react-hook-form";

import { FileInputFormField } from ".";

import { Button } from "@/components/ui/button";
import type { RenderFileProps } from "@/components/ui/file-input/thumbnails";
import { NotificationProvider } from "@/components/ui/notifications/context";

/* ------------------------------------------------------------------ */
/* Storybook metadata                                                 */
/* ------------------------------------------------------------------ */

type FormValues = {
  imageFiles?: File[];
  videoFiles?: File[];
  pdfFiles?: File[];
  documentFiles?: File[];
  singleFile: File[];
  multipleFiles: File[];
  requiredFile: File[];
  minTwoFiles: File[];
  maxTwoFiles: File[];
  disabledFiles?: File[];
  loadingFiles?: File[];
  controlledFiles?: File[];
  customPreviewFiles?: File[];
  customClassFiles?: File[];
  customPlaceholderFiles?: File[];
  tooltipFiles?: File[];
  idPropFiles?: File[];
};

const meta: Meta<typeof FileInputFormField> = {
  title: "Form/FileInput",
  component: FileInputFormField,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <NotificationProvider>
        <Story />
      </NotificationProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FileInputFormField>;

const mockOptions = {
  accept: {
    "image/*": [".png", ".jpeg", ".jpg", ".gif"],
    "application/pdf": [".pdf"],
    "video/*": [".mp4", ".mov", ".webm"],
    "text/plain": [".txt"],
    "application/msword": [".doc", ".docx"],
  },
  maxFiles: 5,
};

const FormWrapper = (
  StoryComponent: FC<{ control: Control<FormValues> }>,
  defaultValues?: FormValues
) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    // Removed resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      imageFiles: [],
      videoFiles: [],
      pdfFiles: [],
      documentFiles: [],
      singleFile: [],
      multipleFiles: [],
      requiredFile: [],
      minTwoFiles: [],
      maxTwoFiles: [],
      disabledFiles: [],
      loadingFiles: [],
      controlledFiles: [],
      customPreviewFiles: [],
      customClassFiles: [],
      customPlaceholderFiles: [],
      tooltipFiles: [],
      idPropFiles: [],
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    alert("Form submitted! Check console for data." + JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg space-y-6 rounded-lg border bg-white p-4 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
    >
      <StoryComponent control={control} />
      <Button type="submit">Submit Form</Button>
      <div className="mt-4 rounded bg-gray-100 p-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
        <h3 className="text-lg font-semibold">Current Form State:</h3>
        <pre className="max-h-40 overflow-auto rounded bg-gray-50 p-2 text-sm dark:bg-gray-900">
          {JSON.stringify(watch(), null, 2)}
        </pre>
        {Object.keys(errors).length > 0 && (
          <div className="mt-2 text-red-600 dark:text-red-400">
            <h4 className="text-lg font-semibold">Validation Errors:</h4>
            <pre className="max-h-40 overflow-auto rounded border border-red-300 bg-red-50 p-2 text-sm dark:bg-red-900">
              {JSON.stringify(errors, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </form>
  );
};

/* ------------------------------------------------------------------ */
/* Helper Functions                                                   */
/* ------------------------------------------------------------------ */

const defaultRenderFile = ({ file, onRemove }: RenderFileProps) => (
  <div className="flex items-center gap-2 rounded border p-2">
    {file.type.startsWith("image/") ? (
      <img src={file.preview} alt={file.name} className="h-16 w-16 rounded border object-cover" />
    ) : file.type.startsWith("video/") ? (
      <video src={file.preview} controls className="h-16 w-16 rounded border object-cover" />
    ) : file.type.startsWith("application/pdf") ? (
      <span className="text-3xl text-red-600 dark:text-red-300">📄</span>
    ) : (
      <span className="text-3xl text-gray-600 dark:text-gray-300">📝</span>
    )}
    <span className="flex-1 truncate text-sm">{file.name}</span>
    <Button type="button" variant="outline" size="sm" onClick={onRemove}>
      Remove
    </Button>
  </div>
);

/* ------------------------------------------------------------------ */
/* Individual Stories                                                 */
/* ------------------------------------------------------------------ */

// --- Stories for Specific File Types ---

export const ImagesOnly: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="imageFiles"
        label="Upload Images Only"
        textPlaceholder="Drag & drop or click to upload images"
        options={{ accept: { "image/*": [".png", ".jpeg", ".jpg", ".gif"] }, maxFiles: 5 }}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={({ file, onRemove }) => (
          <div className="relative">
            <img src={file.preview} alt={file.name} className="h-24 w-24 rounded object-cover" />
            <div className="mt-2 flex gap-2">
              <Button
                type="button"
                className="text-xs text-gray-500 dark:text-gray-400"
                onClick={() => window.open(file.preview, "_blank")}
              >
                View Full Image
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={onRemove}>
                Remove
              </Button>
            </div>
          </div>
        )}
      />
    )),
  args: {},
};

export const VideosOnly: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="videoFiles"
        label="Upload Videos Only"
        textPlaceholder="Drag & drop or click to upload video files (.mp4, .mov, .webm)"
        options={{ accept: { "video/*": [".mp4", ".mov", ".webm"] }, maxFiles: 3 }}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={({ file, onRemove }) => (
          <div className="relative">
            <video
              src={file.preview}
              controls
              className="h-auto max-h-32 w-full rounded border-2 border-blue-400 object-cover"
            >
              Your browser does not support the video tag.
            </video>
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={onRemove}>
              Remove
            </Button>
          </div>
        )}
      />
    )),
  args: {},
};

export const PdfOnly: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="pdfFiles"
        label="Upload PDF Files Only"
        textPlaceholder="Drag & drop or click to upload PDF documents"
        options={{ accept: { "application/pdf": [".pdf"] }, maxFiles: 2 }}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={({ file, onRemove }) => (
          <div className="text-center">
            <div className="text-5xl text-red-600 dark:text-red-300">📄</div>
            <div className="text-sm">{file.name}</div>
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={onRemove}>
              Remove
            </Button>
          </div>
        )}
      />
    )),
  args: {},
};

export const DocumentsOnly: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="documentFiles"
        label="Upload Documents Only (.txt, .doc, .docx)"
        textPlaceholder="Drag & drop or click to upload text/document files"
        options={{
          accept: {
            "text/plain": [".txt"],
            "application/msword": [".doc", ".docx"],
          },
          maxFiles: 4,
        }}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={({ file, onRemove }) => (
          <div className="text-center">
            <div className="text-5xl text-gray-500 dark:text-gray-400">📝</div>
            <div className="text-sm">{file.name}</div>
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={onRemove}>
              Remove
            </Button>
          </div>
        )}
      />
    )),
  args: {},
};

export const DefaultMultipleFiles: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="multipleFiles"
        label="Upload Multiple Files (Max 3, Mixed Types)"
        textPlaceholder="Drag & drop or click to upload files"
        options={{ ...mockOptions, maxFiles: 3 }}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const SingleFileOnly: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="singleFile"
        label="Upload a Single File"
        textPlaceholder="Drag & drop or click to upload one file only"
        options={{ ...mockOptions, maxFiles: 1 }}
        multiple={false}
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const RequiredField: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="requiredFile"
        label="Required File Upload"
        textPlaceholder="This field *requires* at least one file"
        options={mockOptions}
        multiple={false}
        // Removed rules={{ required: true }} because validation removed
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const MinTwoFilesRequired: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="minTwoFiles"
        label="Minimum Two Files"
        textPlaceholder="Please upload at least two files."
        options={{ ...mockOptions, maxFiles: 5 }}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const MaxTwoFilesAllowed: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="maxTwoFiles"
        label="Maximum Two Files"
        textPlaceholder="You can upload up to two files only"
        options={{ ...mockOptions, maxFiles: 2 }}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const WithInitialValue: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="controlledFiles"
        label="Pre-filled Files"
        textPlaceholder="This input starts with existing files"
        options={mockOptions}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const LoadingState: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="loadingFiles"
        label="Uploading Files (Loading State)"
        textPlaceholder="Files are currently being uploaded..."
        options={mockOptions}
        multiple={true}
        loading={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={({ file, onRemove }) => (
          <div className="opacity-70">
            <div className="flex items-center gap-2 rounded border p-2">
              {file.type.startsWith("image/") ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-16 w-16 rounded border object-cover"
                />
              ) : file.type.startsWith("video/") ? (
                <video
                  src={file.preview}
                  controls
                  className="h-16 w-16 rounded border object-cover"
                />
              ) : file.type.startsWith("application/pdf") ? (
                <span className="text-3xl text-red-600 dark:text-red-300">📄</span>
              ) : (
                <span className="text-3xl text-gray-600 dark:text-gray-300">📝</span>
              )}
              <span className="flex-1 truncate text-sm">{file.name}</span>
              <Button type="button" variant="outline" size="sm" onClick={onRemove} disabled>
                Remove
              </Button>
            </div>
          </div>
        )}
      />
    )),
  args: {},
};

export const DisabledInput: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="disabledFiles"
        label="Disabled File Input"
        textPlaceholder="This input is disabled and cannot accept files"
        options={{ ...mockOptions, disabled: true }}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={({ file, onRemove }) => (
          <div className="cursor-not-allowed opacity-50">
            <div className="flex items-center gap-2 rounded border p-2">
              {file.type.startsWith("image/") ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-16 w-16 rounded border object-cover"
                />
              ) : file.type.startsWith("video/") ? (
                <video
                  src={file.preview}
                  controls
                  className="h-16 w-16 rounded border object-cover"
                />
              ) : file.type.startsWith("application/pdf") ? (
                <span className="text-3xl text-red-600 dark:text-red-300">📄</span>
              ) : (
                <span className="text-3xl text-gray-600 dark:text-gray-300">📝</span>
              )}
              <span className="flex-1 truncate text-sm">{file.name}</span>
              <Button type="button" variant="outline" size="sm" onClick={onRemove} disabled>
                Remove
              </Button>
            </div>
          </div>
        )}
      />
    )),
  args: {},
};

// --- Customization Stories ---

export const WithCustomPlaceholder: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="customPlaceholderFiles"
        label="Custom Placeholder Text"
        textPlaceholder="Drop your important documents or click to browse!"
        options={mockOptions}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const WithCustomPreviewLayout: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="customPreviewFiles"
        label="Custom File Preview Layout"
        textPlaceholder="Upload files to see a custom preview"
        options={mockOptions}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={({ file, onRemove }) => (
          <div className="flex w-full items-center gap-3 rounded-lg border bg-indigo-50 p-3 shadow-md dark:bg-indigo-900">
            {file.type.startsWith("image/") ? (
              <img
                src={file.preview}
                alt={file.name}
                className="h-16 w-16 rounded-full border-2 border-indigo-400 object-cover"
              />
            ) : file.type.startsWith("video/") ? (
              <video
                src={file.preview}
                controls
                className="h-auto max-h-32 w-full rounded border-2 border-indigo-400 object-cover"
              />
            ) : file.type.startsWith("application/pdf") ? (
              <span className="text-3xl text-red-600 dark:text-red-300">📄</span>
            ) : (
              <span className="text-3xl text-gray-600 dark:text-gray-300">📝</span>
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-semibold text-indigo-800 dark:text-indigo-200">
                {file.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Size: {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                type="button"
                className="rounded bg-indigo-500 px-2 py-1 text-xs text-white hover:bg-indigo-600"
                onClick={() => alert(`Viewing ${file.name}`)}
              >
                View
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={onRemove}>
                Remove
              </Button>
            </div>
          </div>
        )}
      />
    )),
  args: {},
};

export const WithCustomClassNames: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="customClassFiles"
        label="Custom Styled Input and Wrapper"
        textPlaceholder="This input has unique border and background colors!"
        options={mockOptions}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        className="rounded-2xl border-4 border-dashed border-emerald-500 bg-emerald-50 p-8 shadow-lg dark:bg-emerald-950"
        innerClassName="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold py-6"
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const WithTooltip: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        name="tooltipFiles"
        label="File Upload with Tooltip"
        tooltip="Click to upload your profile picture or resume."
        textPlaceholder="Choose file(s)"
        options={mockOptions}
        multiple={false}
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};

export const WithIdProp: Story = {
  render: (args) =>
    FormWrapper(({ control }) => (
      <FileInputFormField
        {...args}
        id="my-unique-file-input"
        name="idPropFiles"
        label="File Upload with Custom ID"
        textPlaceholder="This input has a specific ID"
        options={mockOptions}
        multiple={true}
        control={control as unknown as Control<FieldValues>}
        renderFile={defaultRenderFile}
      />
    )),
  args: {},
};
