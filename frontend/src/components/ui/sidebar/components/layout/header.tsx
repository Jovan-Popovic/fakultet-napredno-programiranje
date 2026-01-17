import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"header">;

/**
 * Header section component for sidebar.
 */
export const SidebarHeader: FC<Props> = ({ className, ...props }) => {
  return (
    <header
      data-slot="sidebar-header"
      data-sidebar="header"
      className={joinClasses("flex flex-col gap-2 p-2", className || "")}
      {...props}
    />
  );
};
