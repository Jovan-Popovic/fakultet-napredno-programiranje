import { MediaSeekBackwardButton } from "media-chrome/react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<typeof MediaSeekBackwardButton>;
export const VideoPlayerSeekBackwardButton: FC<VideoPlayerSeekBackwardButtonProps> = ({
  className,
  ...props
}) => <MediaSeekBackwardButton className={joinClasses("p-2.5", className)} {...props} />;
