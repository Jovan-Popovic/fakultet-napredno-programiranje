import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "./index";

import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardDescription } from "@/components/ui/card/description";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";

/* ------------------------------------------------------------------ */
/*  Storybook metadata                                                */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible calendar component built on react-day-picker for date selection with multiple modes and customization options.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
    },
    showOutsideDays: {
      control: "boolean",
      defaultValue: true,
    },
    disabled: {
      control: "boolean",
    },
    fixedWeeks: {
      control: "boolean",
    },
    numberOfMonths: {
      control: "number",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

/* ------------------------------------------------------------------ */
/*  Basic Stories                                                     */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    mode: "single",
    showOutsideDays: true,
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(),
      addDays(new Date(), 1),
      addDays(new Date(), 2),
    ]);

    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
    );
  },
};

export const RangeSelection: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });

    return (
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        className="rounded-md border"
        numberOfMonths={2}
      />
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Configuration Stories                                             */
/* ------------------------------------------------------------------ */

export const WithoutOutsideDays: Story = {
  args: {
    mode: "single",
    showOutsideDays: false,
  },
};

export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className="rounded-md border"
      />
    );
  },
};

export const FixedWeeks: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        fixedWeeks
        className="rounded-md border"
      />
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Disabled Dates Stories                                            */
/* ------------------------------------------------------------------ */

export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    const disabledDays = [
      { before: new Date() }, // Disable past dates
      { dayOfWeek: [0, 6] }, // Disable weekends
      new Date(2024, 4, 15), // Disable specific date
    ];

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabledDays}
        className="rounded-md border"
      />
    );
  },
};

export const FutureDatesOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: new Date() }}
        className="rounded-md border"
      />
    );
  },
};

export const PastDatesOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ after: new Date() }}
        className="rounded-md border"
      />
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Custom Styling Stories                                            */
/* ------------------------------------------------------------------ */

export const CustomStyling: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border-2 border-blue-200 bg-blue-50 dark:bg-blue-950"
        classNames={{
          day_selected: "bg-blue-600 text-white hover:bg-blue-700",
          day_today: "bg-blue-100 text-blue-900 font-bold",
          caption_label: "text-blue-800 font-bold",
        }}
      />
    );
  },
};

export const CompactSize: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border p-2"
        classNames={{
          day: "h-7 w-7 p-0 text-xs",
          head_cell: "text-xs w-7",
          caption_label: "text-sm",
        }}
      />
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Real-world Examples                                               */
/* ------------------------------------------------------------------ */

export const DateRangePicker: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    return (
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Select Date Range</CardTitle>
          <CardDescription>Choose a start and end date for your event</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            className="rounded-md border-0"
          />
          <div className="mt-4 text-sm">
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  Selected: {dateRange.from.toDateString()} - {dateRange.to.toDateString()}
                </>
              ) : (
                <>Start date: {dateRange.from.toDateString()}</>
              )
            ) : (
              "No dates selected"
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const EventCalendar: Story = {
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([
      new Date(2024, 3, 10),
      new Date(2024, 3, 15),
      new Date(2024, 3, 22),
      new Date(2024, 3, 28),
    ]);

    return (
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Event Calendar</CardTitle>
          <CardDescription>Select multiple dates for events</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={setSelectedDates}
            className="rounded-md border-0"
            classNames={{
              day_selected: "bg-green-600 text-white hover:bg-green-700",
            }}
          />
          <div className="mt-4 text-sm">
            {selectedDates && selectedDates.length > 0 ? (
              <>Events scheduled: {selectedDates.length} days</>
            ) : (
              "No events scheduled"
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const BookingCalendar: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();

    // Simulate booked dates
    const bookedDates = [
      addDays(today, 2),
      addDays(today, 5),
      addDays(today, 8),
      addDays(today, 12),
    ];

    return (
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Booking Calendar</CardTitle>
          <CardDescription>Select an available date for your appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={[
              { before: today },
              { dayOfWeek: [0] }, // Disable Sundays
              ...bookedDates,
            ]}
            className="rounded-md border-0"
            classNames={{
              day_selected: "bg-purple-600 text-white hover:bg-purple-700",
              day_disabled: "text-gray-300 line-through",
            }}
          />
          <div className="mt-4 space-y-2">
            <div className="text-sm">
              {date ? <>Selected: {date.toDateString()}</> : "No date selected"}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              • Sundays are closed • Strikethrough dates are booked
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};

export const MiniCalendar: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Card className="w-64">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Today</CardTitle>
        </CardHeader>
        <CardContent className="!p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border-0 p-2"
            classNames={{
              months: "flex w-full",
              month: "space-y-2 w-full",
              table: "w-full",
              head_row: "flex w-full",
              head_cell:
                "text-gray-600 dark:text-gray-300 rounded-md w-8 font-normal text-[0.7rem]",
              row: "flex w-full mt-1",
              cell: "text-center text-xs relative p-0 [&:has([aria-selected])]:bg-accent focus-within:relative focus-within:z-20",
              day: "h-6 w-8 p-0 font-normal text-xs aria-selected:opacity-100",
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground text-xs",
              caption: "flex justify-center pt-1 relative items-center pb-2",
              caption_label: "text-xs font-medium",
              nav_button: "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100",
            }}
            showOutsideDays={false}
          />
        </CardContent>
      </Card>
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Layout Examples                                                   */
/* ------------------------------------------------------------------ */

export const CalendarSizes: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | undefined>(new Date());
    const [date2, setDate2] = useState<Date | undefined>(new Date());
    const [date3, setDate3] = useState<Date | undefined>(new Date());

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Large Calendar</h3>
          <Calendar
            mode="single"
            selected={date1}
            onSelect={setDate1}
            className="rounded-md border p-4"
            classNames={{
              day: "h-12 w-12 p-0 font-normal text-base",
              head_cell: "text-base w-12",
              caption_label: "text-lg font-semibold",
            }}
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Default Calendar</h3>
          <Calendar
            mode="single"
            selected={date2}
            onSelect={setDate2}
            className="rounded-md border"
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Compact Calendar</h3>
          <Calendar
            mode="single"
            selected={date3}
            onSelect={setDate3}
            className="rounded-md border p-2"
            classNames={{
              day: "h-6 w-6 p-0 text-xs",
              head_cell: "text-xs w-6",
              caption_label: "text-sm",
            }}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};
