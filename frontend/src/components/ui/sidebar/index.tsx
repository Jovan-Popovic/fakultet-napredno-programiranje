import { type ComponentProps, type CSSProperties, type FC } from "react";

import { SIDEBAR_CONFIG } from "./constants/config";
import { useSidebar } from "./contexts";
import { SidebarCollapsible, SidebarSide, SidebarState, SidebarVariant } from "./enums/sidebar";

import { Sheet } from "@/components/ui/sheet";
import { SheetContent } from "@/components/ui/sheet/content";
import { SheetDescription } from "@/components/ui/sheet/description";
import { SheetHeader } from "@/components/ui/sheet/header";
import { SheetTitle } from "@/components/ui/sheet/title";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = ComponentProps<"div"> & {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
};

export const Sidebar: FC<Props> = ({
  side = SidebarSide.LEFT,
  variant = SidebarVariant.SIDEBAR,
  collapsible = SidebarCollapsible.OFFCANVAS,
  className,
  children,
  ...props
}) => {
  const { isMobile, sidebarState, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === SidebarCollapsible.NONE) {
    return (
      <div
        data-slot="sidebar"
        className={joinClasses(
          "bg-sidebar text-sidebar-custom-foreground flex h-full w-(--sidebar-width) flex-col",
          className || ""
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-custom-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_CONFIG.widthMobile,
            } as CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-custom-foreground hidden md:block"
      data-state={sidebarState}
      data-collapsible={sidebarState === SidebarState.COLLAPSED ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* Sidebar gap handler for desktop */}
      {/* <div
        data-slot="sidebar-gap"
        className={joinClasses(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear mt-14",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === SidebarVariant.FLOATING || variant === SidebarVariant.INSET
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      /> */}
      <div
        data-slot="sidebar-container"
        className={joinClasses(
          "fixed top-0 bottom-0 left-0 z-10 hidden w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === SidebarSide.LEFT
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === SidebarVariant.FLOATING || variant === SidebarVariant.INSET
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className || ""
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-custom-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm dark:bg-gray-900"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
