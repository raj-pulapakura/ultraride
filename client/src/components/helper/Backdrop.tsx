import React from "react";

interface BackdropProps {}

export const Backdrop: React.FC<BackdropProps> = ({}) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.65)",
      }}
    ></div>
  );
};
