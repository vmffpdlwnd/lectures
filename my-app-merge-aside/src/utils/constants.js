// 지도/앱 전역에서 쓰는 상수

// 한신대 캠퍼스 중심점
export const MAP_CENTER = { lat: 37.193538386212296, lng: 127.02352860043403 };

// 초기 줌 레벨
export const DEFAULT_LEVEL = 3;

// 지도 컨테이너 id (MapView의 기본 id와 맞춤)
export const MAP_CONTAINER_ID = "map";

// 인포윈도우 공통 스타일 (레이블 길어도 줄바꿈 안 나게)
export const INFO_WINDOW_STYLE =
  "padding:6px 10px;font-size:12px;white-space:nowrap;";

// (선택) .env에서 카카오 키 읽기 – 필요하면 가져다 쓰기
export const KAKAO_APPKEY =
  process.env.REACT_APP_KAKAO_APPKEY || "YOUR_FALLBACK_KEY"; // fallback은 개발용 임시
