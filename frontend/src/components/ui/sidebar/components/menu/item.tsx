import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"li">;

/**
 * Individual menu item container.
 */
export const SidebarMenuItem: FC<Props> = ({ className, ...props }) => {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={joinClasses("group/menu-item relative", className || "")}
      {...props}
    />
  );
};
