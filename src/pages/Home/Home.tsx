// pages/Home.tsx
import { useState } from "react";
import { UploadFormVideoComponent } from "../../components/UploadFormVIdeo/UploadFormVIdeo";
import { Player } from "../../components/VideoPlayer/VideoPlayer";

export const Home = () => {
  const [playbackId, setPlaybackId] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div>
      <h1>Sube tu video</h1>
      <UploadFormVideoComponent
        onUpload={(id) => {
          setPlaybackId(id);
          setTitle("Título del video");
        }}
      />
      {playbackId && <Player playbackId={playbackId} title={title} />}
    </div>
  );
};
