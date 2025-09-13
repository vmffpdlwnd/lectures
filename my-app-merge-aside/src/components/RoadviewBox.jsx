import { useEffect, useState } from "react";
import useRoadviewEffect from "../hooks/useRoadviewEffect";

export default function RoadviewBox({ coords }) {
  const [showRoadview, setShowRoadview] = useState(false);

  // 클릭 시 로드뷰 활성화
  useEffect(() => {
    const handleClick = () => setShowRoadview(true);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // ✅ 커스텀 훅으로 분리된 로드뷰 로직
  useRoadviewEffect(showRoadview, coords);

  return (
    <div
      id="roadview"
      style={{
        width: "100%",
        height: "300px",
        marginTop: 20,
        filter: showRoadview ? "none" : "blur(4px)",
        opacity: showRoadview ? 1 : 0.5,
        pointerEvents: showRoadview ? "auto" : "none",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {!showRoadview && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#555",
            fontSize: 14,
            background: "#ddd",
          }}
        >
          배경을 클릭하면 로드뷰가 표시됩니다.
        </div>
      )}
    </div>
  );
}
