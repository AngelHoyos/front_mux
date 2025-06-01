import MuxPlayer from "@mux/mux-player-react";

export const Player = ({
  playbackId,
  title,
}: {
  playbackId: string;
  title: string;
}) => {
  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      metadata={{
        video_title: title,
        viewer_user_id: "user-id-opcional", // puedes incluir esto si quieres tracking
      }}
      style={{ width: "100%", height: "360px" }}
    />
  );
};
