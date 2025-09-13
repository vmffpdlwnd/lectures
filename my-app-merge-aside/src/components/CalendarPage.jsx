// src/components/CalendarPage.jsx
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ko from "date-fns/locale/ko";

// 지역 설정 (한국어 기준)
const locales = {
  ko: ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // 월요일 시작
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "개강일",
      start: new Date(2025, 8, 2), // 2025-09-02
      end: new Date(2025, 8, 2),
    },
    {
      title: "중간고사 시작",
      start: new Date(2025, 9, 21), // 2025-10-21
      end: new Date(2025, 9, 25),
    },
  ]);

  return (
    <div style={{ height: "80vh", padding: "20px" }}>
      <h2 style={{ marginBottom: 16 }}>📅 학사일정</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", borderRadius: 8 }}
        culture="ko"
        messages={{
          next: "다음",
          previous: "이전",
          today: "오늘",
          month: "월",
          week: "주",
          day: "일",
          agenda: "일정",
        }}
      />
    </div>
  );
};

export default CalendarPage;
