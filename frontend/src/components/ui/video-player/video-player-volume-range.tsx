import { MediaVolumeRange } from "media-chrome/react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type VideoPlayerVolumeRangeProps = ComponentProps<typeof MediaVolumeRange>;
export const VideoPlayerVolumeRange: FC<VideoPlayerVolumeRangeProps> = ({
  className,
  ...props
}) => <MediaVolumeRange className={joinClasses("p-2.5", className)} {...props} />;
