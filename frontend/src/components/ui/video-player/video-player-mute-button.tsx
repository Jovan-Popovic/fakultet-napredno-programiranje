import { MediaMuteButton } from "media-chrome/react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;
export const VideoPlayerMuteButton: FC<VideoPlayerMuteButtonProps> = ({ className, ...props }) => (
  <MediaMuteButton className={joinClasses("p-2.5", className)} {...props} />
);
