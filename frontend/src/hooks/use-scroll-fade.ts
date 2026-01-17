import { useEffect, useRef, useState, type DependencyList } from "react";

/**
 * Hook to detect when a scrollable container should show a fade effect.
 *
 * Returns a ref to attach to the scroll container and a boolean indicating
 * whether the fade should be visible. The fade will only show when:
 * - The content is scrollable (height exceeds container)
 * - The user has not scrolled to the bottom
 *
 * @param dependencies - Array of dependencies to re-check scroll state when they change
 * @returns Object containing scrollRef (for the container) and showFade (boolean)
 *
 * @example
 * const { scrollRef, showFade } = useScrollFade([data]);
 *
 * <div
 *   ref={scrollRef}
 *   className={cn(
 *     "overflow-y-auto max-h-80",
 *     showFade && "[mask-image:linear-gradient(to_bottom,black_calc(100%-3rem),transparent)]"
 *   )}
 * >
 *   {data.map(item => <Item key={item.id} {...item} />)}
 * </div>
 */
export const useScrollFade = (dependencies: DependencyList = []) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrollable = scrollHeight > clientHeight;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

      setShowFade(isScrollable && !isAtBottom);
    };

    checkScroll();
    scrollContainer.addEventListener("scroll", checkScroll);

    return () => scrollContainer.removeEventListener("scroll", checkScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { scrollRef, showFade };
};
