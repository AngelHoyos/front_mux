import { useState } from "react";
import { axiosInstance } from "@/api/axiosInstance";

export interface VideoData {
  id: string;
  title: string;
  playbackId: string;
}

export function useVideos() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get<VideoData[]>("/videos");
      setVideos(res.data);
    } catch {
      setError("Error cargando videos");
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, error, fetchVideos };
}
