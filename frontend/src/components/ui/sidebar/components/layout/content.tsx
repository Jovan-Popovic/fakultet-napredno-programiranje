import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"div">;

/**
 * Main content container for sidebar.
 */
export const SidebarContent: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={joinClasses(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className || ""
      )}
      {...props}
    />
  );
};
