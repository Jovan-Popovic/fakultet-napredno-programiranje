import { useCallback, useEffect, useRef } from "react";

const isOverPortal = (target: HTMLElement): boolean => {
  return !!(
    target.closest('[data-slot="popover-content"]') || target.closest('[data-slot="dropdown-menu"]')
  );
};

const canScrollContainer = (container: HTMLDivElement) => {
  const canScrollDown = container.scrollTop < container.scrollHeight - container.clientHeight;
  const canScrollUp = container.scrollTop > 0;

  return { canScrollDown, canScrollUp };
};

/**
 * Hook to enable scrolling of a container even when interacting with portal elements.
 *
 * This solves the issue where popovers, dropdowns, and other portalled elements render
 * outside the scroll container's DOM hierarchy, preventing scroll events from reaching
 * the container. This hook captures both wheel events (desktop) and touch events (mobile)
 * globally and manually scrolls the container when the user is interacting with portal elements.
 *
 * @returns A ref to attach to the scrollable container element
 *
 * @example
 * const scrollContainerRef = usePortalScroll();
 *
 * <div
 *   ref={scrollContainerRef}
 *   className="overflow-y-auto"
 * >
 *   <Popover>...</Popover>
 *   <DropdownMenu>...</DropdownMenu>
 * </div>
 */
export const usePortalScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  const handleWheel = useCallback((event: WheelEvent) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const target = event.target as HTMLElement;
    if (!isOverPortal(target)) return;

    const { canScrollDown, canScrollUp } = canScrollContainer(scrollContainer);

    if ((event.deltaY > 0 && canScrollDown) || (event.deltaY < 0 && canScrollUp)) {
      scrollContainer.scrollTop += event.deltaY;
      event.preventDefault();
    }
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const target = event.target as HTMLElement;
    if (isOverPortal(target)) {
      touchStartY.current = event.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const target = event.target as HTMLElement;
    if (!isOverPortal(target)) return;

    const touchY = event.touches[0].clientY;
    const deltaY = touchStartY.current - touchY;

    const { canScrollDown, canScrollUp } = canScrollContainer(scrollContainer);

    if ((deltaY > 0 && canScrollDown) || (deltaY < 0 && canScrollUp)) {
      scrollContainer.scrollTop += deltaY;
      touchStartY.current = touchY;
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchMove, handleTouchStart, handleWheel]);

  return scrollContainerRef;
};
