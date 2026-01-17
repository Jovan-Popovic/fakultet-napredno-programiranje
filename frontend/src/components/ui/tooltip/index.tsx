import {
  Arrow as PopoverArrow,
  Content as PopoverContent,
  Portal as PopoverPortal,
  Root as PopoverRoot,
  Trigger as PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Arrow as TooltipArrow,
  Content as TooltipContent,
  Portal as TooltipPortal,
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
} from "@radix-ui/react-tooltip";
import type { FC, MouseEvent, PointerEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { tooltipSideMap } from "./constants/position";
import { TooltipPosition, TooltipTriggerEvent } from "./enums";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type Props = {
  className?: string;
  containerClassName?: string;
  content: string | ReactNode;
  position?: TooltipPosition;
  children?: ReactNode;
  trigger?: TooltipTriggerEvent;
  /** Extra classes for the trigger wrapper */
  childrenClassName?: string;
};

const baseClasses =
  "w-max max-w-[250px] px-2 py-1.5 text-xs text-black-1 dark:text-white bg-white dark:bg-gray-800 border dark:border-dark-1 rounded-md shadow-lg overflow-auto";

const preventTooltipHide = (e: MouseEvent | PointerEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

export const Tooltip: FC<Props> = ({
  content,
  className,
  containerClassName,
  position = TooltipPosition.TOP,
  children,
  trigger = TooltipTriggerEvent.HOVER,
  childrenClassName,
}) => {
  // Detect if the device has hover capability
  const [detectedTrigger, setDetectedTrigger] = useState<TooltipTriggerEvent>(
    TooltipTriggerEvent.HOVER
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    setDetectedTrigger(supportsHover ? TooltipTriggerEvent.HOVER : TooltipTriggerEvent.CLICK);
  }, []);

  // If device doesn't support hover, always use CLICK
  const actualTrigger = useMemo(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
      return TooltipTriggerEvent.CLICK;
    }

    return trigger ?? detectedTrigger;
  }, [trigger, detectedTrigger]);

  if (!content) return <>{children}</>;

  switch (actualTrigger) {
    case TooltipTriggerEvent.CLICK:
      return (
        <PopoverRoot>
          <PopoverTrigger asChild>
            <span
              className={joinClasses(
                "relative inline-flex items-center",
                className || "",
                childrenClassName || ""
              )}
            >
              {children}
            </span>
          </PopoverTrigger>

          <PopoverPortal container={document.getElementById("tooltip-root") ?? undefined}>
            <PopoverContent
              side={tooltipSideMap[position]}
              sideOffset={10}
              className={joinClasses(
                baseClasses,
                "max-h-[var(--radix-popover-content-available-height)]",
                containerClassName
              )}
              collisionPadding={8}
            >
              {content}
              <PopoverArrow className="fill-current text-white dark:text-gray-800" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      );

    case TooltipTriggerEvent.HOVER:
      return (
        <TooltipProvider delayDuration={100}>
          <TooltipRoot>
            <TooltipTrigger asChild>
              <span
                className={joinClasses(
                  "relative inline-flex items-center",
                  className || "",
                  childrenClassName || ""
                )}
                onPointerDown={preventTooltipHide}
                onClick={preventTooltipHide}
              >
                {children}
              </span>
            </TooltipTrigger>

            <TooltipPortal container={document.getElementById("tooltip-root") ?? undefined}>
              <TooltipContent
                side={tooltipSideMap[position]}
                sideOffset={10}
                className={joinClasses(
                  baseClasses,
                  "max-h-[var(--radix-tooltip-content-available-height)]",
                  containerClassName
                )}
                collisionPadding={8}
              >
                {content}
                <TooltipArrow className="fill-current text-white dark:text-gray-800" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </TooltipProvider>
      );
  }
};
