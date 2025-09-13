// FILE: src/App.js
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import Aside from "./components/Aside";
import { useKakaoMap } from "./map/useKakaoMap";
import { MAP_CENTER, DEFAULT_LEVEL } from "./utils/constants";
import MapView from "./features/map/MapView";
import {
  makeHandleSelectBuilding,
  makeHandleSelectFacility,
} from "./features/map/handlers";
import MapDetailPanel from "./components/MapDetailPanel";
import CalendarPage from "./components/CalendarPage";
import OtInfo from "./components/OtInfo";
import ClubHub from "./components/ClubHub";
import AssistDetail from "./components/AssistDetail";

import { makeSearchIndex, searchIndex } from "./utils/searchIndex";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [activeTab, setActiveTab] = useState("map");
  const [detail, setDetail] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Kakao 지도 훅
  const { mapRef, markerRef, infoRef, ready, relayout } = useKakaoMap({
    activeTab,
    containerId: "map",
    center: MAP_CENTER,
    level: DEFAULT_LEVEL,
  });

  const handleSelectBuilding = makeHandleSelectBuilding({
    mapRef,
    markerRef,
    infoRef,
    ready,
    onDetail: setDetail,
  });
  const handleSelectFacility = makeHandleSelectFacility({
    mapRef,
    markerRef,
    infoRef,
    ready,
    onDetail: setDetail,
  });

  // 검색 인덱스 준비
  const index = useMemo(() => makeSearchIndex(), []);

  // 검색 실행
  const runSearch = async (query) => {
    const hit = searchIndex(index, query);
    if (!hit) {
      alert("검색 결과가 없습니다. (건물/편의시설 위주로 검색해보세요)");
      return;
    }
    setActiveTab("map");

    // 지도 준비 기다리기
    const waitUntil = (cond, ms = 50, tries = 40) =>
      new Promise((res) => {
        let n = 0;
        const t = setInterval(() => {
          if (cond() || n++ > tries) {
            clearInterval(t);
            res();
          }
        }, ms);
      });

    await waitUntil(() => ready && !!mapRef.current);

    if (hit.type === "building") handleSelectBuilding(hit.name);
    else if (hit.type === "facility")
      handleSelectFacility(hit.category, hit.item);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ 맵 탭으로 돌아올 때 relayout 호출
  useEffect(() => {
    if (activeTab === "map" && ready && typeof relayout === "function") {
      requestAnimationFrame(() => relayout());
    }
  }, [activeTab, ready, relayout]);

  return (
    <>
      <Nav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={runSearch}
      />
      <Container>
        <Aside
          activeTab={activeTab}
          onSelectBuilding={handleSelectBuilding}
          onSelectFacility={handleSelectFacility}
          onSelectItem={setSelectedItem}
        />
        <div style={{ padding: "20px", flexGrow: 1 }}>
          {activeTab === "map" && (
            <>
              <MapView id="map" height={500} />
              <MapDetailPanel detail={detail} />
            </>
          )}

          {activeTab === "bus" && (
            <img
              src={require("./images/KakaoTalk_20250829_104919723.png")}
              alt="한신대학교 버스 노선도"
              style={{ width: "100%", height: "auto" }}
            />
          )}

          {activeTab === "newB" && (
            <>
              {selectedItem === "학사일정" && <CalendarPage />}
              {selectedItem === "OT 안내" && <OtInfo />}
            </>
          )}

          {activeTab === "club" && (
            <>
              {selectedItem === "중앙동아리" && <ClubHub />}
              {selectedItem === "가입방법" && (
                <div style={{ padding: 20 }}>
                  <h2>동아리 가입방법</h2>
                  <p>
                    중앙동아리 부스/SNS/학생회관 동아리실을 통해 문의 후
                    가입서를 제출하세요.
                  </p>
                </div>
              )}
              {!selectedItem && (
                <div style={{ padding: 20, color: "#666" }}>
                  좌측에서 <b>중앙동아리</b> 또는 <b>가입방법</b>을 선택하세요.
                </div>
              )}
            </>
          )}

          {activeTab === "assist" && <AssistDetail selected={selectedItem} />}
        </div>
      </Container>
    </>
  );
}

export default App;
