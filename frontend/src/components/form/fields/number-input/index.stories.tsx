import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";

import { NumberInputFormField } from "./index";

import { Button } from "@/components/ui/button";

const meta: Meta<typeof NumberInputFormField> = {
  title: "Components/Form/Fields/NumberInputFormField",
  component: NumberInputFormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form field wrapper for NumberInput component with React Hook Form integration.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInputFormField>;

type FormData = {
  quantity: number;
  price: number;
  optionalNumber?: number;
};

export const Default: Story = {
  render: () => {
    const { control } = useForm<FormData>({
      defaultValues: {
        quantity: undefined,
        price: undefined,
        optionalNumber: undefined,
      },
    });

    return (
      <div className="w-64">
        <NumberInputFormField
          control={control}
          name="quantity"
          label="Quantity"
          rules={{ required: true }}
          min={1}
          max={100}
          placeholder="Enter quantity (1-100)"
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const { control } = useForm<FormData>({
      defaultValues: {
        quantity: 25,
        price: 99.99,
        optionalNumber: 500,
      },
    });

    return (
      <div className="w-64 space-y-4">
        <NumberInputFormField
          control={control}
          name="quantity"
          label="Quantity"
          rules={{ required: true }}
          min={1}
          max={100}
        />
        <NumberInputFormField
          control={control}
          name="price"
          label="Price"
          rules={{ required: true }}
          min={0}
          allowDecimals
          precision={2}
          step={0.01}
        />
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues: {
        quantity: undefined,
        price: undefined,
      },
    });

    const onSubmit = (data: FormData) => {
      alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-64 space-y-4">
        <NumberInputFormField
          control={control}
          name="quantity"
          label="Quantity"
          rules={{ required: true }}
          min={1}
          max={100}
          placeholder="Enter quantity"
          helpText="Must be between 1 and 100"
        />
        <NumberInputFormField
          control={control}
          name="price"
          label="Price ($)"
          rules={{ required: true }}
          min={0}
          allowDecimals
          precision={2}
          step={0.01}
          placeholder="0.00"
          infoMessage="Enter the price in USD"
        />
        <Button type="submit">Submit</Button>
        <div className="text-sm text-red-600">
          {Object.keys(errors).length > 0 && <pre>{JSON.stringify(errors, null, 2)}</pre>}
        </div>
      </form>
    );
  },
};

export const OptionalField: Story = {
  render: () => {
    const { control } = useForm<FormData>({
      defaultValues: {
        optionalNumber: undefined,
      },
    });

    return (
      <div className="w-64">
        <NumberInputFormField
          control={control}
          name="optionalNumber"
          label="Optional Number"
          min={0}
          max={1000}
          placeholder="Optional (0-1000)"
          helpText="This field is optional"
        />
      </div>
    );
  },
};

export const NoControls: Story = {
  render: () => {
    const { control } = useForm<FormData>();

    return (
      <div className="w-64">
        <NumberInputFormField
          control={control}
          name="quantity"
          label="Quantity (No Steppers)"
          rules={{ required: true }}
          min={0}
          showControls={false}
          placeholder="Type numbers only"
        />
      </div>
    );
  },
};

export const IntegersOnly: Story = {
  render: () => {
    const { control } = useForm<FormData>();

    return (
      <div className="w-64">
        <NumberInputFormField
          control={control}
          name="quantity"
          label="Integer Only"
          rules={{ required: true }}
          min={0}
          max={999}
          allowDecimals={false}
          placeholder="Whole numbers only"
          helpText="No decimal points allowed"
        />
      </div>
    );
  },
};

export const WithTooltip: Story = {
  render: () => {
    const { control } = useForm<FormData>();

    return (
      <div className="w-64">
        <NumberInputFormField
          control={control}
          name="quantity"
          label="Business Managers"
          rules={{ required: true }}
          min={0}
          max={100}
          tooltip="The maximum number of business managers you can request for this workspace"
          placeholder="0-100"
          infoMessage="Don't need any business managers? Enter 0."
        />
      </div>
    );
  },
};
