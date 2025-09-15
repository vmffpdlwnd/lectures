// FILE: src/components/BusInfo.jsx
import React from "react";

const SECTION = {
  "1550-1": {
    title: "1550-1번 버스 노선 정보",
    body: (
      <div style={{ padding: 20, textAlign: "center" }}>
        <img
            src={require("../images/1550-1 운행시간표.jpeg")}
            alt="1550-1 운행 시간표"
            style={{ width: "80%", height: "auto" }}
        />
      </div>
    ),
  },
  "1552": {
    title: "1552번 버스 노선 정보",
    body: (
      <div style={{ padding: 20, textAlign: "center" }}>
        <img
            src={require("../images/1552 운행시간표.jpeg")}
            alt="1552 운행 시간표"
            style={{ width: "80%", height: "auto" }}
        />
      </div>
    ),
  },
  "5104": {
    title: "5104번 버스 노선 정보",
    body: (
      <div style={{ padding: 20, textAlign: "center" }}>
      <img
          src={require("../images/5104 서울 세마.jpeg")}
          alt="5104 서울 세마"
          style={{ width: "60%", height: "auto", marginBottom: "20px", display: "block", margin: "0 auto 20px auto" }}
      />
      <img
          src={require("../images/5104 세마 서울.jpeg")}
          alt="5104 세마 서울"
          style={{ width: "60%", height: "auto", display: "block", margin: "0 auto" }}
      />
    </div>
    ),
  },
  "M4449": {
    title: "M4449번 버스 노선 정보",
    body: (
      <div style={{ padding: 20, textAlign: "center" }}>
        <img
            src={require("../images/M4449 운행 시간표.jpeg")}
            alt="M4449 운행 시간표"
            style={{ width: "60%", height: "auto" }}
        />
      </div>
    ),
  },
  "수원역 셔틀": {
    title: "수원역 셔틀 운행 안내",
    body: (
      <div style={{ padding: 20, textAlign: "center" }}>
        <img
            src={require("../images/수원역 셔틀.jpeg")}
            alt="수원역 셔틀"
            style={{ width: "80%", height: "auto" }}
        />
      </div>
    ),
  },
  "동탄 경유 셔틀": {
    title: "동탄 경유 셔틀 운행 안내",
    body: (
      <div style={{ padding: 20, textAlign: "center" }}>
        <img
            src={require("../images/동탄 경유 (세마) 셔틀.jpeg")}
            alt="통탄 경유 셔틀"
            style={{ width: "80%", height: "auto" }}
        />
      </div>
    ),
  },
  "학교가는 버스 정보": {
  title: "학교가는 버스 정보",
  body: (
    <div style={{ padding: 20, textAlign: "center" }}>
      <img
          src={require("../images/승하차 위치.jpeg")}
          alt="한신대학교 버스 노선도"
          style={{ width: "60%", height: "auto", marginBottom: "20px", display: "block", margin: "0 auto 20px auto" }}
      />
      <img
          src={require("../images/버스정보.jpeg")}
          alt="버스정보"
          style={{ width: "60%", height: "auto", display: "block", margin: "0 auto" }}
      />
    </div>
  ),
},
"셔틀 운행 시간": {
  title: "셔틀버스 운행 시간표",
  body: (
    <div style={{ padding: 20, textAlign: "center" }}>
      <img
          src={require("../images/셔틀 운행 시간.jpeg")}
          alt="셔틀 운행 시간"
          style={{ width: "50%", height: "auto", marginBottom: "20px", display: "block", margin: "0 auto 20px auto" }}
      />
      <img
          src={require("../images/셔틀.jpeg")}
          alt="셔틀"
          style={{ width: "50%", height: "auto", display: "block", margin: "0 auto" }}
      />
    </div>
  ),
},
  "병점역 버스 탑승 정보": {
    title: "병점역 버스 탑승 안내",
    body: (
      <div style={{ padding: 20, textAlign: "center" }}>
        <img
            src={require("../images/병점역 버스 탑승.jpeg")}
            alt="병점역 버스 탑승"
            style={{ width: "80%", height: "auto" }}
        />
      </div>
    ),
  },
};

export default function BusInfo({ selected }) {
  if (!selected) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <img
            src={require("../images/승하차 위치.jpeg")}
            alt="한신대학교 버스 노선도"
            style={{ width: "80%", height: "auto" }}
        />
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
