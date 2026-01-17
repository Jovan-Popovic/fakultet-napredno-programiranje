import { MenuIcon } from "lucide-react";
import { type ComponentProps, type FC } from "react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar/contexts";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<typeof Button>;

/**
 * Button component to toggle sidebar visibility.
 */
export const SidebarTrigger: FC<Props> = ({ className, onClick, ...props }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="md"
      className={joinClasses("p-3", className || "")}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
      icon={MenuIcon}
    />
  );
};
