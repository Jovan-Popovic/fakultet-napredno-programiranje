import { useMemo, type ComponentProps, type FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"div"> & {
  showIcon?: boolean;
};

/**
 * Skeleton loading component for menu items.
 */
export const SidebarMenuSkeleton: FC<Props> = ({ className, showIcon = false, ...props }) => {
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={joinClasses("flex h-8 items-center gap-2 rounded-md px-2", className || "")}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          maxWidth: width,
        }}
      />
    </div>
  );
};
