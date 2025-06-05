import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  playbackId: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playbackId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const hls = new Hls();
    const hlsUrl = `https://stream.mux.com/${playbackId}.m3u8`;

    hls.loadSource(hlsUrl);
    hls.attachMedia(videoRef.current);

    hls.on(Hls.Events.ERROR, function (_, data) {
      if (data.fatal) {
        console.error("Fatal HLS error:", data);
        hls.destroy();
      }
    });

    return () => {
      hls.destroy();
    };
  }, [playbackId]);

  return <video ref={videoRef} controls className="w-full h-full" />;
};

export default VideoPlayer;
