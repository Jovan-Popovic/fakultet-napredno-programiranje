import { type ComponentProps, type FC } from "react";

import { Input } from "@/components/ui/input";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<typeof Input>;

/**
 * Input component styled for sidebar usage.
 */
export const SidebarInput: FC<Props> = ({ className, ...props }) => {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={joinClasses("h-8 w-full bg-gray-50 shadow-none dark:bg-gray-900", className || "")}
      {...props}
    />
  );
};
