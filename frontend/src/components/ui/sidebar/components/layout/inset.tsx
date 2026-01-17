import { type ComponentProps, type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"main">;

/**
 * Main content area component for sidebar layouts.
 */
export const SidebarInset: FC<Props> = ({ className, ...props }) => {
  return (
    <main
      data-slot="sidebar-inset"
      className={joinClasses(
        "relative flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-900",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className || ""
      )}
      {...props}
    />
  );
};
