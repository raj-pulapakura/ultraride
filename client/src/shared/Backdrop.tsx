import React from "react";

interface BackdropProps {
  onClick?: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.65)",
        zIndex: 2,
      }}
      onClick={onClick}
    ></div>
  );
};
