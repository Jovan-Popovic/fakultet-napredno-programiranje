import type { ComponentProps, FC } from "react";

import { useCarousel } from "@/components/ui/carousel/carousel-context";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

type CarouselItemProps = ComponentProps<"div">;

export const CarouselItem: FC<CarouselItemProps> = ({ className, ...props }) => {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={joinClasses(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
};
