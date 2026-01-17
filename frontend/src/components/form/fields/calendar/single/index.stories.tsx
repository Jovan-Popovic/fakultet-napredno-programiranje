import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { addMonths, subMonths } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { date, object, type infer as zodInfer } from "zod";

import { calendarSingleFormSchema, calendarSingleRequiredSchema } from "./schemas";

import { CalendarSingleFormField } from ".";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardDescription } from "@/components/ui/card/description";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof CalendarSingleFormField> = {
  title: "Form/Calendar/Single",
  component: CalendarSingleFormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field component for single date selection with react-hook-form integration using Zod validation.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CalendarSingleFormField>;

/* ------------------------------------------------------------------ */
/*  Stories                                                           */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => {
    type CalendarSingleFormValues = zodInfer<typeof calendarSingleFormSchema>;
    const formMethods = useForm<CalendarSingleFormValues>({
      resolver: zodResolver(calendarSingleFormSchema),
      defaultValues: {
        date: undefined,
      },
    });
    const { control, handleSubmit, watch } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const watchedDate = watch("date");

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-md">
          <CardHeader>
            <CardTitle>Single Date Selection</CardTitle>
            <CardDescription>Select a single date from the calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarSingleFormField<CalendarSingleFormValues>
                name="date"
                control={control}
                label="Select Date"
              />

              {watchedDate && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Selected: {watchedDate.toDateString()}
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

export const Required: Story = {
  render: () => {
    type CalendarSingleRequiredValues = zodInfer<typeof calendarSingleRequiredSchema>;

    const formMethods = useForm<CalendarSingleRequiredValues>({
      resolver: zodResolver(calendarSingleRequiredSchema),
      defaultValues: {
        date: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-md">
          <CardHeader>
            <CardTitle>Required Date</CardTitle>
            <CardDescription>This date field is required (Zod validation)</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarSingleFormField<CalendarSingleRequiredValues>
                name="date"
                control={control}
                label="Required Date"
              />

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

export const AppointmentBooking: Story = {
  render: () => {
    const appointmentDateSchema = object({
      appointmentDate: date({
        error: "Please select an appointment date",
      })
        .refine(
          (date) => {
            // Must be a future date
            return date > new Date();
          },
          {
            message: "Appointment date must be in the future",
          }
        )
        .refine(
          (date) => {
            // Must be a weekday (Monday-Friday)
            const dayOfWeek = date.getDay();
            return dayOfWeek >= 1 && dayOfWeek <= 5;
          },
          {
            message: "Appointments are only available on weekdays",
          }
        ),
    });

    type AppointmentDateValues = zodInfer<typeof appointmentDateSchema>;

    const formMethods = useForm<AppointmentDateValues>({
      resolver: zodResolver(appointmentDateSchema),
      defaultValues: {
        appointmentDate: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const disabledDays = [
      { before: new Date() }, // Disable past dates
      { dayOfWeek: [0, 6] }, // Disable weekends
    ];

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-md">
          <CardHeader>
            <CardTitle>Appointment Booking</CardTitle>
            <CardDescription>Complex Zod validation: future weekdays only</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarSingleFormField<AppointmentDateValues>
                name="appointmentDate"
                control={control}
                label="Select Appointment Date"
                disabled={disabledDays}
                tooltip="Appointments are available Monday through Friday, future dates only"
              />

              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                <div>• Must be a future date</div>
                <div>• Weekdays only (Mon-Fri)</div>
                <div>• Validation handled by Zod schema</div>
              </div>

              <Button type="submit" className="w-full">
                Book Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};

export const DateRangeLimit: Story = {
  render: () => {
    const dateRangeLimitSchema = object({
      date: date({
        error: "Please select a date",
      }).refine(
        (date) => {
          // Must be within 3 months from today
          const today = new Date();
          const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
          const twoMonthsFromNow = new Date(
            today.getFullYear(),
            today.getMonth() + 2,
            today.getDate()
          );

          return date >= oneMonthAgo && date <= twoMonthsFromNow;
        },
        {
          message: "Date must be within the available 3-month window",
        }
      ),
    });
    type DateRangeLimitValues = zodInfer<typeof dateRangeLimitSchema>;
    const formMethods = useForm<DateRangeLimitValues>({
      resolver: zodResolver(dateRangeLimitSchema),
      defaultValues: {
        date: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const today = new Date();
    const disabledDays = [{ before: subMonths(today, 1) }, { after: addMonths(today, 2) }];

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-md">
          <CardHeader>
            <CardTitle>Limited Date Range</CardTitle>
            <CardDescription>Zod validation enforces 3-month window</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarSingleFormField<DateRangeLimitValues>
                name="date"
                control={control}
                label="Select Date (Limited Range)"
                disabled={disabledDays}
              />

              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                <div>
                  Available: {subMonths(today, 1).toDateString()} -{" "}
                  {addMonths(today, 2).toDateString()}
                </div>
                <div>• Zod schema validates the 3-month window</div>
              </div>

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
