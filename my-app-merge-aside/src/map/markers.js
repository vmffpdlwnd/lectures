// src/map/markers.js
import { isLatLng } from "../utils/assert";

export function clearMarkerAndInfo(markerRef, infoRef) {
  if (markerRef?.current) {
    markerRef.current.setMap(null);
    markerRef.current = null;
  }
  if (infoRef?.current) {
    infoRef.current.close();
    infoRef.current = null;
  }
}

/**
 * 마커 1개를 찍고 인포윈도우를 띄웁니다.
 * onClick 콜백을 넘기면 마커 클릭 시 호출됩니다.
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

  // ✅ 마커 클릭 시 콜백 실행
  if (typeof onClick === "function") {
    kakao.maps.event.addListener(marker, "click", () => {
      onClick({ lat, lng, label });
    });
  }

  return { marker, info, pos };
}

// handlers에서 쓰는 좌표 검증 헬퍼
export function isValidCoord(coord) {
  return isLatLng(coord);
}
