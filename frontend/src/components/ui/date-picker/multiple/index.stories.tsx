import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { screen, within } from "storybook/test";

import { DatePickerMultiple } from ".";

import type { DatePickerTypeMultiple } from "@/components/ui/date-picker/common/types/date-picker";

const meta: Meta<typeof DatePickerMultiple> = {
  title: "UI/DatePicker/Multiple",
  component: DatePickerMultiple,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePickerMultiple>;

const DatePickerMultipleWrapper = ({ defaultValue }: { defaultValue?: DatePickerTypeMultiple }) => {
  const [dates, setDates] = useState<DatePickerTypeMultiple | undefined>(defaultValue);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        alignItems: "flex-start", // Top aligned to prevent popover overflow
        justifyContent: "center",
      }}
    >
      <DatePickerMultiple value={dates} onChange={setDates} />
    </div>
  );
};

export const Default: Story = {
  name: "Default (no initial selection)",
  render: () => <DatePickerMultipleWrapper />,
};

export const WithInitialDates: Story = {
  name: "With initial multiple dates",
  render: () => (
    <DatePickerMultipleWrapper defaultValue={[new Date(), new Date(Date.now() + 86400000)]} />
  ),
};

export const Play: Story = {
  name: "Default play",
  render: () => <DatePickerMultipleWrapper />,
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

    // const resetIcon = screen.getByTestId("reset-icon");
    // await userEvent.click(resetIcon);
  },
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
