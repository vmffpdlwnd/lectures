// src/components/MapDetailPanel.jsx
import React, { useState } from "react";
import { useRoadviewEffect } from "../hooks/useRoadviewEffect";

export default function MapDetailPanel({ detail }) {
  const [blurred, setBlurred] = useState(true);

  // detail이 없을 경우를 대비해서 coords 초기화
  const coords = detail?.coords || null;

  // ✅ 무조건 호출되도록 위치 고정
  useRoadviewEffect("roadview", blurred ? null : coords);

  if (!detail) return null;

  const { type, title, subtitle, data } = detail;

  const handleClick = () => setBlurred(false);

  const Section = ({ title, children }) => (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
        {title}
      </div>
      {children}
    </div>
  );

  return (
    <div
      style={{
        marginTop: 12,
        padding: "14px 16px",
        border: "1px solid #eee",
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        background: "#fff",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800 }}>{title}</div>

      {subtitle && (
        <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
          {subtitle}
        </div>
      )}

      {/* 건물 상세 안내 */}
      {type === "building" && data && (
        <>
          {data.alias && (
            <div style={{ marginTop: 8, fontSize: 13, color: "#444" }}>
              별칭: {data.alias}
            </div>
          )}
          {Array.isArray(data.floors) && data.floors.length > 0 && (
            <Section title="층별 안내">
              <ul style={{ margin: 0, paddingInlineStart: 18 }}>
                {data.floors.map((f) => (
                  <li key={f.floor} style={{ marginBottom: 4 }}>
                    <b>{f.floor}</b> :{" "}
                    {Array.isArray(f.rooms) ? f.rooms.join(", ") : f.rooms}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </>
      )}

      {/* 로드뷰 */}
      {coords && (
        <div
          id="roadview"
          onClick={handleClick}
          style={{
            marginTop: 12,
            width: "100%",
            height: 200,
            borderRadius: 8,
            overflow: "hidden",
            position: "relative",
            cursor: blurred ? "pointer" : "default",
            filter: blurred ? "blur(3px) brightness(0.8)" : "none",
          }}
        >
          {blurred && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: 14,
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "6px 12px",
                borderRadius: 4,
              }}
            >
              클릭하면 로드뷰가 나타납니다
            </div>
          )}
        </div>
      )}

      {/* 좌표 출력 */}
      {coords && (
        <div style={{ fontSize: 11, color: "#888", marginTop: 10 }}>
          lat: {coords.lat}, lng: {coords.lng}
        </div>
      )}
    </div>
  );
}
