import React, { useEffect, useState } from "react";
import { useVideoUploadLogic } from "@/hooks/useVideoUploadLogic";
import { BarProgress } from "../BarProgress/BarProgress";
import { VideosModal } from "../modal/VideosModal/VideosModal";

export const VideoManagerPage: React.FC = () => {
  const {
    videoData,
    setVideoData,
    uploading,
    handleUpload,
    error,
    videos,
    fetchVideos,
    progress,
    deleteVideo,
  } = useVideoUploadLogic();

  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="p-6   max-w-2xl mx-autopace-y-6">
      {/* Título principal */}
      <h2 className="text-3xl font-bold text-gray-800">Subir video</h2>

      {/* Card de subida */}
      <div className=" p-5 rounded-lg  space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Título del video"
            value={videoData.title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-2 px-4 rounded text-white font-semibold transition-colors ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-black"
          }`}
        >
          {uploading ? "Subiendo..." : "Subir video"}
        </button>

        {uploading && (
          <div className="mt-4">
            <BarProgress progress={progress} />
            <p className="text-sm text-center text-gray-600 mt-2">
              {progress}% completado
            </p>
          </div>
        )}

        {/* Enlace a la lista de videos debajo del botón y progreso */}
        <div className="text-center mt-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className="text-black text-[.95rem] hover:underline hover:decoration-black"
          >
            Lista de videos
          </a>
        </div>
      </div>

      {/* Modal de videos */}
      {modalOpen && (
        <VideosModal
          videos={videos}
          onClose={() => setModalOpen(false)}
          deleteVideo={deleteVideo}
        />
      )}
    </div>
  );
};
