import { useState } from "react";
import { axiosInstance } from "@/api/axiosInstance";
import { type Video } from "@/models/DataVideo/DataVideo";


export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get<Video[]>("/videos");
      setVideos(res.data);
    } catch {
      setError("Error cargando videos");
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, error, fetchVideos };
}
