import { MediaTimeDisplay } from "media-chrome/react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type VideoPlayerTimeDisplayProps = ComponentProps<typeof MediaTimeDisplay>;
export const VideoPlayerTimeDisplay: FC<VideoPlayerTimeDisplayProps> = ({
  className,
  ...props
}) => <MediaTimeDisplay className={joinClasses("p-2.5", className)} {...props} />;
