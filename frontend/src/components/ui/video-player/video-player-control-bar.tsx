import { MediaControlBar } from "media-chrome/react";
import type { ComponentProps, FC } from "react";

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const VideoPlayerControlBar: FC<VideoPlayerControlBarProps> = (props) => (
  <MediaControlBar {...props} />
);
