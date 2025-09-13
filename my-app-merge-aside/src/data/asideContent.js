// Aside 트리(텍스트 구조만)
export const ASIDE_CONTENT = {
  map: {
    title: "건물",
    collapsible: [
      {
        title: "건물 목록",
        items: [
          "장공관(본관)",
          "필현관",
          "만우관",
          "샬롬채플",
          "임마누엘관(학생회관)",
          "경삼관(도서관)",
          "송암관",
          "소통관",
          "학습실습동",
          "한울관(체육관)",
          "성빈학사(생활관)",
          "새롬터",
          "해오름관",
          "장준하통일관",
          "늦봄관",
        ],
      },
      {
        title: "편의시설",
        items: [
          { label: "식당", children: ["학식(18관)", "학식(임마누엘관)"] },
          {
            label: "카페",
            children: ["카페ing(18)", "카페ing(경삼관)", "베라티스", "스테이"],
          },
          { label: "편의점", children: ["CU", "emart24", "Seven-Eleven"] },
          {
            label: "주차장",
            children: Array.from({ length: 9 }, (_, i) => `주차장${i + 1}`),
          },
          { label: "은행/ATM" }, // 자식 없음 → 상위 클릭 시 바로 호출
          { label: "우체국" },
          { label: "병원/약국" },
          { label: "서점/문구" },
        ],
      },
    ],
  },
  bus: {
    title: "버스 노선",
    items: ["56", "1550-1"],
    extra: {
      title: "셔틀버스",
      items: ["통학 셔틀", "야간 셔틀"],
    },
  },
  newB: { title: "재학생 정보", items: ["학사일정", "OT 안내"] },
  club: { title: "동아리", items: ["중앙동아리", "가입방법"] },
  assist: {
    title: "학생지원",
    items: ["장학금", "상담센터", "학습지원", "교내 전화번호"],
  },
};
