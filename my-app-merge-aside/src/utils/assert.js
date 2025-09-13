// 좌표 유효성 검사 유틸

/** 좌표 객체가 {lat: number, lng: number} 형태인지 */
export function isLatLng(coord) {
  return (
    !!coord &&
    typeof coord === "object" &&
    Number.isFinite(coord.lat) &&
    Number.isFinite(coord.lng)
  );
}

/** 유효하지 않으면 에러를 던짐 (핸들러/유틸 내부에서 사용) */
export function requireLatLng(coord, label = "coord") {
  if (!isLatLng(coord)) {
    throw new Error(
      `[assert] invalid lat/lng for ${label}: ${JSON.stringify(coord)}`
    );
  }
  return coord;
}
