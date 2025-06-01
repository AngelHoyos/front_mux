import { UploadFormVideo } from "../../Hook/UploadFormVideo/UploadFormVideo.hook";
import { type VideoDataProps } from "../../models/DataVideo/DataVideo";

const initialValues: VideoDataProps = {
  title: "",
  video: null,
};

export const UploadFormVideoComponent = ({ onUpload }: { onUpload: (playbackId: string) => void }) => {
  const {
    values,
    handleChange,
    handleSubmit,
    isSubmiting,
  } = UploadFormVideo(initialValues);

  const handleFormSubmit = async () => {
    if (!values.video) {
      console.error("No se seleccionó ningún video");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("video", values.video);

    const res = await fetch("http://localhost:8080/api/upload-video", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Error al subir el video");
      return;
    }

    const data = await res.json();
    onUpload(data.playbackId); // esto viene del backend
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleFormSubmit);
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="Título del video"
        value={values.title}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        name="video"
        accept="video/*"
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={isSubmiting}>
        {isSubmiting ? "Subiendo..." : "Subir Video"}
      </button>
    </form>
  );
};
