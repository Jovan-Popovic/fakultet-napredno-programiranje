import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"div">;

/**
 * Content container for sidebar groups.
 */
export const SidebarGroupContent: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={joinClasses("w-full text-sm", className || "")}
      {...props}
    />
  );
};
