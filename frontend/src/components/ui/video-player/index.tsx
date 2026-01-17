import { forwardRef, type VideoHTMLAttributes } from "react";

import { VideoPlayerContent } from "@/components/ui/video-player/video-player-content";
import { VideoPlayerControlBar } from "@/components/ui/video-player/video-player-control-bar";
import { VideoPlayerController } from "@/components/ui/video-player/video-player-controller";
import { VideoPlayerMuteButton } from "@/components/ui/video-player/video-player-mute-button";
import { VideoPlayerPlayButton } from "@/components/ui/video-player/video-player-play-button";
import { VideoPlayerSeekBackwardButton } from "@/components/ui/video-player/video-player-seek-backward-button";
import { VideoPlayerSeekForwardButton } from "@/components/ui/video-player/video-player-seek-forward-button";
import { VideoPlayerTimeDisplay } from "@/components/ui/video-player/video-player-time-display";
import { VideoPlayerTimeRange } from "@/components/ui/video-player/video-player-time-range";
import { VideoPlayerVolumeRange } from "@/components/ui/video-player/video-player-volume-range";

type Props = VideoHTMLAttributes<HTMLVideoElement>;

export const VideoPlayer = forwardRef<HTMLVideoElement, Props>((props, ref) => {
  return (
    <VideoPlayerController className="overflow-hidden rounded-lg border">
      <VideoPlayerContent
        crossOrigin=""
        muted
        preload="auto"
        slot="media"
        {...props}
        ref={ref}
        controls={false}
      />
      <VideoPlayerControlBar>
        <VideoPlayerPlayButton />
        <VideoPlayerSeekBackwardButton />
        <VideoPlayerSeekForwardButton />
        <VideoPlayerTimeRange />
        <VideoPlayerTimeDisplay showDuration />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
      </VideoPlayerControlBar>
    </VideoPlayerController>
  );
});

VideoPlayer.displayName = "VideoPlayer";
