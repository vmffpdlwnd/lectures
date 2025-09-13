// FILE: src/map/useKakaoMap.js
import { useEffect, useRef, useState } from "react";
import { loadKakaoSdk } from "./kakaoLoader";
import { MAP_CENTER, DEFAULT_LEVEL } from "../utils/constants"; // ✅ 경로 수정

// Kakao Map 생성/참조 + relayout 제공 훅
export function useKakaoMap({
  activeTab,
  containerId = "map",
  center = MAP_CENTER,
  level = DEFAULT_LEVEL,
}) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const infoRef = useRef(null);
  const lastCenterRef = useRef(center);
  const [ready, setReady] = useState(false);

  // 최초 생성 + 재진입 시 SDK 보장
  useEffect(() => {
    let canceled = false;

    (async () => {
      await loadKakaoSdk({ libraries: "services" });

      if (canceled) return;

      const { kakao } = window;
      const container = document.getElementById(containerId);
      if (!container || !kakao) return;

      // 이미 만들어졌으면 ready만 true
      if (mapRef.current) {
        setReady(true);
        return;
      }

      // 최초 생성
      const map = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level,
      });
      mapRef.current = map;
      setReady(true);

      // 이동 후 중심 저장
      kakao.maps.event.addListener(map, "moveend", () => {
        const c = map.getCenter();
        lastCenterRef.current = { lat: c.getLat(), lng: c.getLng() };
      });
    })();

    return () => {
      canceled = true;
    };
  }, [containerId, center.lat, center.lng, level]);

  // 🔧 외부에서 호출할 수 있는 relayout
  const relayout = () => {
    const { kakao } = window;
    const map = mapRef.current;
    if (!map || !kakao) return;

    map.relayout(); // 컨테이너 보임/크기 변경 반영

    const c = lastCenterRef.current || MAP_CENTER;
    map.setCenter(new kakao.maps.LatLng(c.lat, c.lng));
  };

  // 탭이 "map"으로 돌아올 때 자동 복구(안전망)
  useEffect(() => {
    if (activeTab === "map" && ready) {
      // 레이아웃 반영은 다음 프레임이 안전
      requestAnimationFrame(() => relayout());
    }
  }, [activeTab, ready]);

  // 윈도 리사이즈 시에도 안전하게 복구
  useEffect(() => {
    const onResize = () => relayout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { mapRef, markerRef, infoRef, lastCenterRef, ready, relayout };
}
