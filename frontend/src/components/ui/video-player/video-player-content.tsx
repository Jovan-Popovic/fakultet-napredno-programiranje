import { forwardRef, type ComponentProps } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type VideoPlayerContentProps = ComponentProps<"video">;

export const VideoPlayerContent = forwardRef<HTMLVideoElement, VideoPlayerContentProps>(
  ({ className, ...props }, ref) => (
    <video ref={ref} className={joinClasses("mt-0 mb-0", className)} {...props} />
  )
);

VideoPlayerContent.displayName = "VideoPlayerContent";
