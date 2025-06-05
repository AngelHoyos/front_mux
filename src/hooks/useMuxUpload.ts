import { useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/api/axiosInstance";

type UploadResponse = {
  id: string;
  url: string;
};

export function useMuxUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playbackId, setPlaybackId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const getUploadUrl = async (): Promise<UploadResponse> => {
    try {
      const res = await axiosInstance.post<UploadResponse>("/upload", {});
      return res.data;
    } catch {
      throw new Error("Error al obtener URL de upload");
    }
  };

  const uploadToMux = async (file: File, uploadUrl: string) => {
    try {
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          }
        },
      });
    } catch {
      throw new Error("Error subiendo el video a Mux");
    }
  };

  const uploadVideo = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const { id, url } = await getUploadUrl();
      await uploadToMux(file, url);
      setPlaybackId(id);
      return id;
    } catch (e: any) {
      setError(e.message || "Error desconocido");
      throw e;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, error, progress, playbackId, uploadVideo };
}
