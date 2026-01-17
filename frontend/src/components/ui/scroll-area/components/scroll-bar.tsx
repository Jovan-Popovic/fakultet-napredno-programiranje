import { ScrollAreaScrollbar, ScrollAreaThumb } from "@radix-ui/react-scroll-area";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/utils/css";

const { mergeClasses } = classNameManager;

export type Props = ComponentProps<typeof ScrollAreaScrollbar> & {
  className?: string;
  orientation?: "vertical" | "horizontal";
};

export const ScrollBar: FC<Props> = ({ className, orientation = "vertical", ...props }) => {
  return (
    <ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={mergeClasses(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaScrollbar>
  );
};
