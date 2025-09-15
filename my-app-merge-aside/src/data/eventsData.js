// src/data/eventsData.js

const eventsData = [
  // ==================== 2025년 학사일정 ====================
  // 1월
  {
    title: "신정",
    start: "2025-01-01",
    end: "2025-01-01",
    type: "holiday",
  },
  {
    title: "복학/휴학기간",
    start: "2025-01-07",
    end: "2025-01-09",
    type: "school",
  },
  {
    title: "예비수강신청(재학/복학)",
    start: "2025-01-21",
    end: "2025-01-23",
    type: "school",
  },
  {
    title: "설 연휴",
    start: "2025-01-28",
    end: "2025-01-30",
    type: "holiday",
  },

  // 2월
  {
    title: "수강신청(재학/복학)",
    start: "2025-02-04",
    end: "2025-02-06",
    type: "school",
  },
  {
    title: "전기 학위수여식",
    start: "2025-02-14",
    end: "2025-02-14",
    type: "school",
  },
  {
    title: "신입생 입학식 및 OT",
    start: "2025-02-18",
    end: "2025-02-18",
    type: "school",
  },
  {
    title: "등록기간",
    start: "2025-02-20",
    end: "2025-02-24",
    type: "school",
  },
  {
    title: "신(편)입생 수강신청",
    start: "2025-02-20",
    end: "2025-02-21",
    type: "school",
  },

  // 3월
  {
    title: "3.1절",
    start: "2025-03-01",
    end: "2025-03-01",
    type: "holiday",
  },
  {
    title: "1학기 개강일",
    start: "2025-03-01",
    end: "2025-03-01",
    type: "school",
  },
  {
    title: "3.1절 대체공휴일",
    start: "2025-03-03",
    end: "2025-03-03",
    type: "holiday",
  },
  {
    title: "수강신청변경기간",
    start: "2025-03-04",
    end: "2025-03-10",
    type: "school",
  },
  {
    title: "수업시작일",
    start: "2025-03-04",
    end: "2025-03-04",
    type: "school",
  },
  {
    title: "수강신청취소기간",
    start: "2025-03-12",
    end: "2025-03-13",
    type: "school",
  },
  {
    title: "수업일수 1/4선",
    start: "2025-03-28",
    end: "2025-03-28",
    type: "school",
  },

  // 4월
  {
    title: "중간강의평가",
    start: "2025-04-07",
    end: "2025-04-11",
    type: "school",
  },
  {
    title: "개교기념일",
    start: "2025-04-19",
    end: "2025-04-19",
    type: "school",
  },
  {
    title: "중간고사기간",
    start: "2025-04-22",
    end: "2025-04-28",
    type: "exam",
  },

  // 5월
  {
    title: "근로자의 날",
    start: "2025-05-01",
    end: "2025-05-01",
    type: "holiday",
  },
  {
    title: "부처님 오신 날/어린이날",
    start: "2025-05-05",
    end: "2025-05-05",
    type: "holiday",
  },
  {
    title: "대체휴일",
    start: "2025-05-06",
    end: "2025-05-06",
    type: "holiday",
  },
  {
    title: "전공신청기간",
    start: "2025-05-19",
    end: "2025-05-23",
    type: "school",
  },
  {
    title: "복수전공, 전과, 재입학신청",
    start: "2025-05-20",
    end: "2025-05-22",
    type: "school",
  },

  // 6월
  {
    title: "기말강의평가",
    start: "2025-06-03",
    end: "2025-06-25",
    type: "school",
  },
  {
    title: "현충일",
    start: "2025-06-06",
    end: "2025-06-06",
    type: "holiday",
  },
  {
    title: "기말고사기간",
    start: "2025-06-10",
    end: "2025-06-16",
    type: "exam",
  },
  {
    title: "성적입력기간",
    start: "2025-06-17",
    end: "2025-06-25",
    type: "school",
  },
  {
    title: "여름계절학기",
    start: "2025-06-17",
    end: "2025-07-07",
    type: "school",
  },
  {
    title: "성적조회/이의신청",
    start: "2025-06-26",
    end: "2025-06-28",
    type: "school",
  },

  // 7월
  {
    title: "복학/휴학기간",
    start: "2025-07-08",
    end: "2025-07-10",
    type: "school",
  },
  {
    title: "예비수강신청(재학/복학)",
    start: "2025-07-29",
    end: "2025-07-31",
    type: "school",
  },

  // 8월
  {
    title: "수강신청기간(재학/복학)",
    start: "2025-08-05",
    end: "2025-08-08",
    type: "school",
  },
  {
    title: "후기졸업일",
    start: "2025-08-14",
    end: "2025-08-14",
    type: "school",
  },
  {
    title: "광복절",
    start: "2025-08-15",
    end: "2025-08-15",
    type: "holiday",
  },
  {
    title: "등록기간",
    start: "2025-08-22",
    end: "2025-08-26",
    type: "school",
  },

  // 9월
  {
    title: "2학기 개강일/수업시작일",
    start: "2025-09-01",
    end: "2025-09-01",
    type: "school",
  },
  {
    title: "수강신청변경기간",
    start: "2025-09-01",
    end: "2025-09-05",
    type: "school",
  },
  {
    title: "수강신청취소기간",
    start: "2025-09-09",
    end: "2025-09-10",
    type: "school",
  },
  {
    title: "수업일수 1/4선",
    start: "2025-09-28",
    end: "2025-09-28",
    type: "school",
  },

  // 10월
  {
    title: "개천절",
    start: "2025-10-03",
    end: "2025-10-03",
    type: "holiday",
  },
  {
    title: "추석 연휴",
    start: "2025-10-05",
    end: "2025-10-07",
    type: "holiday",
  },
  {
    title: "추석 대체공휴일",
    start: "2025-10-08",
    end: "2025-10-08",
    type: "holiday",
  },
  {
    title: "한글날",
    start: "2025-10-09",
    end: "2025-10-09",
    type: "holiday",
  },
  {
    title: "중간강의평가",
    start: "2025-10-10",
    end: "2025-10-16",
    type: "school",
  },
  {
    title: "중간고사기간",
    start: "2025-10-20",
    end: "2025-10-24",
    type: "exam",
  },

  // 11월
  {
    title: "전공신청기간",
    start: "2025-11-17",
    end: "2025-11-21",
    type: "school",
  },
  {
    title: "복수전공/재입학신청",
    start: "2025-11-18",
    end: "2025-11-20",
    type: "school",
  },

  // 12월
  {
    title: "기말강의평가",
    start: "2025-12-02",
    end: "2025-12-22",
    type: "school",
  },
  {
    title: "기말고사기간",
    start: "2025-12-08",
    end: "2025-12-12",
    type: "exam",
  },
  {
    title: "성적입력기간",
    start: "2025-12-13",
    end: "2025-12-22",
    type: "school",
  },
  {
    title: "겨울계절학기",
    start: "2025-12-15",
    end: "2026-01-06",
    type: "school",
  },
  {
    title: "성적조회/이의신청",
    start: "2025-12-23",
    end: "2025-12-26",
    type: "school",
  },
  {
    title: "성탄절",
    start: "2025-12-25",
    end: "2025-12-25",
    type: "holiday",
  },
  
  // ==================== 2026년 학사일정 ====================
  // 1월
  {
    title: "신정",
    start: "2026-01-01",
    end: "2026-01-01",
    type: "holiday",
  },
  {
    title: "복학,휴학기간",
    start: "2026-01-06",
    end: "2026-01-08",
    type: "school",
  },
  {
    title: "전과신청기간",
    start: "2026-01-08",
    end: "2026-01-11",
    type: "school",
  },
  {
    title: "예비수강신청기간(재학,복학)",
    start: "2026-01-27",
    end: "2026-01-29",
    type: "school",
  },

  // 2월
  {
    title: "수강신청기간(재학,복학)",
    start: "2026-02-03",
    end: "2026-02-05",
    type: "school",
  },
  {
    title: "2025학년도 전기 학위수여식",
    start: "2026-02-13",
    end: "2026-02-13",
    type: "school",
  },
  {
    title: "설연휴",
    start: "2026-02-16",
    end: "2026-02-18",
    type: "holiday",
  },
  {
    title: "등록기간",
    start: "2026-02-20",
    end: "2026-02-24",
    type: "school",
  },
  {
    title: "신입생 입학식 및 오리엔테이션",
    start: "2026-02-23",
    end: "2026-02-23",
    type: "school",
  },
  {
    title: "신(편)입생 수강신청기간",
    start: "2026-02-24",
    end: "2026-02-25",
    type: "school",
  },
];

export default eventsData;