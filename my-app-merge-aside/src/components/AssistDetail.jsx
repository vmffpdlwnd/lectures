// FILE: src/components/AssistDetail.jsx
import React from "react";

const SECTION = {
  장학금: {
    title: "장학금 안내",
    body: (
      <>
        <p>
          성적장학금, 교내장학금, 국가장학금, 근로장학 등 신청·자격·기간을
          요약합니다.
        </p>
        <ul style={{ lineHeight: 1.7 }}>
          <li>성적장학: 직전 학기 성적 기준, 등록금 범위 내 차등 지급</li>
          <li>국가장학: 한국장학재단 신청(1·2차), 소득분위에 따른 지원</li>
          <li>근로장학: 학내 부서 근로, 시급제</li>
          <li>기타: 교외장학 연계(재단·지자체 등)</li>
        </ul>
      </>
    ),
  },
  상담센터: {
    title: "상담센터 안내",
    body: (
      <>
        <p>
          개인상담, 심리검사, 집단상담을 운영합니다. 온라인 예약 후 방문해
          주세요.
        </p>
        <ul style={{ lineHeight: 1.7 }}>
          <li>개인상담: 학업/대인관계/진로</li>
          <li>심리검사: 성격, 적성, 스트레스 등</li>
          <li>운영시간: 평일 09:00~17:00 (점심 12:00~13:00)</li>
        </ul>
      </>
    ),
  },
  학습지원: {
    title: "학습지원 안내",
    body: (
      <>
        <p>튜터링, 스터디, 학습법 특강, 글쓰기 클리닉을 제공합니다.</p>
        <ul style={{ lineHeight: 1.7 }}>
          <li>튜터링/스터디: 팀 구성 후 프로그램 신청</li>
          <li>학습법 특강: 중간·기말 시험 전 집중 운영</li>
          <li>글쓰기 클리닉: 레포트/졸업논문 첨삭</li>
        </ul>
      </>
    ),
  },
};

export default function AssistDetail({ selected }) {
  if (!selected) {
    return (
      <div style={{ padding: 20, color: "#666" }}>
        좌측에서 항목을 선택하세요. (장학금 / 상담센터 / 학습지원)
      </div>
    );
  }

  const data = SECTION[selected];
  if (!data) {
    return (
      <div style={{ padding: 20 }}>
        <h2 style={{ margin: "6px 0 12px" }}>{selected}</h2>
        <p>해당 항목의 내용이 아직 준비되지 않았습니다.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 20,
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}
    >
      <h2 style={{ margin: "6px 0 12px" }}>{data.title}</h2>
      {data.body}
    </div>
  );
}
