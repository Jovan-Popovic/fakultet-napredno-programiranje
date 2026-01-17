import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useMemo, type ComponentProps, type FC, type ReactNode } from "react";

import { useSidebar } from "@/components/ui/sidebar/contexts";
import { SidebarState } from "@/components/ui/sidebar/enums/sidebar";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipPosition, TooltipTriggerEvent } from "@/components/ui/tooltip/enums";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

const sidebarMenuButtonVariants = cva(
  "peer/menu-button ring-sidebar-custom-ring hover:bg-sidebar-custom-accent hover:text-sidebar-custom-accent-foreground active:bg-sidebar-custom-accent active:text-sidebar-custom-accent-foreground data-[active=true]:bg-sidebar-custom-accent data-[active=true]:text-sidebar-custom-accent-foreground data-[state=open]:hover:bg-sidebar-custom-accent data-[state=open]:hover:text-sidebar-custom-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-custom-accent hover:text-sidebar-custom-accent-foreground",
        outline:
          "hover:bg-sidebar-custom-accent hover:text-sidebar-custom-accent-foreground bg-gray-50 shadow-[0_0_0_1px_hsl(var(--sidebar-custom-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-custom-accent))] dark:bg-gray-900",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type Props = ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | ReactNode;
  tooltipPosition?: TooltipPosition;
} & VariantProps<typeof sidebarMenuButtonVariants>;

/**
 * Clickable menu button component with optional tooltip support.
 */
export const SidebarMenuButton: FC<Props> = ({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  tooltipPosition = TooltipPosition.RIGHT,
  className,
  ...props
}) => {
  const Component = asChild ? Slot : "button";
  const { isMobile, sidebarState } = useSidebar();

  const ButtonComponent = useMemo(
    () => (
      <Component
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={joinClasses(sidebarMenuButtonVariants({ variant, size }), className || "")}
        {...props}
      />
    ),
    [Component, className, isActive, props, size, variant]
  );

  // Only show tooltip when sidebar is collapsed and not on mobile
  const shouldShowTooltip = sidebarState === SidebarState.COLLAPSED && !isMobile && tooltip;

  if (!shouldShowTooltip) return ButtonComponent;

  return (
    <Tooltip content={tooltip} position={tooltipPosition} trigger={TooltipTriggerEvent.HOVER}>
      {ButtonComponent}
    </Tooltip>
  );
};
