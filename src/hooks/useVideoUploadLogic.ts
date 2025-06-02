import { useState } from "react";
import { useMuxUpload } from "@/hooks/useMuxUpload";
import { useVideos } from "@/hooks/useVideos";
import type { VideoDataProps } from "@/models/DataVideo/DataVideo";

export const useVideoUploadLogic = () => {
  const [videoData, setVideoData] = useState<VideoDataProps>({
    title: "",
    video: null,
  });
  const [search, setSearch] = useState("");
  const { uploading, error, playbackId, uploadVideo } = useMuxUpload();
  const { videos, loading, error: videosError, fetchVideos } = useVideos();

  const handleUpload = async () => {
    if (!videoData.video || !videoData.title.trim()) {
      alert("Debes ingresar un título y seleccionar un video");
      return;
    }
    try {
      const id = await uploadVideo(videoData.video);
      alert("Video subido correctamente con playbackId: " + id);
      setVideoData({ title: "", video: null });
      fetchVideos();
    } catch {
      // Error ya manejado en useMuxUpload
    }
  };

  return {
    videoData,
    setVideoData,
    search,
    setSearch,
    uploading,
    error,
    playbackId,
    videos,
    loading,
    videosError,
    fetchVideos,
    handleUpload,
  };
};
