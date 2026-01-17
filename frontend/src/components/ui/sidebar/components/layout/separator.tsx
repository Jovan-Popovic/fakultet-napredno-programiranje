import type { ComponentProps, FC } from "react";

import { Separator } from "@/components/ui/separator";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

type Props = ComponentProps<typeof Separator>;

/**
 * Separator component styled for sidebar usage.
 */
export const SidebarSeparator: FC<Props> = ({ className, ...props }) => {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={joinClasses("bg-sidebar-custom-border mx-2 w-auto", className || "")}
      {...props}
    />
  );
};
