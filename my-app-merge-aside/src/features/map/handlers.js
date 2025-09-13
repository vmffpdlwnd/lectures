// src/features/map/handlers.js
import { BUILDINGS } from "../../data/buildings";
import { FACILITIES } from "../../data/facilities";
import {
  clearMarkerAndInfo,
  dropMarker,
  isValidCoord,
} from "../../map/markers";
import { getBuildingDetail } from "../../data/buildingDetails";
/**
 * 빌딩 선택 핸들러 팩토리
 * @param {{
 *   mapRef: React.RefObject,
 *   markerRef: React.RefObject,
 *   infoRef: React.RefObject,
 *   ready?: boolean,
 *   onDetail?: (detail: {type:string,title:string,subtitle?:string,coords:{lat:number,lng:number}}) => void
 * }} deps
 */
export function makeHandleSelectBuilding({
  mapRef,
  markerRef,
  infoRef,
  ready = true,
  onDetail,
}) {
  return (name) => {
    if (!ready) return;
    const map = mapRef.current;
    if (!map) return;

    const coord = BUILDINGS[name];
    if (!coord) {
      console.warn(`좌표 없음: ${name}`);
      return;
    }

    const detail = {
      type: "building",
      title: name,
      subtitle: "건물",
      coords: coord,
      data: getBuildingDetail(name),
    };

    clearMarkerAndInfo(markerRef, infoRef);
    const { pos } = dropMarker({
      map,
      markerRef,
      infoRef,
      lat: coord.lat,
      lng: coord.lng,
      label: name,
      // ✅ 마커 클릭 시 상세 패널 갱신
      onClick: () => onDetail && onDetail(detail),
    });

    // 선택 즉시 패널도 띄우고 싶다면 아래 주석 해제
    // onDetail && onDetail(detail);

    map.panTo(pos);
  };
}

/**
 * 편의시설 선택 핸들러 팩토리
 * @param {{
 *   mapRef: React.RefObject,
 *   markerRef: React.RefObject,
 *   infoRef: React.RefObject,
 *   ready?: boolean,
 *   onDetail?: (detail: {type:string,title:string,subtitle?:string,coords:{lat:number,lng:number}}) => void
 * }} deps
 */
export function makeHandleSelectFacility({
  mapRef,
  markerRef,
  infoRef,
  ready = true,
  onDetail,
}) {
  return (category, name) => {
    if (!ready) return;
    const map = mapRef.current;
    if (!map) return;

    // 리프-좌표 맵 가정: FACILITIES[category][name]
    let coord = FACILITIES?.[category]?.[name];

    // name이 비어있다면 카테고리의 첫 리프 자동 선택(안전망)
    if (!coord && name == null && FACILITIES?.[category]) {
      const firstKey = Object.keys(FACILITIES[category])[0];
      coord = FACILITIES[category][firstKey];
      name = firstKey;
    }

    if (!isValidCoord(coord)) {
      console.warn(
        "시설 좌표 없음/잘못됨:",
        category,
        name,
        FACILITIES?.[category]
      );
      return;
    }

    const label = `${category} - ${name}`;
    const detail = {
      type: "facility",
      title: label,
      subtitle: category,
      coords: coord,
    };

    clearMarkerAndInfo(markerRef, infoRef);
    const { pos } = dropMarker({
      map,
      markerRef,
      infoRef,
      lat: coord.lat,
      lng: coord.lng,
      label,
      // ✅ 마커 클릭 시 상세 패널 갱신
      onClick: () => onDetail && onDetail(detail),
    });

    // 선택 즉시 패널도 띄우고 싶다면 아래 주석 해제
    // onDetail && onDetail(detail);

    map.panTo(pos);
  };
}
