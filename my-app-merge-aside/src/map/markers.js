// src/map/markers.js
import { isLatLng } from "../utils/assert";

export function clearMarkerAndInfo(markerRef, infoRef) {
  // ✅ 마커(단일/배열) 모두 안전하게 제거
  if (markerRef?.current) {
    if (Array.isArray(markerRef.current)) {
      markerRef.current.forEach((m) => m && m.setMap && m.setMap(null));
    } else {
      markerRef.current.setMap?.(null);
    }
    markerRef.current = null;
  }
  // ✅ 인포윈도우(단일/배열) 모두 안전하게 제거
  if (infoRef?.current) {
    if (Array.isArray(infoRef.current)) {
      infoRef.current.forEach((i) => i && i.close && i.close());
    } else {
      infoRef.current.close?.();
    }
    infoRef.current = null;
  }
}

/**
 * 마커 1개
 */
export function dropMarker({
  map,
  markerRef,
  infoRef,
  lat,
  lng,
  label,
  image, // optional kakao.maps.MarkerImage
  onClick, // optional ({lat,lng,label}) => void
}) {
  const { kakao } = window;
  const pos = new kakao.maps.LatLng(lat, lng);

  const markerOptions = { position: pos, map };
  if (image) markerOptions.image = image;

  const marker = new kakao.maps.Marker(markerOptions);
  markerRef.current = marker;

  const info = new kakao.maps.InfoWindow({
    position: pos,
    content: `<div style="padding:6px 10px;font-size:12px;white-space:nowrap;">${label}</div>`,
  });
  info.open(map, marker);
  infoRef.current = info;

  if (typeof onClick === "function") {
    kakao.maps.event.addListener(marker, "click", () => {
      onClick({ lat, lng, label });
    });
  }

  return { marker, info, pos };
}

/**
 * ✅ 마커 여러 개
 * points: [{ lat, lng, label }]
 */
export function dropMarkers({ map, markerRef, infoRef, points, onClick }) {
  const { kakao } = window;
  const markers = [];
  const infos = [];

  points.forEach(({ lat, lng, label }) => {
    const pos = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({ position: pos, map });
    const info = new kakao.maps.InfoWindow({
      position: pos,
      content: `<div style="padding:6px 10px;font-size:12px;white-space:nowrap;">${label}</div>`,
    });
    info.open(map, marker);

    if (typeof onClick === "function") {
      kakao.maps.event.addListener(marker, "click", () =>
        onClick({ lat, lng, label })
      );
    }

    markers.push(marker);
    infos.push(info);
  });

  markerRef.current = markers;
  infoRef.current = infos;

  return { markers, infos };
}

// 좌표 검증
export function isValidCoord(coord) {
  return isLatLng(coord);
}
