// FILE: src/components/ClubHub.jsx
import React, { useMemo, useState } from "react";
import ClubDetail from "./ClubDetail";
import 공연 from "../images/KakaoTalk_20250829_094232533.png";
import 학술 from "../images/KakaoTalk_20250829_101222168.png";
import 운동 from "../images/KakaoTalk_20250829_101232115.png";
import 종교 from "../images/KakaoTalk_20250829_101240276.png";
import 봉사 from "../images/KakaoTalk_20250829_101247737.png";
import 전시 from "../images/KakaoTalk_20250829_101213076.png";

/**
 * 이미지 경로는 두 방식 중 하나로 맞춰주세요.
 * 1) public/images에 둘 때: "/images/파일명.jpg"
 * 2) src/images에 둘 때: import로 가져온 변수 사용
 *
 * 지금은 공용 문자열 경로를 예시로 둡니다.
 * 실제 파일명/위치는 프로젝트에 맞게 수정하세요.
 */
const CATEGORY_IMAGES = {
  공연: 공연,
  전시: 전시,
  학술: 학술,
  운동: 운동,
  종교: 종교,
  봉사: 봉사,
};

const CLUBS_BY_CATEGORY = {
  공연: [
    { name: "메트로폴리스", desc: "하드락 밴드 동아리" },
    { name: "뮤즈", desc: "프리스타일 밴드" },
    {
      name: "소리아리",
      desc: "크리에이티브 뮤직 밴드",
      custom: (
        <div>
          <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
            𝘾𝙍𝙀𝘼𝙏𝙄𝙑𝙀 𝙈𝙐𝙎𝙄𝘾 𝘽𝘼𝙉𝘿 '𝙎𝙊𝙍𝙄𝘼𝙍𝙄'✨
          </p>
          <p>
            유튜브 :{" "}
            <a
              href="https://www.youtube.com/@soriari_"
              target="_blank"
              rel="noreferrer"
            >
              https://www.youtube.com/@soriari_
            </a>
          </p>
          <p>
            인스타 :{" "}
            <a
              href="https://www.instagram.com/soriari_official?utm_source=ig_web_button_share_sheet&igsh=dXptcDJmNTE0bWI5"
              target="_blank"
              rel="noreferrer"
            >
              @soriari_official
            </a>
          </p>
        </div>
      ),
    },
    { name: "FADER", desc: "힙합" },
    { name: "DIO", desc: "댄스" },
    { name: "보라성", desc: "민중가요·노래패" },
    { name: "일과놀이", desc: "풍물놀이패" },
  ],
  전시: [
    { name: "몽당연필", desc: "그림·보드게임" },
    { name: "녹연다우회", desc: "다도" },
    { name: "민알", desc: "사진" },
    { name: "크라임씬", desc: "추리게임" },
  ],
  학술: [
    { name: "SSOA", desc: "광고 기획" },
    { name: "평화나비", desc: "위안부 문제" },
    { name: "애드썬", desc: "광고 제작" },
  ],
  운동: [
    { name: "킬러웨일즈", desc: "미식축구" },
    { name: "SMASH IT", desc: "배드민턴" },
    { name: "갱스터", desc: "야구" },
    { name: "기백", desc: "검도" },
    { name: "더폴라이트", desc: "농구" },
  ],
  종교: [
    { name: "CCC", desc: "기독교" },
    { name: "IVF", desc: "기독교" },
  ],
  봉사: [{ name: "로타랙트", desc: "봉사교류" }],
};

const CATEGORIES = Object.keys(CLUBS_BY_CATEGORY);

export default function ClubHub() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [selectedClub, setSelectedClub] = useState(null);

  const clubs = useMemo(
    () => CLUBS_BY_CATEGORY[activeCategory] || [],
    [activeCategory]
  );

  if (selectedClub) {
    return (
      <ClubDetail club={selectedClub} onBack={() => setSelectedClub(null)} />
    );
  }

  const bgUrl = CATEGORY_IMAGES[activeCategory];

  return (
    <div style={{ position: "relative", minHeight: "72vh" }}>
      {/* 배경 이미지 */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgUrl || ""})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "saturate(0.95)",
          transform: "translateZ(0)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.7) 38%, rgba(255,255,255,0.15) 100%)",
        }}
      />

      {/* 내용 */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ margin: "6px 0 16px" }}>중앙 동아리</h2>

        {/* 분과 탭 */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  border: `1px solid ${isActive ? "#401e83" : "#ddd"}`,
                  background: isActive ? "#401e83" : "#fff",
                  color: isActive ? "#fff" : "#333",
                  padding: "6px 12px",
                  borderRadius: 999,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.12)" : "none",
                }}
              >
                {cat} 분과
              </button>
            );
          })}
        </div>

        {/* 동아리 리스트 */}
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "rgba(255,255,255,0.96)",
            border: "1px solid #eee",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            backdropFilter: "blur(2px)",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 12 }}>
            {clubs.map((club) => (
              <li key={club.name} style={{ padding: "10px 8px" }}>
                <button
                  onClick={() => setSelectedClub(club)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    fontSize: 15,
                    color: "#2b2b2b",
                  }}
                >
                  {club.name}
                  {club.desc && (
                    <div style={{ fontSize: 12, color: "#7a7a7a" }}>
                      {club.desc}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
