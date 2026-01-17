import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { screen, within } from "storybook/test";

import { DatePickerRange } from ".";

import type { DatePickerTypeRange } from "@/components/ui/date-picker/common/types/date-picker";

const meta: Meta<typeof DatePickerRange> = {
  title: "UI/DatePicker/Range",
  component: DatePickerRange,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DatePickerRange>;

const DatePickerRangeWrapper = ({ defaultValue }: { defaultValue?: DatePickerTypeRange }) => {
  const [range, setRange] = useState<DatePickerTypeRange | undefined>(defaultValue);

  return (
    <div
      style={{
        height: "500px",
        padding: "2rem",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <DatePickerRange value={range} onChange={setRange} />
      <p style={{ fontSize: "14px" }}>
        Selected Range:{" "}
        {range?.from
          ? `${range.from.toDateString()} → ${range.to?.toDateString() || "..."}`
          : "None"}
      </p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                Stories                                     */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  name: "Default (no initial value)",
  render: () => <DatePickerRangeWrapper />,
};

export const WithInitialValue: Story = {
  render: () => (
    <DatePickerRangeWrapper
      defaultValue={{
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7)),
      }}
    />
  ),
};

export const Play: Story = {
  name: "Default play",
  render: () => <DatePickerRangeWrapper />,
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
