import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { screen, within } from "storybook/test";

import { DatePicker } from ".";

import type { DatePickerTypeSingle } from "@/components/ui/date-picker/common/types/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker/Single",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    showTime: {
      control: "boolean",
      description: "Whether to show the time picker",
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

const DatePickerWrapper = ({
  defaultValue,
  showTime,
}: {
  defaultValue?: DatePickerTypeSingle;
  showTime?: boolean;
}) => {
  const [date, setDate] = useState<DatePickerTypeSingle | undefined>(defaultValue);

  return (
    <div
      style={{
        height: "500px",
        padding: "2rem",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <DatePicker
        showTime={showTime}
        value={date}
        onChange={(val) => {
          setDate(val);
          // console.log("Date changed:", val);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  name: "Default (no time picker)",
  render: () => <DatePickerWrapper />,
};

export const WithInitialDate: Story = {
  render: () => <DatePickerWrapper defaultValue={new Date()} />,
};

export const WithTimePicker: Story = {
  render: () => <DatePickerWrapper defaultValue={new Date()} showTime />,
};

export const EmptyWithTimePicker: Story = {
  render: () => <DatePickerWrapper showTime />,
};

export const Play: Story = {
  name: "Default play",
  render: () => <DatePickerWrapper />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    await wait(500);
    await userEvent.click(canvas.getByTestId("open-button"));
    await wait(1000);

    const presetButton = await screen.findAllByTestId("preset-button");
    await userEvent.click(presetButton[0]);
    await wait(1000);

    const dayButton = await screen.findAllByTestId("day-button");
    await userEvent.click(dayButton[0]);
    await wait(1000);

    await userEvent.click(canvas.getByTestId("open-button"));
    // await wait(1000);

    // const resetIcon = await screen.findByTestId("reset-icon");
    // await userEvent.click(resetIcon);
  },
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
