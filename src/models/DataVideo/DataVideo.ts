export interface VideoDataProps{
    title: string;
    video: File | null;
}

export interface Video {
  id: string;
  title: string;
  playback_ids: { id: string }[];
}

export interface VideosModalProps {
  videos: Video[];
  onClose: () => void;
  deleteVideo: (id: string) => void;
}
