import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"footer">;

/**
 * Footer section component for sidebar.
 */
export const SidebarFooter: FC<Props> = ({ className, ...props }) => {
  return (
    <footer
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={joinClasses("flex flex-col gap-2 p-2", className || "")}
      {...props}
    />
  );
};
