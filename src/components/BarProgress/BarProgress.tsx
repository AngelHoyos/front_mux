import React from "react";
import { type BarProgressProps } from "@/models/BarProgress/BarProgress";

export const BarProgress: React.FC<BarProgressProps> = ({ progress }) => {
  const validProgress = Math.min(Math.max(progress, 0), 100);
  return (
    <div
      style={{
        width: "100%",
        height: "20px",
        backgroundColor: "#e0e0e0",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${validProgress}%`,
          backgroundColor: "#5114A6", 
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  );
};
