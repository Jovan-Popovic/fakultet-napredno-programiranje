import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type CSSProperties,
  type FC,
} from "react";

import { SIDEBAR_CONFIG } from "@/components/ui/sidebar/constants/config";
import { SidebarState } from "@/components/ui/sidebar/enums/sidebar";
import { useSidebarKeyboard } from "@/components/ui/sidebar/hooks/use-keyboard";
import { useSidebarPersistence } from "@/components/ui/sidebar/hooks/use-persistence";
import { useIsMobile } from "@/hooks/use-mobile";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type SidebarContextValue = {
  sidebarState: SidebarState;
  open: boolean;
  isCollapsed: boolean;
  isExpanded: boolean;
  shouldShowCollapsed: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

const { Provider } = SidebarContext;

export type Props = ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const SidebarProvider: FC<Props> = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const { persistSidebarState, getSavedSidebarState } = useSidebarPersistence(SIDEBAR_CONFIG);

  // Internal state management - use saved state if available, otherwise use defaultOpen
  const [internalOpen, setInternalOpen] = useState(() => {
    const savedState = getSavedSidebarState();
    return savedState !== null ? savedState : defaultOpen;
  });
  const open = openProp ?? internalOpen;

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;

      if (setOpenProp) setOpenProp(openState);
      else setInternalOpen(openState);

      persistSidebarState(openState);
    },
    [setOpenProp, open, persistSidebarState]
  );

  /**
   * Toggle sidebar based on device type.
   */
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Handle keyboard shortcuts
  useSidebarKeyboard(SIDEBAR_CONFIG.keyboardShortcut, toggleSidebar);

  const sidebarState = useMemo<SidebarState>(
    () => (open ? SidebarState.EXPANDED : SidebarState.COLLAPSED),
    [open]
  );

  const isCollapsed = useMemo<boolean>(
    () => sidebarState === SidebarState.COLLAPSED,
    [sidebarState]
  );

  const isExpanded = useMemo<boolean>(() => sidebarState === SidebarState.EXPANDED, [sidebarState]);

  const shouldShowCollapsed = useMemo<boolean>(
    () => !isMobile && isCollapsed,
    [isMobile, isCollapsed]
  );

  const contextValue = useMemo<SidebarContextValue>(
    () => ({
      sidebarState,
      open,
      isCollapsed,
      isExpanded,
      shouldShowCollapsed,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [
      sidebarState,
      open,
      isCollapsed,
      isExpanded,
      shouldShowCollapsed,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    ]
  );

  return (
    <Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_CONFIG.width,
              "--sidebar-width-icon": SIDEBAR_CONFIG.widthIcon,
              ...style,
            } as CSSProperties
          }
          className={joinClasses(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className || ""
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");

  return context;
};
