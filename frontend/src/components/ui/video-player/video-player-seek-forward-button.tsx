import { MediaSeekForwardButton } from "media-chrome/react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type VideoPlayerSeekForwardButtonProps = ComponentProps<typeof MediaSeekForwardButton>;
export const VideoPlayerSeekForwardButton: FC<VideoPlayerSeekForwardButtonProps> = ({
  className,
  ...props
}) => <MediaSeekForwardButton className={joinClasses("p-2.5", className)} {...props} />;
