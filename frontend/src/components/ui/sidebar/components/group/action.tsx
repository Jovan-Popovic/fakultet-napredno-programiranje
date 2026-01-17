import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"button"> & { asChild?: boolean };

/**
 * Action button component for sidebar groups.
 */
export const SidebarGroupAction: FC<Props> = ({ className, asChild = false, ...props }) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={joinClasses(
        "text-sidebar-custom-foreground ring-sidebar-custom-ring hover:bg-sidebar-custom-accent hover:text-sidebar-custom-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className || ""
      )}
      {...props}
    />
  );
};
