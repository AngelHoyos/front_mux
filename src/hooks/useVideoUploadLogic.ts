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
  const { uploading, error, playbackId, uploadVideo, progress } =
    useMuxUpload();
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

  const deleteVideo = async (id: string) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este video?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/videos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el video");
      }

      // Actualiza la lista después de borrar
      await fetchVideos();
      alert("Video eliminado correctamente");
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el video. Intenta nuevamente.");
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
    progress,
    videos,
    loading,
    videosError,
    fetchVideos,
    handleUpload,
    deleteVideo, // <-- Exportamos la función aquí
  };
};
