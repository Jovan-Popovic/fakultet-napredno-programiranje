import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { TripleSelectDatePicker } from ".";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof TripleSelectDatePicker> = {
  title: "UI/DatePicker/TripleSelectDatePicker",
  component: TripleSelectDatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Triple-select (Year/Month/Day) date picker that keeps a React DayPicker in sync. Useful when dropdown input is required.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TripleSelectDatePicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date());
    return (
      <div className="w-[640px]">
        <TripleSelectDatePicker value={value} onChange={setValue} showCalendar={false} />
      </div>
    );
  },
};

export const WithCalendar: Story = {
  render: () => {
    const min = new Date(1900, 0, 1);
    const max = new Date(2035, 11, 31);
    const [value, setValue] = useState<Date | undefined>(new Date());
    return (
      <div className="w-[760px]">
        <TripleSelectDatePicker
          value={value}
          onChange={setValue}
          minDate={min}
          maxDate={max}
          startYear={1900}
          endYear={2035}
          showCalendar={true}
        />
      </div>
    );
  },
};
