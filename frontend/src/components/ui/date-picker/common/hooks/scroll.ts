import { useEffect } from "react";

/**
 * Enables page scrolling when a fixed-position popover extends beyond the viewport.
 *
 * This hook addresses a limitation with Radix UI's portaled popovers:
 * - Portaled content uses position: fixed, which doesn't extend document height
 * - When the popover overflows the viewport, users can't scroll to see it
 * - This hook adds a temporary spacer element to make the page scrollable
 *
 * @param isOpen - Whether the popover is currently open
 * @param contentSelector - CSS selector for the popover content element
 */
export const usePopoverScroll = (
  isOpen: boolean,
  contentSelector = '[data-slot="popover-content"]'
) => {
  useEffect(() => {
    if (!isOpen) return;

    const enableScrollIfNeeded = () => {
      const popoverContent = document.querySelector(contentSelector);
      if (!popoverContent) return;

      const rect = popoverContent.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const overflow = rect.bottom - viewportHeight;

      if (overflow > 0) {
        const documentHeight = document.documentElement.scrollHeight;
        const currentScroll = window.scrollY;
        const availableScroll = documentHeight - viewportHeight - currentScroll;

        // Only add spacer if overflow is needed to make it fit
        const additionalSpaceNeeded = overflow - availableScroll + 20;

        if (additionalSpaceNeeded > 0) {
          const spacer = document.createElement("div");
          spacer.id = "popover-scroll-spacer";
          spacer.style.height = `${additionalSpaceNeeded}px`;
          spacer.style.pointerEvents = "none";
          spacer.setAttribute("aria-hidden", "true");
          document.body.appendChild(spacer);
        }
      }
    };

    // time for popover to render and position itself
    const timeoutId = setTimeout(enableScrollIfNeeded, 100);

    return () => {
      clearTimeout(timeoutId);
      const spacer = document.getElementById("popover-scroll-spacer");
      spacer?.remove();
    };
  }, [isOpen, contentSelector]);
};
