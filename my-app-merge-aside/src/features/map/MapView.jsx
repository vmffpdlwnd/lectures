// src/features/map/MapView.jsx
import React from "react";

export default function MapView({
  id = "map",
  height = 500,
  className,
  style,
}) {
  return (
    <div
      id={id}
      className={className}
      style={{ width: "100%", height, ...(style || {}) }}
    />
  );
}
