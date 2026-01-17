import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"li">;

/**
 * Individual submenu item container.
 */
export const SidebarMenuSubItem: FC<Props> = ({ className, ...props }) => {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={joinClasses("group/menu-sub-item relative", className || "")}
      {...props}
    />
  );
};
