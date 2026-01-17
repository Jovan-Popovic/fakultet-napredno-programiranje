import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { SelectFormField } from ".";

import type { SelectOption } from "@/components/ui/select/common/types/options";

/* ------------------------------------------------------------------ */
/*  Storybook Metadata                                                */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof SelectFormField> = {
  title: "Form/Select",
  component: SelectFormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SelectFormField>;

type FormValues = {
  category: SelectOption;
  multiCategory: SelectOption[];
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
const options: SelectOption[] = [
  { label: "Design", value: "design" },
  { label: "Development", value: "development" },
  { label: "Marketing", value: "marketing" },
];

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      category: options[0],
      multiCategory: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="flex max-w-md flex-col gap-6">{children}</form>
    </FormProvider>
  );
};

/* ------------------------------------------------------------------ */
/*  Stories                                                           */
/* ------------------------------------------------------------------ */

export const SingleSelect: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { category: options[1] },
    });

    return (
      <FormWrapper>
        <SelectFormField<FormValues>
          name="category"
          control={control}
          label="Category"
          options={options}
        />
      </FormWrapper>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { multiCategory: [options[1]] },
    });

    return (
      <FormWrapper>
        <SelectFormField<FormValues>
          name="multiCategory"
          control={control}
          label="Multiple Categories"
          options={options}
          isMulti
        />
      </FormWrapper>
    );
  },
};

export const MultiSelectBelowListOnly: Story = {
  name: "Multi select (below list only)",
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { multiCategory: [] },
    });

    return (
      <FormWrapper>
        <SelectFormField<FormValues>
          name="multiCategory"
          control={control}
          label="Multiple Categories"
          options={options}
          isMulti
          hideSelectedInControl
          displaySelectedBelow
        />
      </FormWrapper>
    );
  },
};

export const WithBulkSelect: Story = {
  render: () => {
    const { control } = useForm<FormValues>({
      defaultValues: { multiCategory: [] },
    });

    return (
      <FormWrapper>
        <SelectFormField<FormValues>
          name="multiCategory"
          control={control}
          label="Bulk Select Categories"
          options={options}
          isMulti
          hasBulkSelect
        />
      </FormWrapper>
    );
  },
};
