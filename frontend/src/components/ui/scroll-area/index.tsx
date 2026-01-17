import { Corner, Root, Viewport } from "@radix-ui/react-scroll-area";
import type { ComponentProps, FC } from "react";

import { ScrollBar } from "./components/scroll-bar";

import { classNameManager } from "@/utils/css";

const { mergeClasses } = classNameManager;

export type Props = ComponentProps<typeof Root> & {
  className?: string;
};

export const ScrollArea: FC<Props> = ({ className, children, ...props }) => {
  return (
    <Root data-slot="scroll-area" className={mergeClasses("relative", className)} {...props}>
      <Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  );
};
