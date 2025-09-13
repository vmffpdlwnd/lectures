// FILE: src/map/useRoadviewEffect.js
import { useEffect } from "react";
import { loadKakaoSdk } from "../map/kakaoLoader"; // ✅ 경로 수정 (./map/XXX 아님)

export function useRoadviewEffect(containerId = "roadview", coords) {
  useEffect(() => {
    if (!coords) return;

    (async () => {
      await loadKakaoSdk({ libraries: "services" });

      const { kakao } = window;
      const container = document.getElementById(containerId);
      if (!container) return;

      const roadview = new kakao.maps.Roadview(container);
      const roadviewClient = new kakao.maps.RoadviewClient();

      roadviewClient.getNearestPanoId(
        new kakao.maps.LatLng(coords.lat, coords.lng),
        50,
        function (panoId) {
          roadview.setPanoId(
            panoId,
            new kakao.maps.LatLng(coords.lat, coords.lng)
          );
        }
      );
    })();
  }, [coords, containerId]);
}
