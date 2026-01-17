import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
};

/**
 * Action button for menu items (e.g., more options, delete).
 */
export const SidebarMenuAction: FC<Props> = ({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={joinClasses(
        "text-sidebar-custom-foreground ring-sidebar-custom-ring hover:bg-sidebar-custom-accent hover:text-sidebar-custom-accent-foreground peer-hover/menu-button:text-sidebar-custom-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-custom-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className || ""
      )}
      {...props}
    />
  );
};
