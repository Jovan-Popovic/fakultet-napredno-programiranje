import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"div">;

/**
 * Container component for grouping related sidebar items.
 */
export const SidebarGroup: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={joinClasses("relative flex w-full min-w-0 flex-col p-2", className || "")}
      {...props}
    />
  );
};
