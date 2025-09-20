// FILE: src/features/map/handlers.js

import { BUILDING_DETAILS } from "../../data/buildingDetails";
import { BUILDINGS } from "../../data/buildings";
import { FACILITIES } from "../../data/facilities";

/**
 * 건물 선택 핸들러를 생성합니다.
 * @param {object} params
 * @param {object} params.mapRef - 지도 ref
 * @param {object} params.markerRef - 마커 ref
 * @param {object} params.infoRef - 인포윈도우 ref
 * @param {boolean} params.ready - 지도 준비 상태
 * @param {function} params.onDetail - 상세 정보 콜백
 */
export const makeHandleSelectBuilding = ({ mapRef, markerRef, infoRef, ready, onDetail }) => (buildingName) => {
  if (!ready) return;

  const { kakao } = window;
  const map = mapRef.current;
  const building = BUILDINGS[buildingName];
  const buildingDetailData = BUILDING_DETAILS[buildingName] || {};

  if (!building) {
    onDetail(null);
    markerRef.current?.setMap(null);
    infoRef.current?.close();
    return;
  }

  const pos = new kakao.maps.LatLng(building.lat, building.lng);
  const marker = markerRef.current || new kakao.maps.Marker({ position: pos, map });
  marker.setPosition(pos);
  marker.setMap(map);
  markerRef.current = marker;

  const content = `<div style="padding:5px;font-size:12px;"><b>${buildingName}</b></div>`;
  const infowindow = infoRef.current || new kakao.maps.InfoWindow({ content, position: pos });
  infowindow.setContent(content);
  infowindow.setPosition(pos);
  infowindow.open(map, marker);
  infoRef.current = infowindow;

  map.setCenter(pos);

  // **'type'과 'data'를 포함하는 통일된 형식으로 객체를 전달합니다.**
  onDetail({
    type: 'building',
    title: buildingName,
    data: buildingDetailData,
    coords: { lat: building.lat, lng: building.lng }
  });
};

/**
 * 편의시설 선택 핸들러를 생성합니다.
 * @param {object} params
 * @param {object} params.mapRef - 지도 ref
 * @param {object} params.markerRef - 마커 ref
 * @param {object} params.infoRef - 인포윈도우 ref
 * @param {boolean} params.ready - 지도 준비 상태
 * @param {function} params.onDetail - 상세 정보 콜백
 */
export const makeHandleSelectFacility = ({ mapRef, markerRef, infoRef, ready, onDetail }) => (category, item) => {
  if (!ready) return;

  const { kakao } = window;
  const map = mapRef.current;
  const facility = FACILITIES[category]?.[item];

  if (!facility) {
    onDetail(null);
    markerRef.current?.setMap(null);
    infoRef.current?.close();
    return;
  }

  const pos = new kakao.maps.LatLng(facility.lat, facility.lng);
  const marker = markerRef.current || new kakao.maps.Marker({ position: pos, map });
  marker.setPosition(pos);
  marker.setMap(map);
  markerRef.current = marker;

  const content = `<div style="padding:5px;font-size:12px;"><b>${item}</b></div>`;
  const infowindow = infoRef.current || new kakao.maps.InfoWindow({ content, position: pos });
  infowindow.setContent(content);
  infowindow.setPosition(pos);
  infowindow.open(map, marker);
  infoRef.current = infowindow;

  map.setCenter(pos);

  // **'type'과 'data'를 포함하는 통일된 형식으로 객체를 전달합니다.**
  onDetail({
    type: 'facility',
    title: item,
    data: { description: facility.description },
    coords: { lat: facility.lat, lng: facility.lng }
  });
};