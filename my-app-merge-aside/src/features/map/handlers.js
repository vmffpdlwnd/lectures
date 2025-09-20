// src/features/map/handlers.js
import { BUILDINGS } from "../../data/buildings";
import { FACILITIES } from "../../data/facilities";
import {
  clearMarkerAndInfo,
  dropMarker,
  dropMarkers, // ✅ 여러 개 마커
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
 *   onDetail?: (detail: {type:string,title:string,subtitle?:string,coords:{lat:number,lng:number},data?:any}) => void
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
      // 마커 클릭 시 상세 패널 갱신
      onClick: () => onDetail && onDetail(detail),
    });

    // ✅ 건물 목록 클릭 즉시 상세 패널 표시
    onDetail && onDetail(detail);

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

    // ✅ 카테고리 클릭: 해당 카테고리의 모든 지점 마커 찍기
    if (name == null && FACILITIES?.[category]) {
      const entries = Object.entries(FACILITIES[category]).filter(([, coord]) =>
        isValidCoord(coord)
      );
      if (entries.length === 0) {
        console.warn(
          "시설 좌표 없음/잘못됨:",
          category,
          FACILITIES?.[category]
        );
        return;
      }

      clearMarkerAndInfo(markerRef, infoRef);

      const points = entries.map(([n, coord]) => ({
        lat: coord.lat,
        lng: coord.lng,
        label: `${category} - ${n}`,
      }));

      // 여러 개 마커 + 인포윈도우
      dropMarkers({
        map,
        markerRef,
        infoRef,
        points,
        onClick: ({ lat, lng, label }) => {
          // 마커 클릭 시 상세 패널 열기
          onDetail &&
            onDetail({
              type: "facility",
              title: label,
              subtitle: category,
              coords: { lat, lng },
            });
        },
      });

      // 모든 마커가 보이도록 지도 영역 맞춤
      const { kakao } = window;
      const bounds = new kakao.maps.LatLngBounds();
      points.forEach((p) => bounds.extend(new kakao.maps.LatLng(p.lat, p.lng)));
      map.setBounds(bounds);
      return;
    }

    // ✅ 단일 지점 선택 (기존 동작)
    const coord = FACILITIES?.[category]?.[name];
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
      onClick: () => onDetail && onDetail(detail),
    });

    map.panTo(pos);
  };
}
