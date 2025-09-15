// src/components/CalendarPage.jsx
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ko from "date-fns/locale/ko";

// 학사일정 데이터 가져오기
import eventsData from "../data/eventsData";

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
  // 데이터의 문자열 날짜를 Date 객체로 변환
  const formattedEvents = eventsData.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const [events, setEvents] = useState(formattedEvents);

  // 이벤트 타입에 따라 스타일을 다르게 적용하는 함수
  const eventPropGetter = (event) => {
    let newStyle = {
      backgroundColor: "#3174ad", // 기본 배경색
      color: "white",
      borderRadius: "0px",
      border: "none",
    };
    if (event.type === "holiday") {
      newStyle.backgroundColor = "#ff7f7f"; // 공휴일은 붉은색
    }
    if (event.type === "exam") {
      newStyle.backgroundColor = "#32a852"; // 시험 기간은 녹색
    }
    return {
      className: event.type, // 타입별 클래스 이름 추가
      style: newStyle,
    };
  };

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
        views={['month', 'week', 'day', 'agenda']}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default CalendarPage;