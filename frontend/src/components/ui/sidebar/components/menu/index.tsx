import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"ul">;

/**
 * Menu list container for sidebar navigation items.
 */
export const SidebarMenu: FC<Props> = ({ className, ...props }) => {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={joinClasses("flex w-full min-w-0 flex-col gap-1", className || "")}
      {...props}
    />
  );
};
