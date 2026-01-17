import { MediaPlayButton } from "media-chrome/react";
import type { ComponentProps, FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;
export const VideoPlayerPlayButton: FC<VideoPlayerPlayButtonProps> = ({ className, ...props }) => (
  <MediaPlayButton className={joinClasses("p-2.5", className)} {...props} />
);
