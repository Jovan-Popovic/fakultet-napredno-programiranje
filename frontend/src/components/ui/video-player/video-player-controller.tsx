import { MediaController } from "media-chrome/react";
import type { ComponentProps, CSSProperties, FC } from "react";

export type VideoPlayerProps = ComponentProps<typeof MediaController>;

const variables = {
  "--media-primary-color": "var(--primary)",
  "--media-secondary-color": "var(--background)",
  "--media-background-color": "var(--background)",
  "--media-control-hover-background": "var(--accent)",
  "--media-range-track-background": "var(--border)",
} as CSSProperties;

export const VideoPlayerController: FC<VideoPlayerProps> = ({ style, ...props }) => (
  <MediaController
    style={{
      ...variables,
      ...style,
    }}
    {...props}
  />
);
