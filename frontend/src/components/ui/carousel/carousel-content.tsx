import type { ComponentProps, FC } from "react";

import { useCarousel } from "@/components/ui/carousel/carousel-context";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type CarouselContentProps = ComponentProps<"div">;

export const CarouselContent: FC<CarouselContentProps> = ({ className, children, ...props }) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={joinClasses(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
