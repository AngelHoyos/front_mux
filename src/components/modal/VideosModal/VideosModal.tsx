import React, { useState, useMemo, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { type VideosModalProps } from "@/models/DataVideo/DataVideo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const VideosModal: React.FC<VideosModalProps> = ({
  videos,
  onClose,
  deleteVideo,
}) => {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const filteredVideos = useMemo(() => {
    return videos.filter((v) =>
      v.playback_ids?.some((pid) =>
        pid.id.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, videos]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col p-6 relative shadow-lg transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-2xl leading-none "
          aria-label="Cerrar modal"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-2xl font-semibold mb-5">Lista de Videos</h2>

        <input
          type="text"
          placeholder="Buscar video..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-gray-500"
          autoFocus
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-1">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => {
              if (!video.playback_ids?.length) return null;
              const playbackId = video.playback_ids[0].id;

              return (
                <div
                  key={video.id}
                  className="relative border border-gray-300 rounded-lg p-3 cursor-default hover:shadow-md transition-shadow bg-gray-50 group" // <-- aquí agregas "group"
                >
                  <div className="w-full aspect-video rounded overflow-hidden mb-3">
                    <VideoPlayer
                      playbackId={playbackId}
                      autoplay={false}
                      controls={false}
                      muted
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteVideo(video.id);
                    }}
                    className="absolute text-xl top-0 right-0 text-red-600 rounded-full w-7 h-7 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Eliminar video ${video.title}`}
                    title="Eliminar video"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No se encontraron videos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
