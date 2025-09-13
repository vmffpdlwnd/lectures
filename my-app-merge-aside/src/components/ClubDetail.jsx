// FILE: src/components/ClubDetail.jsx
import React from "react";

export default function ClubDetail({ club, onBack }) {
  if (!club) return null;

  return (
    <div
      style={{
        padding: 20,
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: 12,
          border: "1px solid #ddd",
          background: "#f9f9f9",
          padding: "6px 10px",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        ← 분과로 돌아가기
      </button>

      <h2 style={{ margin: "8px 0 12px" }}>{club.name}</h2>

      {/* ✅ 소리아리 같은 커스텀 콘텐츠 우선 표시 */}
      {club.custom ? (
        <div>{club.custom}</div>
      ) : (
        <>
          <p style={{ color: "#666", marginBottom: 12 }}>
            {club.desc || "동아리 소개가 준비 중입니다."}
          </p>
          {club.image && (
            <img
              src={club.image}
              alt={club.name}
              style={{ width: "100%", maxWidth: 640, borderRadius: 10 }}
            />
          )}
        </>
      )}
    </div>
  );
}
