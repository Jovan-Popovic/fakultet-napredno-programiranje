import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"ul">;

/**
 * Submenu container for nested navigation items.
 */
export const SidebarMenuSub: FC<Props> = ({ className, ...props }) => {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={joinClasses(
        "border-sidebar-custom-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className || ""
      )}
      {...props}
    />
  );
};
