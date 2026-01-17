import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"div"> & { asChild?: boolean };

/**
 * Label component for sidebar groups.
 */
export const SidebarGroupLabel: FC<Props> = ({ className, asChild = false, ...props }) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={joinClasses(
        "text-sidebar-custom-foreground/70 ring-sidebar-custom-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className || ""
      )}
      {...props}
    />
  );
};
