import { ArrowLeft, ArrowRight } from "lucide-react";
import { type ComponentProps, type FC } from "react";

import { useCarousel } from "@/components/ui/carousel/carousel-context";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

type CarouselArrowProps = ComponentProps<"button"> & {
  direction: "prev" | "next";
};

export const CarouselArrow: FC<CarouselArrowProps> = ({ direction, className, ...props }) => {
  const { orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const isPrev = direction === "prev";

  const dataSlot = isPrev ? "carousel-previous" : "carousel-next";
  const onClick = isPrev ? scrollPrev : scrollNext;
  const disabled = isPrev ? !canScrollPrev : !canScrollNext;

  const positionClass =
    orientation === "horizontal"
      ? isPrev
        ? "top-1/2 -left-12 -translate-y-1/2"
        : "top-1/2 -right-12 -translate-y-1/2"
      : isPrev
        ? "-top-12 left-1/2 -translate-x-1/2 rotate-90"
        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90";

  return (
    <button
      data-slot={dataSlot}
      className={joinClasses(
        "absolute flex size-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 p-0",
        positionClass,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {isPrev ? (
        <ArrowLeft className="h-4 w-4 text-black dark:text-white" />
      ) : (
        <ArrowRight className="h-4 w-4 text-black dark:text-white" />
      )}
    </button>
  );
};
