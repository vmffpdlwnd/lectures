// src/map/kakaoLoader.js

// 카카오 SDK를 한 번만 로드하는 싱글톤 로더
let kakaoLoadPromise = null;

/**
 * Kakao Maps SDK를 동적으로 로딩합니다.
 * 반드시 libraries=services 옵션 포함해야 Roadview 사용 가능. 서비스 라이브러리 필요
 *
 * @param {Object} options - 옵션 객체
 * @param {string} options.appkey - Kakao 앱 키 (기본값: 임시 키 or .env)
 * @param {string} options.libraries - 불러올 라이브러리 (예: "services", "clusterer")
 * @returns {Promise<void>} - 로딩 완료 시 resolve
 */
export function loadKakaoSdk(options = {}) {
  const appkey =
    options.appkey ||
    process.env.REACT_APP_KAKAO_APPKEY ||
    "14216e37d0aab6cbf25280c28858ec8b"; // 임시 테스트용 키

  // ✅ 기본값으로 반드시 "services" 포함
  const libraries = options.libraries || "services";

  // 이미 kakao.maps 객체가 존재하면 바로 resolve
  if (window.kakao && window.kakao.maps) return Promise.resolve();

  // 로딩 중이면 기존 Promise 반환
  if (kakaoLoadPromise) return kakaoLoadPromise;

  // 최초 로딩
  kakaoLoadPromise = new Promise((resolve) => {
    const SCRIPT_ID = "kakao-maps-sdk";
    const exist = document.getElementById(SCRIPT_ID);

    const onReady = () => window.kakao.maps.load(resolve);

    if (exist) {
      exist.addEventListener("load", onReady);
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false&libraries=${libraries}`;
    script.onload = onReady;
    document.head.appendChild(script);
  });

  return kakaoLoadPromise;
}
