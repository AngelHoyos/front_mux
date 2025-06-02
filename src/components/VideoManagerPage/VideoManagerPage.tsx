import React, { useEffect } from "react";
import { useVideoUploadLogic } from "@/hooks/useVideoUploadLogic";

export const VideoUploadForm: React.FC = () => {
  const {
    videoData,
    setVideoData,
    uploading,
    handleUpload,
    error,
    videos,
    loading,
    videosError,
    fetchVideos,
  } = useVideoUploadLogic();

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoData((prev) => ({ ...prev, video: file }));
  };

  return (
    <div className="p-4 border rounded-md max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Subir Video</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Título del video"
        value={videoData.title}
        onChange={handleTitleChange}
        className="w-full px-3 py-2 border rounded"
      />

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="w-full"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-2 px-4 rounded text-white ${
          uploading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {uploading ? "Subiendo..." : "Subir video"}
      </button>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold">Lista de Videos</h3>

      {loading && <p>Cargando videos...</p>}
      {videosError && (
        <p className="text-red-600 font-medium">{videosError}</p>
      )}

      <div className="grid gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border p-4 rounded shadow-md space-y-2 bg-white"
          >
            <h4 className="font-semibold">{video.title}</h4>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://stream.mux.com/${video.playbackId}.m3u8`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
