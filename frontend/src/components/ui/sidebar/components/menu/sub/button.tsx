import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
};

/**
 * Clickable submenu button component.
 */
export const SidebarMenuSubButton: FC<Props> = ({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}) => {
  const Component = asChild ? Slot : "a";

  return (
    <Component
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={joinClasses(
        "text-sidebar-custom-foreground ring-sidebar-custom-ring hover:bg-sidebar-custom-accent hover:text-sidebar-custom-accent-foreground active:bg-sidebar-custom-accent active:text-sidebar-custom-accent-foreground [&>svg]:text-sidebar-custom-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-custom-accent data-[active=true]:text-sidebar-custom-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className || ""
      )}
      {...props}
    />
  );
};
