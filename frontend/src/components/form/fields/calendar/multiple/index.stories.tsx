import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { array, date, object, type infer as zodInfer } from "zod";

import { calendarMultipleRequiredSchema } from "./schemas";

import { CalendarMultipleFormField } from ".";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardDescription } from "@/components/ui/card/description";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof CalendarMultipleFormField> = {
  title: "Form/Calendar/Multiple",
  component: CalendarMultipleFormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field component for multiple date selection with react-hook-form integration using Zod validation.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CalendarMultipleFormField>;

export const Default: Story = {
  render: () => {
    type CalendarMultipleRequiredValues = zodInfer<typeof calendarMultipleRequiredSchema>;
    const formMethods = useForm<CalendarMultipleRequiredValues>({
      resolver: zodResolver(calendarMultipleRequiredSchema),
      defaultValues: {
        dates: undefined,
      },
    });
    const { control, handleSubmit, watch } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const watchedDates = watch("dates");

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-md">
          <CardHeader>
            <CardTitle>Multiple Date Selection</CardTitle>
            <CardDescription>Select multiple dates with Zod validation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarMultipleFormField<CalendarMultipleRequiredValues>
                name="dates"
                control={control}
                label="Select Multiple Dates"
              />

              {watchedDates && watchedDates.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Selected: {watchedDates.length} date{watchedDates.length !== 1 ? "s" : ""}
                </div>
              )}

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};

export const EventPlanning: Story = {
  render: () => {
    /* ------------------------------------------------------------------ */
    /*  Story-specific schemas                                            */
    /* ------------------------------------------------------------------ */
    const eventDatesSchema = object({
      events: array(date())
        .min(1, {
          message: "Please select at least one event date",
        })
        .max(10, {
          message: "Maximum 10 event dates allowed",
        }),
    });
    type EventDatesValues = zodInfer<typeof eventDatesSchema>;

    const formMethods = useForm<EventDatesValues>({
      resolver: zodResolver(eventDatesSchema),
      defaultValues: {
        events: undefined,
      },
    });
    const { control, handleSubmit, watch } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const watchedEvents = watch("events");

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-md">
          <CardHeader>
            <CardTitle>Event Planning</CardTitle>
            <CardDescription>Zod validation: 1-10 event dates required</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarMultipleFormField<EventDatesValues>
                name="events"
                control={control}
                label="Event Dates"
                tooltip="Select 1-10 dates for your events. Zod schema enforces the limits."
              />

              {watchedEvents && watchedEvents.length > 0 && (
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>Selected: {watchedEvents.length}/10 event dates</div>
                  <div className="text-xs">• Minimum: 1 date • Maximum: 10 dates</div>
                </div>
              )}
              <Button type="submit" className="w-full">
                Create Events
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};

export const WorkDaysSelection: Story = {
  render: () => {
    const workDaysSchema = object({
      workDays: array(date())
        .optional()
        .refine(
          (dates) => {
            if (!dates || dates.length === 0) return true;

            // All dates must be weekdays (Monday-Friday) and in the future
            return dates.every((date) => {
              const dayOfWeek = date.getDay();
              const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
              const isFuture = date >= new Date();
              return isWeekday && isFuture;
            });
          },
          {
            message: "Work days must be future weekdays only",
          }
        ),
    });
    type WorkDaysValues = zodInfer<typeof workDaysSchema>;

    const formMethods = useForm<WorkDaysValues>({
      resolver: zodResolver(workDaysSchema),
      defaultValues: {
        workDays: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const watchedWorkDays = useWatch({ control, name: "workDays" });

    const disabledDays = [
      { before: new Date() }, // Disable past dates
      { dayOfWeek: [0, 6] }, // Disable weekends
    ];

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-md">
          <CardHeader>
            <CardTitle>Work Days Selection</CardTitle>
            <CardDescription>Complex Zod validation: future weekdays only</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarMultipleFormField<WorkDaysValues>
                name="workDays"
                control={control}
                label="Select Work Days"
                disabled={disabledDays}
              />

              {watchedWorkDays && watchedWorkDays.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {watchedWorkDays.length} work day{watchedWorkDays.length !== 1 ? "s" : ""}{" "}
                  selected
                </div>
              )}

              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                <div>• Future dates only (enforced by Zod)</div>
                <div>• Weekdays only (enforced by Zod)</div>
                <div>• Visual constraints match Zod validation</div>
              </div>

              <Button type="submit" className="w-full">
                Save Work Days
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};

export const HolidayDates: Story = {
  render: () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const holidayDatesSchema = object({
      holidays: array(date())
        .min(1, {
          message: "Please select at least one holiday date",
        })
        .refine(
          (dates) => {
            // No duplicate dates
            const dateStrings = dates.map((date) => date.toDateString());
            return new Set(dateStrings).size === dateStrings.length;
          },
          {
            message: "Duplicate holiday dates are not allowed",
          }
        ),
    });

    type HolidayDatesValues = zodInfer<typeof holidayDatesSchema>;

    const formMethods = useForm<HolidayDatesValues>({
      resolver: zodResolver(holidayDatesSchema),
      defaultValues: {
        holidays: [today, tomorrow, dayAfter],
      },
    });
    const { control, handleSubmit, watch } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const watchedHolidays = watch("holidays");

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-md">
          <CardHeader>
            <CardTitle>Holiday Calendar</CardTitle>
            <CardDescription>Zod validation prevents duplicate dates</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarMultipleFormField<HolidayDatesValues>
                name="holidays"
                control={control}
                label="Holiday Dates"
                tooltip="Zod schema ensures no duplicate dates are allowed"
              />

              {watchedHolidays && watchedHolidays.length > 0 && (
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    {watchedHolidays.length} holiday{watchedHolidays.length !== 1 ? "s" : ""}{" "}
                    selected
                  </div>
                  <div className="text-xs">• Pre-selected with default values</div>
                  <div className="text-xs">• Duplicate prevention via Zod</div>
                </div>
              )}

              <Button type="submit" className="w-full">
                Save Holidays
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};
