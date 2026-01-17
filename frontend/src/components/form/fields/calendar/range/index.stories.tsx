import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays, addMonths, subMonths } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { date, object, type infer as zodInfer } from "zod";

import { CalendarRangeFormField } from ".";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardDescription } from "@/components/ui/card/description";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
const meta: Meta<typeof CalendarRangeFormField> = {
  title: "Form/Calendar/Range",
  component: CalendarRangeFormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form field component for date range selection with react-hook-form integration.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CalendarRangeFormField>;

// Simple type for basic stories
type SimpleRangeFormValues = {
  dateRange?: { from: Date; to?: Date } | undefined;
  project?: { from: Date; to?: Date } | undefined;
  vacation?: { from: Date; to?: Date } | undefined;
  booking?: { from: Date; to?: Date } | undefined;
};

/* ------------------------------------------------------------------ */
/*  Stories                                                           */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => {
    /* ------------------------------------------------------------------ */
    /*  Story-specific schemas                                            */
    /* ------------------------------------------------------------------ */
    const defaultSchema = object({
      dateRange: object({
        from: date(),
        to: date().optional(),
      }).optional(),
    });
    type DefaultValues = zodInfer<typeof defaultSchema>;

    const formMethods = useForm<DefaultValues>({
      resolver: zodResolver(defaultSchema),
      defaultValues: {
        dateRange: undefined,
      },
    });
    const { control, handleSubmit, watch } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const watchedRange = watch("dateRange");

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-2xl">
          <CardHeader>
            <CardTitle>Date Range Selection</CardTitle>
            <CardDescription>Select a range of dates from the calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarRangeFormField<DefaultValues>
                name="dateRange"
                control={control}
                label="Select Date Range"
                numberOfMonths={2}
              />

              {watchedRange && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {watchedRange.from ? (
                    watchedRange.to ? (
                      <>
                        Range: {watchedRange.from.toDateString()} - {watchedRange.to.toDateString()}
                      </>
                    ) : (
                      <>Start: {watchedRange.from.toDateString()}</>
                    )
                  ) : (
                    "No range selected"
                  )}
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
    /* ------------------------------------------------------------------ */
    /*  Story-specific schemas                                            */
    /* ------------------------------------------------------------------ */
    const vacationSchema = object({
      vacation: object({
        from: date(),
        to: date(),
      }).refine((data) => data.to >= data.from, {
        message: "End date must be after or equal to start date",
        path: ["to"],
      }),
    });
    type VacationValues = zodInfer<typeof vacationSchema>;

    const formMethods = useForm<VacationValues>({
      resolver: zodResolver(vacationSchema),
      defaultValues: {
        vacation: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-2xl">
          <CardHeader>
            <CardTitle>Required Date Range</CardTitle>
            <CardDescription>Both start and end dates are required</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarRangeFormField<VacationValues>
                name="vacation"
                control={control}
                label="Vacation Dates"
                numberOfMonths={2}
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

export const WithDefaultValue: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    const formMethods = useForm<SimpleRangeFormValues>({
      defaultValues: {
        dateRange: undefined,
        vacation: undefined,
        project: { from: today, to: nextWeek },
        booking: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-2xl">
          <CardHeader>
            <CardTitle>Pre-selected Range</CardTitle>
            <CardDescription>Calendar with a default date range selected</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarRangeFormField<SimpleRangeFormValues>
                name="project"
                control={control}
                label="Project Duration"
                numberOfMonths={2}
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

export const FutureDatesOnly: Story = {
  render: () => {
    const formMethods = useForm<SimpleRangeFormValues>({
      defaultValues: {
        dateRange: undefined,
        vacation: undefined,
        project: undefined,
        booking: undefined,
      },
    });
    const { control, handleSubmit, watch } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const watchedBooking = watch("booking");

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-2xl">
          <CardHeader>
            <CardTitle>Future Booking Range</CardTitle>
            <CardDescription>Only future dates can be selected</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarRangeFormField<SimpleRangeFormValues>
                name="booking"
                control={control}
                label="Booking Dates"
                numberOfMonths={2}
                disabled={{ before: new Date() }}
              />

              {watchedBooking && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {watchedBooking.from && watchedBooking.to && (
                    <>
                      Duration:{" "}
                      {Math.ceil(
                        (watchedBooking.to.getTime() - watchedBooking.from.getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) + 1}{" "}
                      days
                    </>
                  )}
                </div>
              )}

              <div className="text-xs text-gray-600 dark:text-gray-300">
                • Only future dates are selectable
              </div>

              <Button type="submit" className="w-full">
                Book Dates
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
    const formMethods = useForm<SimpleRangeFormValues>({
      defaultValues: {
        dateRange: undefined,
        vacation: undefined,
        project: undefined,
        booking: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    const today = new Date();
    const disabledDays = [{ before: subMonths(today, 1) }, { after: addMonths(today, 6) }];

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-2xl">
          <CardHeader>
            <CardTitle>Limited Date Range</CardTitle>
            <CardDescription>Range selection within a specific time window</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarRangeFormField<SimpleRangeFormValues>
                name="project"
                control={control}
                label="Project Timeline"
                numberOfMonths={2}
                disabled={disabledDays}
              />

              <div className="text-xs text-gray-600 dark:text-gray-300">
                Available range: {subMonths(today, 1).toDateString()} -{" "}
                {addMonths(today, 6).toDateString()}
              </div>

              <Button type="submit" className="w-full">
                Set Timeline
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};

export const SingleMonth: Story = {
  render: () => {
    const formMethods = useForm<SimpleRangeFormValues>({
      defaultValues: {
        dateRange: undefined,
        vacation: undefined,
        project: undefined,
        booking: undefined,
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
            <CardTitle>Single Month View</CardTitle>
            <CardDescription>Range selection with single month display</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarRangeFormField<SimpleRangeFormValues>
                name="dateRange"
                control={control}
                label="Select Date Range"
                numberOfMonths={1}
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

export const WithTooltip: Story = {
  render: () => {
    const formMethods = useForm<SimpleRangeFormValues>({
      defaultValues: {
        dateRange: undefined,
        vacation: undefined,
        project: undefined,
        booking: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-2xl">
          <CardHeader>
            <CardTitle>Vacation Booking</CardTitle>
            <CardDescription>Select your vacation dates with helpful guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarRangeFormField<SimpleRangeFormValues>
                name="vacation"
                control={control}
                label="Vacation Period"
                numberOfMonths={2}
                tooltip="Select your vacation start and end dates. Click on the start date first, then click on the end date to complete your selection."
              />

              <Button type="submit" className="w-full">
                Book Vacation
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    const formMethods = useForm<SimpleRangeFormValues>({
      defaultValues: {
        dateRange: undefined,
        vacation: undefined,
        project: undefined,
        booking: undefined,
      },
    });
    const { control, handleSubmit } = formMethods;

    const onSubmit = () => {
      // Handle form submission
    };

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-2xl">
          <CardHeader>
            <CardTitle>Custom Styled Range</CardTitle>
            <CardDescription>Date range selection with custom colors</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CalendarRangeFormField<SimpleRangeFormValues>
                name="project"
                control={control}
                label="Project Timeline"
                labelClassName="text-blue-600 font-semibold"
                calendarClassName="border-blue-200 bg-blue-50"
                numberOfMonths={2}
              />

              <Button type="submit" className="w-full">
                Save Timeline
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};

export const BookingExample: Story = {
  render: () => {
    /* ------------------------------------------------------------------ */
    /*  Story-specific schemas                                            */
    /* ------------------------------------------------------------------ */
    const bookingSchema = object({
      stayRange: object({
        from: date(),
        to: date(),
      })
        .refine((data) => data.to >= data.from, {
          message: "Check-out must be after or equal to check-in",
          path: ["to"],
        })
        .refine(
          (data) => {
            const daysDiff = Math.ceil(
              (data.to.getTime() - data.from.getTime()) / (1000 * 60 * 60 * 24)
            );
            return daysDiff >= 1;
          },
          {
            message: "Stay must be at least 1 night",
            path: ["to"],
          }
        )
        .refine(
          (data) => {
            const daysDiff = Math.ceil(
              (data.to.getTime() - data.from.getTime()) / (1000 * 60 * 60 * 24)
            );
            return daysDiff <= 30;
          },
          {
            message: "Maximum stay is 30 nights",
            path: ["to"],
          }
        ),
    });
    type BookingValues = zodInfer<typeof bookingSchema>;

    const formMethods = useForm<BookingValues>({
      resolver: zodResolver(bookingSchema),
      defaultValues: {
        stayRange: undefined,
      },
    });
    const { control, handleSubmit, watch } = formMethods;

    const stayRange = watch("stayRange");

    const onSubmit = () => {
      // Handle booking submission
    };

    return (
      <FormProvider {...formMethods}>
        <Card className="w-fit max-w-3xl">
          <CardHeader>
            <CardTitle>Hotel Booking</CardTitle>
            <CardDescription>Select your complete stay period</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <CalendarRangeFormField<BookingValues>
                name="stayRange"
                control={control}
                label="Stay Period"
                numberOfMonths={2}
                disabled={{ before: new Date() }}
              />

              {stayRange?.from && stayRange?.to && (
                <div className="space-y-1 text-sm">
                  <div className="font-medium">Booking Summary:</div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Check-in: {stayRange.from.toDateString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Check-out: {stayRange.to.toDateString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Duration:{" "}
                    {Math.ceil(
                      (stayRange.to.getTime() - stayRange.from.getTime()) / (1000 * 60 * 60 * 24)
                    )}{" "}
                    night
                    {Math.ceil(
                      (stayRange.to.getTime() - stayRange.from.getTime()) / (1000 * 60 * 60 * 24)
                    ) !== 1
                      ? "s"
                      : ""}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
                Book Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    );
  },
};
