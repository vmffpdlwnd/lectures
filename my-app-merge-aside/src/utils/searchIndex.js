// FILE: src/utils/searchIndex.js

import { texts } from "./texts";
import { BUILDING_DETAILS } from "../data/buildingDetails";

// 문자열 정규화
export const norm = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\(.*?\)/g, "");

// 인덱스 생성 (App 마운트 시 1회만)
export function makeSearchIndex() {
  const buildingIndex = new Map();
  const facilityIndex = new Map();

  const handleLangData = (lang) => {
    const asideMap = texts[lang].aside.map;
    
    // 건물
    const buildings = asideMap.collapsible[0].items;
    buildings.forEach((name) => {
      buildingIndex.set(norm(name), { type: "building", name });
      if (BUILDING_DETAILS[name]?.alias) {
        buildingIndex.set(norm(BUILDING_DETAILS[name].alias), { type: "building", name });
      }
    });

    // 편의시설
    const facilitySection = asideMap.collapsible[1];
    facilitySection.items.forEach((node) => {
      if (typeof node === "object") {
        const cat = node.label;
        if (Array.isArray(node.children)) {
          node.children.forEach((leaf) => {
            facilityIndex.set(norm(leaf), {
              type: "facility",
              category: cat,
              item: leaf,
            });
          });
        }
        facilityIndex.set(norm(cat), {
          type: "facility",
          category: cat,
          item: cat,
        });
      }
    });
  };

  handleLangData("ko");
  handleLangData("en");

  return { buildingIndex, facilityIndex };
}

// 검색 실행 (hit 반환)
export function searchIndex({ buildingIndex, facilityIndex }, query) {
  const q = norm(query);
  if (!q) return null;

  let hit = buildingIndex.get(q);
  if (!hit) {
    for (const [k, v] of buildingIndex)
      if (k.includes(q)) {
        hit = v;
        break;
      }
  }
  if (!hit) {
    hit = facilityIndex.get(q);
    if (!hit) {
      for (const [k, v] of facilityIndex)
        if (k.includes(q)) {
          hit = v;
          break;
        }
    }
  }
  return hit || null;
}
