import { MediaTimeRange } from "media-chrome/react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;
export const VideoPlayerTimeRange: FC<VideoPlayerTimeRangeProps> = ({ className, ...props }) => (
  <MediaTimeRange className={joinClasses("p-2.5", className)} {...props} />
);
