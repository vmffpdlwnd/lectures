// FILE: src/utils/searchIndex.js

import { texts } from "./texts";
import { BUILDING_DETAILS } from "../data/buildingDetails";
import { levenshteinDistance } from "./levenshtein"; // Levenshtein 함수를 불러옵니다.

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

  // 반환 객체에 검색 메소드를 추가합니다.
  return {
    buildingIndex,
    facilityIndex,
    search: (query) => searchIndex({ buildingIndex, facilityIndex }, query),
  };
}

// 검색 실행 (hit 반환)
export function searchIndex({ buildingIndex, facilityIndex }, query) {
  const q = norm(query);
  if (!q) return null;

  // 1. 완전 일치 검색
  let hit = buildingIndex.get(q) || facilityIndex.get(q);
  if (hit) return hit;

  let bestHit = null;
  let minDistance = Infinity;
  const maxDistance = 3; // 허용 가능한 최대 오타 수 (조절 가능)

  // 2. Levenshtein 거리 기반 유사성 검색
  // 건물 검색
  for (const [key, value] of buildingIndex) {
    const distance = levenshteinDistance(q, key);
    if (distance <= maxDistance && distance < minDistance) {
      minDistance = distance;
      bestHit = value;
    }
  }

  // 편의시설 검색
  for (const [key, value] of facilityIndex) {
    const distance = levenshteinDistance(q, key);
    if (distance <= maxDistance && distance < minDistance) {
      minDistance = distance;
      bestHit = value;
    }
  }

  return bestHit;
}